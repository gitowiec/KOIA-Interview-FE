import React, { Dispatch, memo, SetStateAction } from "react";
import {
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { compareQuarters } from "./compareQuarters";
import {
  Control,
  UseFormGetValues,
  UseFormSetError,
} from "react-hook-form/dist/types/form";
import { Inputs } from "./Form";
import { FieldErrors } from "react-hook-form/dist/types/errors";
import { Controller } from "react-hook-form";

type Props = {
  selectorsData: Record<
    "Boligtype" | "ContentsCode" | "Tid",
    {
      text: string;
      mappedValues: Record<"key" | "value", string>[];
    }
  >;
  getValues: UseFormGetValues<Inputs>;
  errors: FieldErrors<Inputs>;
  changeUrl: (compound: Record<"boligtype" | "tid1" | "tid2", string>) => void;
  control: Control<Inputs, any>;
  setError: UseFormSetError<Inputs>;
};

export const FormSelectors: React.FC<Props> = ({
  selectorsData: { Boligtype, Tid },
  getValues,
  errors,
  control,
  changeUrl,
  setError,
}) => {
  const validateTid1 = (value: string) => {
    const tid2val = getValues().tid2;
    if (tid2val === "") return true;
    return (
      compareQuarters(value, tid2val) > 0 ??
      setError("tid1", {
        type: "manual",
        message: `Choose smaller value than ${tid2val} or..`,
      })
    );
  };

  const validateTid2 = (value: string) => {
    const tid1val = getValues().tid1;
    if (tid1val === "") return true;
    return (
      compareQuarters(tid1val, value) > 0 ??
      setError("tid2", {
        type: "manual",
        message: `..choose bigger value than ${tid1val}`,
      })
    );
  };

  const onChange = (e: any) => {
    changeUrl({ [e.target.name]: e.target.value } as Record<
      "boligtype" | "tid1" | "tid2",
      string
    >);
    return true;
  };

  return (
    <>
      <Grid item xs={6} sm={4}>
        <FormControl size="small" sx={{ width: 1 }}>
          <InputLabel id={`Boligtype-select-label`}>
            {Boligtype.text}
          </InputLabel>
          <Controller
            name="boligtype"
            control={control}
            render={({ field, formState }) => (
              <Select
                {...field}
                labelId={`Boligtype-select-label`}
                label={Boligtype.text}
                defaultValue={Boligtype.mappedValues[0].key}
                onChange={onChange}
              >
                <MenuItem key={""} value={""}>
                  &nbsp;
                </MenuItem>
                {Boligtype?.mappedValues?.map((value) => {
                  return (
                    <MenuItem key={value.key} value={value.key}>
                      {value.value}
                    </MenuItem>
                  );
                })}
              </Select>
            )}
          />
        </FormControl>
      </Grid>
      <Grid item xs={6} sm={4}>
        <FormControl size="small" sx={{ width: 1 }} error={!!errors?.tid1}>
          <InputLabel id={`Tid1-select-label`}>From {Tid.text}</InputLabel>
          <Controller
            name="tid1"
            control={control}
            rules={{
              validate: {
                val: validateTid1,
              },
            }}
            render={({ field, formState }) => (
              <Select
                {...field}
                labelId={`Tid1-select-label`}
                label={`From ${Tid.text}`}
                onChange={onChange}
              >
                <MenuItem key={""} value={""}>
                  &nbsp;
                </MenuItem>
                {Tid?.mappedValues?.map((value) => {
                  return (
                    <MenuItem key={value.key} value={value.key}>
                      {value.value}
                    </MenuItem>
                  );
                })}
              </Select>
            )}
          />
          <FormHelperText>{errors?.tid1?.message}</FormHelperText>
        </FormControl>
      </Grid>
      <Grid item xs={6} sm={4}>
        <FormControl size="small" sx={{ width: 1 }} error={!!errors?.tid2}>
          <InputLabel id={`Tid2-select-label`}>To {Tid.text}</InputLabel>
          <Controller
            name="tid2"
            control={control}
            rules={{
              validate: { val: validateTid2 },
            }}
            render={({ field }) => (
              <Select
                {...field}
                labelId={`Tid2-select-label`}
                label={`To ${Tid.text}`}
                onChange={onChange}
              >
                <MenuItem key={""} value={""}>
                  &nbsp;
                </MenuItem>
                {Tid?.mappedValues?.map((value) => {
                  return (
                    <MenuItem key={value.key} value={value.key}>
                      {value.value}
                    </MenuItem>
                  );
                })}
              </Select>
            )}
          />
          <FormHelperText>{errors?.tid2?.message}</FormHelperText>
        </FormControl>
      </Grid>
    </>
  );
};
