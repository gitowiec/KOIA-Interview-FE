import { Dispatch, SetStateAction, useCallback } from "react";
import { useSearchParams } from "react-router-dom";

const defaultQueryParams = {
  boligtype: "",
  tid1: "",
  tid2: "",
};

type Result = {
  changeUrl: (compound: Record<"boligtype" | "tid1" | "tid2", string>) => void;
  currentParams: Record<"boligtype" | "tid1" | "tid2", string>;
};

export const useFormNavigation = (
  setSelectionState: Dispatch<
    SetStateAction<Record<"boligtype" | "tid1" | "tid2", string>>
  >,
): Result => {
  let [searchParams, setSearchParams] = useSearchParams(defaultQueryParams);

  const {
    boligtype: boligtypeUrl,
    tid1: tid1url,
    tid2: tid2url,
  } = Object.fromEntries(searchParams.entries());

  return {
    changeUrl: useCallback(
      (compound: Record<"boligtype" | "tid1" | "tid2", string>) => {
        const { boligtype, tid1, tid2 } = compound;
        setSelectionState((prevState) => {
          return {
            ...prevState,
            ...compound,
          };
        });

        const urlSearchParams = new URLSearchParams(searchParams);

        urlSearchParams.set("boligtype", boligtype ?? boligtypeUrl);
        urlSearchParams.set("tid1", tid1 ?? tid1url);
        urlSearchParams.set("tid2", tid2 ?? tid2url);
        setSearchParams(urlSearchParams);
      },
      [setSelectionState, searchParams],
    ),
    currentParams: {
      boligtype: boligtypeUrl,
      tid1: tid1url,
      tid2: tid2url,
    },
  };
};
