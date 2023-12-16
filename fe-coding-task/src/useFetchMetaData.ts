import { useEffect, useState } from "react";
import axios from "axios";

const METADATA_URL = "/api/v0/en/table/07241";

type DataResult = {
  code: "Boligtype" | "ContentsCode" | "Tid";
  text: string;
  valueTexts: string[];
  values: string[];
}[];

export const useFetchMetaData = () => {
  const [data, setData] = useState<DataResult>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      setIsError(false);
      setIsLoading(true);
      try {
        const result = await axios.get(METADATA_URL);
        setData(result.data.variables);
      } catch (error) {
        setIsError(true);
      }
      setIsLoading(false);
    };

    fetchData();
  }, []);

  return {
    data,
    isLoading,
    isLoaded: !isLoading && data.length > 0,
    isError,
  };
};
