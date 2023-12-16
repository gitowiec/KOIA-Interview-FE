
// const tidFilterQuery = {
//     "filter": "item",
//     "values": [
//         "2020K1",
//         "2020K2",
//         "2020K3",
//         "2020K4",
//         "2021K1",
//         "2021K2",
//         "2021K3",
//         "2021K4"
//     ]
// };
const tidFilterQuery = {
    "filter": "all",
    "values": [
        "*",
    ]
};

const boligtypeFilterQuery = {
    "filter": "all",
    "values": [
        "*"
    ]
};

const contentsCodeFilterQuery = {
    "filter": "all",
    "values": [
        "*"
    ]
};

const queryObj = {
    "query": [
        {
            "code": "Boligtype",
            "selection": boligtypeFilterQuery
        },
        {
            "code": "ContentsCode",
            "selection": contentsCodeFilterQuery
        },
        {
            "code": "Tid",
            "selection": tidFilterQuery
        }
    ],
    "response": {
        "format": "json-stat2"
    }
};

const getDataQuery = () => queryObj;

export {getDataQuery}