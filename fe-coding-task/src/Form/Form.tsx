import React, { Dispatch, SetStateAction, useEffect } from "react";
import { Button, Grid, TextField } from "@mui/material";
import { FormSelectors } from "./FormSelectors";
import {
  prepareUISelectorsData,
  SSBTableMetadata,
} from "./helpers/prepareUISelectorsData";
import { set, SubmitHandler, useForm } from "react-hook-form";
import { getQuaterRange } from "../helpers/getQuaterRange";
import localForage, { key } from "localforage";

type Props = {
  metaData: SSBTableMetadata;
  changeUrl: (compound: Record<"boligtype" | "tid1" | "tid2", string>) => void;
  setQuery: Dispatch<SetStateAction<any>>;
  currentParams: Record<"boligtype" | "tid1" | "tid2", string>;
  setSelectionState: Dispatch<
    SetStateAction<Record<"boligtype" | "tid1" | "tid2", string>>
  >;
  setQuarterRange: Dispatch<SetStateAction<string[]>>;
};

export type Inputs = {
  boligtype: string;
  tid1: string;
  tid2: string;
  remark: string;
};

export const Form: React.FC<Props> = ({
  setQuery,
  metaData,
  changeUrl,
  currentParams,
  setSelectionState,
  setQuarterRange,
}) => {
  const selectorsData = prepareUISelectorsData(metaData);

  const {
    register,
    handleSubmit,
    watch,
    getValues,
    reset,
    control,
    setError,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<Inputs>({
    defaultValues: currentParams,
    mode: "all",
  });
  useEffect(() => {
    reset(currentParams);
  }, [currentParams]);
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    setQuery(currentParams);
    setSelectionState(data);
    setQuarterRange(getQuaterRange(data.tid1, data.tid2));
  };

  useEffect(() => {
    const subscription = watch(async (value, { name, type }) => {
      const key = `remark-${value.boligtype}-${value.tid1}-${value.tid2}`;
      if (!name && !type) {
        const item = (await localForage.getItem(key)) as string;
        setValue("remark", item);
      } else {
        await localForage.setItem(key, value.remark);
      }
    });
    return () => subscription.unsubscribe();
  }, [watch]);

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
          setError={setError}
          control={control}
          getValues={getValues}
          selectorsData={selectorsData}
          errors={errors}
          changeUrl={changeUrl}
        />
      </Grid>
      <Grid item py={2} display={"flex"} flexDirection={"row"}>
        <TextField {...register("remark")} label="Remark" multiline rows={4} />
      </Grid>
      <Grid item py={2} display={"flex"} flexDirection={"row"}>
        <Button type={"submit"} variant={"contained"}>
          SEND
        </Button>
      </Grid>
    </Grid>
  );
};
