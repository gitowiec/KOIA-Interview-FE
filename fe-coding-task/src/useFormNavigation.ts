import { Dispatch, SetStateAction } from "react";
import { useNavigate, useParams } from "react-router-dom";

export const useFormNavigation = (
  setSelectionState: Dispatch<
    SetStateAction<Record<"boligtype" | "tid1" | "tid2", string>>
  >,
) => {
  const { boligtype: boligtypeUrl, tid1: tid1url, tid2: tid2url } = useParams();
  const navigate = useNavigate();

  return {
    changeUrl(compound: Record<"boligtype" | "tid1" | "tid2", string>) {
      const { boligtype, tid1, tid2 } = compound;
      setSelectionState((prevState) => {
        return {
          ...prevState,
          ...compound,
        };
      });

      const url = [];
      url.push(boligtype ?? boligtypeUrl);
      url.push(tid1 ?? tid1url);
      url.push(tid2 ?? tid2url);

      navigate("/" + url.join("/"));
    },
  };
};
