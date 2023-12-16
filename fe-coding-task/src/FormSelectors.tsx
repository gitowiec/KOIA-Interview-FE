import React, { Dispatch, SetStateAction } from "react";
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
  UseFormRegister,
} from "react-hook-form/dist/types/form";
import { Inputs } from "./Form";
import { FieldErrors } from "react-hook-form/dist/types/errors";
import { Controller } from "react-hook-form";
import { useFormNavigation } from "./useFormNavigation";

type Props = {
  selectorsData: Record<
    "Boligtype" | "ContentsCode" | "Tid",
    {
      text: string;
      mappedValues: Record<"key" | "value", string>[];
    }
  >;
  register: UseFormRegister<Inputs>;
  getValues: UseFormGetValues<Inputs>;
  errors: FieldErrors<Inputs>;
  setSelectionState: Dispatch<
    SetStateAction<Record<"boligtype" | "tid1" | "tid2", string>>
  >;
  control: Control<Inputs, any>;
};

export const FormSelectors: React.FC<Props> = ({
  selectorsData: { Boligtype, Tid },
  register,
  getValues,
  errors,
  control,
  setSelectionState,
}) => {
  const validateTid1 = (value: string) => {
    const tid2val = getValues().tid2;
    if (tid2val === "") return true;
    return (
      compareQuarters(value, tid2val) > 0 ??
      `Choose smaller value than ${tid2val} or..`
    );
  };

  const validateTid2 = (value: string) => {
    const tid1val = getValues().tid1;
    if (tid1val === "") return true;
    return (
      compareQuarters(tid1val, value) > 0 ??
      `..choose bigger value than ${tid1val}`
    );
  };

  const { changeUrl } = useFormNavigation(setSelectionState);

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
            render={({ field }) => (
              <Select
                {...field}
                labelId={`Boligtype-select-label`}
                label={Boligtype.text}
                defaultValue={Boligtype.mappedValues[0].key}
                onChange={onChange}
              >
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
            render={({ field }) => (
              <Select
                labelId={`Tid1-select-label`}
                label={`From ${Tid.text}`}
                defaultValue={Tid?.mappedValues[0].key}
                {...register("tid1", {
                  validate: validateTid1,
                  onChange,
                })}
              >
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
          <Select
            labelId={`Tid2-select-label`}
            label={`To ${Tid.text}`}
            defaultValue={Tid?.mappedValues[Tid?.mappedValues.length - 1].key}
            {...register("tid2", {
              validate: validateTid2,
              onChange,
            })}
          >
            {Tid?.mappedValues?.map((value) => {
              return (
                <MenuItem key={value.key} value={value.key}>
                  {value.value}
                </MenuItem>
              );
            })}
          </Select>
          <FormHelperText>{errors?.tid2?.message}</FormHelperText>
        </FormControl>
      </Grid>
    </>
  );
};
