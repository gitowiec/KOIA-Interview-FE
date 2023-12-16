import { useEffect, useState } from "react";
import { getDataQuery } from "./getDataQuery";
import axios from "axios";

export const useFetchData = () => {
  const [data, setData] = useState({});
  const [query, setQuery] = useState(getDataQuery());

  useEffect(() => {
    const fetchData = async () => {
      // const result = await axios.get('https://data.ssb.no/api/v0/en/console/meta/table/06695/');
      const result = await axios.post("/api/v0/en/table/07241", query);
      setData(result.data);
    };

    fetchData();
  }, [query]);

  return {
    data,
    setQuery,
  };
};
