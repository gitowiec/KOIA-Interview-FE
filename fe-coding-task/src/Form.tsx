import React, { Dispatch, SetStateAction, useEffect } from "react";
import { Button, Grid, TextField } from "@mui/material";
import { FormSelectors } from "./FormSelectors";
import {
  prepareUISelectorsData,
  SSBTableMetadata,
} from "./prepareUISelectorsData";
import { SubmitHandler, useForm } from "react-hook-form";
import { useLoaderData, useParams } from "react-router-dom";

type Props = {
  metaData: SSBTableMetadata;
  setSelectionState: Dispatch<
    SetStateAction<Record<"boligtype" | "tid1" | "tid2", string>>
  >;
};

export type Inputs = {
  boligtype: string;
  tid1: string;
  tid2: string;
  remark: string;
};

export const Form: React.FC<Props> = ({ metaData, setSelectionState }) => {
  const selectorsData = prepareUISelectorsData(metaData);
  const { boligtype: boligtypeUrl, tid1: tid1url, tid2: tid2url } = useParams();

  // console.log({ boligtype: boligtypeUrl, tid1: tid1url, tid2: tid2url });
  const {
    register,
    handleSubmit,
    watch,
    getValues,
    reset,
    control,
    formState: { errors, isSubmitting },
  } = useForm<Inputs>();
  // console.log(watch("remark"));
  // useEffect(() => {
  // console.log("useEffect");
  // if (boligtypeUrl || tid1url || tid2url) {
  // console.log("useEffect2");
  // reset({
  //   boligtype: boligtypeUrl,
  //   tid1: tid1url,
  //   tid2: tid2url,
  // });
  // }
  // }, [boligtypeUrl, tid1url, tid2url]);
  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);
  return (
    <Grid
      container
      component={"form"}
      spacing={2}
      onSubmit={handleSubmit(onSubmit)}
      display={"flex"}
      flexDirection={"column"}
    >
      <Grid item container sx={{ p: 2 }} spacing={2}>
        <FormSelectors
          control={control}
          getValues={getValues}
          register={register}
          selectorsData={selectorsData}
          errors={errors}
          setSelectionState={setSelectionState}
        />
      </Grid>
      <Grid item py={2} display={"flex"} flexDirection={"row"}>
        <TextField {...register("remark")} label="Remark" multiline rows={4} />
      </Grid>
      <Grid item py={2} display={"flex"} flexDirection={"row"}>
        <Button
          type={"submit"}
          variant={"contained"}
          onClick={() => {
            reset({
              boligtype: "03",
              tid1: "2011K1",
              tid2: "2011K2",
            });
          }}
        >
          SEND
        </Button>
      </Grid>
    </Grid>
  );
};
