import { useEffect, useState } from "react";
import { getDataQuery } from "./getDataQuery";
import axios from "axios";

export const useFetchData = (
  q: Partial<Record<"boligtype" | "tid1" | "tid2", string>> = {},
) => {
  const [data, setData] = useState({});
  const [query, setQuery] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      setIsError(false);
      setIsLoading(true);
      try {
        const result = await axios.post(
          "/api/v0/en/table/07241",
          getDataQuery(query),
        );
        setData(result.data);
      } catch (error) {
        setIsError(true);
      }
      setIsLoading(false);
    };

    if (Object.keys(query).length > 0) {
      fetchData();
    }
  }, [query]);

  return {
    data,
    setQuery,
    isLoading,
    isLoaded: !isLoading && Object.keys(data).length > 0,
    isError,
  };
};
