import React, { useMemo, useState } from "react";
import { Box, CircularProgress, Container, Grid } from "@mui/material";
import "./App.css";
import { Logo } from "./Logo";
import { useFetchMetaData } from "./hooks/useFetchMetaData";
import { Form } from "./Form/Form";
import { Link, LoaderFunction } from "react-router-dom";
import { Chart } from "./Chart";
import { useFetchData } from "./hooks/useFetchData";
import { useFormNavigation } from "./hooks/useFormNavigation";
import { getQuaterRange } from "./helpers/getQuaterRange";

const JSONstat = require("jsonstat-toolkit").default;

export const loader: LoaderFunction = async ({ params }) => {
  return { urlParams: params };
};
type Selection = {
  boligtype: string;
  tid1: string;
  tid2: string;
};

type JSONstat = {
  label: string;
  source: string;
  updated: string;
  length: number;
  n: number;
  id: string[];
  Dimension(name: string): {
    class: string;
    extension: { elimination: boolean; show: string };
    hierarchy: boolean;
    id: string[];
    link: { describedby: string[] };
    note?: string;
    label: string;
    role: string;
    length: number;
  };
  Data(address: any): any[];
};

const getDatasetInfo = (payload: any, selection: Selection) => {
  const dataset: JSONstat = JSONstat(payload);
  return dataset.Data({
    ContentsCode: "KvPris",
    Boligtype: selection.boligtype,
  });
};

function App() {
  const {
    data: metaData,
    isLoading,
    isLoaded: isMetaLoaded,
  } = useFetchMetaData();

  const [selectionState, setSelectionState] = useState({
    boligtype: "",
    tid1: "",
    tid2: "",
  });

  const [quarterRange, setQuarterRange] = useState<string[]>([]);

  const { changeUrl, currentParams } = useFormNavigation(setSelectionState);

  const {
    data,
    setQuery,
    isLoaded: isDataLoaded,
    isLoading: isDataLoading,
  } = useFetchData();

  const memoizedChartData = useMemo(
    () => getDatasetInfo(data, selectionState),
    [data, selectionState],
  );

  // const memoizedQuarterRange = useMemo(
  //   () =>
  //     selectionState.tid1 && selectionState.tid2 && 0
  //       ? getQuaterRange(selectionState.tid1, selectionState.tid2)
  //       : [],
  //   [selectionState.tid1, selectionState.tid2],
  // );
  return (
    <Container fixed>
      <Grid item sx={{ p: 2 }}>
        <Link to={"/"}>
          <Logo />
        </Link>
      </Grid>
      {isMetaLoaded ? (
        <Form
          currentParams={currentParams}
          setQuery={setQuery}
          changeUrl={changeUrl}
          metaData={metaData}
          setSelectionState={setSelectionState}
          setQuarterRange={setQuarterRange}
        />
      ) : (
        <Box sx={{ display: "flex" }} justifyContent={"center"} flex={1}>
          <CircularProgress />
        </Box>
      )}
      <Box>
        {isDataLoading && (
          <Box sx={{ display: "flex" }} justifyContent={"center"} flex={1}>
            <CircularProgress />
          </Box>
        )}
        {isDataLoaded && !isDataLoading && (
          <Chart quarterRange={quarterRange} data={memoizedChartData} />
        )}
      </Box>
    </Container>
  );
}

export default App;
