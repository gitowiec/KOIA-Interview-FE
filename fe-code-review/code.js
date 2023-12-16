

// There are missing imports, please add imports explicitly.
// It is better to not rely on automatic webpack imports, let the code be more portable


app.post('/api/extract', upload.single('file'), async (req, res) => {
    // Please store magic strings (url path) in consts, preferably in standalone file just for the sake of consts.

    logInfo('POST /api/extract',req.body);
    logInfo('FILE=',req.file);

    if (req.body) {
        // Please exit function momentarily, by inverting the condition, sending status 500 and returning
        // This way the function will be easier to read and comprehend, by removing one level of indentation

        const file = req.file;
        const requestID = req.body.requestID;
        const project = req.body.project;
        const idUser = req.body.userID;
        // You could use here object unwrapping with const {requestID, project, userID} = req.body
        // idUser change to userId

        const user = await User.findOne(idUser);
        // idUser Is it always non empty string? Maybe it would be good to secure this findOne with if-condition or try-catch block?

        if (requestID && project && idUser && user) {
            // This is second good place to decrease indentation level by fast exiting the function (with inverting the condition)

            logDebug('User with role '+user.role, user);
            if (user.role === 'ADVISOR' || user.role.indexOf('ADVISOR') > -1)
                return res.json({requestID, step: 999, status: 'DONE', message: 'Nothing to do for ADVISOR role'});
            // Use curly braces, to ensure proper formatting enable linter for this project

            /* reset status variables */
            await db.updateStatus(requestID, 1, '');
            // What's 1 and empty string here? What it will do to request status?

            logDebug('CONFIG:', config.projects);
            if (project === 'inkasso' && config.projects.hasOwnProperty(project) && file) {
                // If this branch will not run the line with "return res.json({requestID, step: 999, status:
                // 'DONE', message: 'Done sending emails...'});" will lie about sending emails
                const hashSum = crypto.createHash('sha256');
                // unused variable
                const fileHash = idUser;
                const fileName = 'fullmakt';
                const fileType = mime.getExtension(file.mimetype);
                if (fileType !== 'pdf')
                    return res.status(500).json({requestID, message: 'Missing pdf file'});
                // Use curly braces

                await db.updateStatus(requestID, 3, '');

                const folder = `${project}-signed/${idUser}`;
                logDebug('FILE2=', file);
                await uploadToGCSExact(folder, fileHash, fileName, fileType, file.mimetype, file.buffer);
                await db.updateStatus(requestID, 4, '');
                const ret = await db.updateUploadedDocs(idUser, requestID, fileName, fileType, file.buffer);
                logDebug('DB UPLOAD:', ret);

                await db.updateStatus(requestID, 5, '');

                let sent = true;
                // unused variable

                const debtCollectors = await db.getDebtCollectors();
                logDebug('debtCollectors=', debtCollectors);
                if (!debtCollectors)
                    return res.status(500).json({requestID, message: 'Failed to get debt collectors'});
                // use curly braces

                if (!!(await db.hasUserRequestKey(idUser))) { //FIX: check age, not only if there's a request or not
                    // Better comment with "TODO:"
                    return res.json({requestID, step: 999, status: 'DONE', message: 'Emails already sent'});
                }

                const sentStatus = {};
                for (let i = 0; i < debtCollectors.length ; i++) {
                    await db.updateStatus(requestID, 10+i, '');
                    const idCollector = debtCollectors[i].id;
                    const collectorName = debtCollectors[i].name;
                    const collectorEmail = debtCollectors[i].email;
                    const hashSum = crypto.createHash('sha256');
                    const hashInput = `${idUser}-${idCollector}-${(new Date()).toISOString()}`;
                    logDebug('hashInput=', hashInput);
                    hashSum.update(hashInput);
                    const requestKey = hashSum.digest('hex');
                    logDebug('REQUEST KEY:', requestKey);

                    const hash = Buffer.from(`${idUser}__${idCollector}`, 'utf8').toString('base64')

                    if (!!(await db.setUserRequestKey(requestKey, idUser))
                        && !!(await db.setUserCollectorRequestKey(requestKey, idUser, idCollector))) {
                        // The code in this block could also be one level lower with indentation when
                        // check would be for the false and then use "continue" for the loop

                        /* prepare email */
                        const sendConfig = {
                            sender: config.projects[project].email.sender,
                            // Reaching for projects from config is plenty in here, could use assignment const {projects} = config;
                            // Or variable "project" seems like it is id or alias. Better could be to rename it to projectName, then
                            // create variable const project = config.project[projectName] and work with it.

                            replyTo: config.projects[project].email.replyTo,
                            subject: 'Email subject,
                            // Missing single quote

                            templateId: config.projects[project].email.template.collector,
                            params: {
                                downloadUrl: `https://url.go/download?requestKey=${requestKey}&hash=${hash}`,
                                uploadUrl: `https://url.go/upload?requestKey=${requestKey}&hash=${hash}`,
                                confirmUrl: `https://url.go/confirm?requestKey=${requestKey}&hash=${hash}`
                            },
                            tags: ['request'],
                            to: [{ email: collectorEmail , name: collectorName }],
                        };
                        logDebug('Send config:', sendConfig);

                        try {
                            await db.setEmailLog({collectorEmail, idCollector, idUser, requestKey})
                        } catch (e) {
                            logDebug('extract() setEmailLog error=', e);
                        }

                        /* send email */
                        const resp = await email.send(sendConfig, config.projects[project].email.apiKey);
                        logDebug('extract() resp=', resp);

                        // update DB with result
                        await db.setUserCollectorRequestKeyRes(requestKey, idUser, idCollector, resp);

                        if (!sentStatus[collectorName])
                            sentStatus[collectorName] = {};
                        sentStatus[collectorName][collectorEmail] = resp;

                        if (!resp) {
                            logError('extract() Sending email failed: ', resp);
                        }
                    }
                }
                await db.updateStatus(requestID, 100, '');

                logDebug('FINAL SENT STATUS:');
                console.dir(sentStatus, {depth: null});

                //if (!allSent)
                //return res.status(500).json({requestID, message: 'Failed sending email'});
                // Remove unused code

                await db.updateStatus(requestID, 500, '');

                /* prepare summary email */
                const summaryConfig = {
                    //bcc: [{ email: 'tomas@inkassoregisteret.com', name: 'Tomas' }],
                    sender: config.projects[project].email.sender,
                    replyTo: config.projects[project].email.replyTo,
                    subject: 'Oppsummering Kravsforespørsel',
                    // Keep strings and names in separate place (const)
                    templateId: config.projects[project].email.template.summary,
                    params: {
                        collectors: sentStatus,
                    },
                    tags: ['summary'],
                    to: [{ email: 'tomas@upscore.no' , name: 'Tomas' }], // FIXXX: config.projects[project].email.sender
                };
                logDebug('Summary config:', summaryConfig);

                /* send email */
                //const respSummary = await email.send(sendConfig, config.projects[project].email.apiKey);
                //logDebug('extract() summary resp=', respSummary);

                await db.updateStatus(requestID, 900, '');
                // Missing return statement. The second db.updateStatus invocation will overwrite the request status 900 with 999
            }
            await db.updateStatus(requestID, 999, '');
            return res.json({requestID, step: 999, status: 'DONE', message: 'Done sending emails...'});
        } else
            return res.status(500).json({requestID, message: 'Missing requried input (requestID, project, file)'});
    }
    res.status(500).json({requestID: '', message: 'Missing requried input (form data)'});
});