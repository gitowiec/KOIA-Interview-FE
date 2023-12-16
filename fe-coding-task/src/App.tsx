import React, { useState } from "react";
import {
  Box,
  Button,
  CircularProgress,
  Container,
  Grid,
  TextField,
} from "@mui/material";
import "./App.css";
import { Logo } from "./Logo";
import { useFetchMetaData } from "./useFetchMetaData";
import { Form } from "./Form";
import { LoaderFunction } from "react-router-dom";

const JSONstat = require("jsonstat-toolkit").default;

export const loader: LoaderFunction = async ({ params }) => {
  // console.log(params);
  return { urlParams: params };
};
const reset = {
  boligtype: "",
  tid1: "",
  tid2: "",
};
function App() {
  const { data: metaData, isLoading, isLoaded } = useFetchMetaData();
  // isLoaded && console.log(metaData);
  // isLoaded && console.log(prepareUISelectorsData(metaData));
  const [selectionState, setSelectionState] = useState({
    boligtype: "",
    tid1: "",
    tid2: "",
  });
  // const {data} = useFetchData();
  // console.log(JSONstat(data))
  console.log(selectionState);
  return (
    <Container fixed>
      <Grid item sx={{ p: 2 }}>
        <Logo />
      </Grid>
      {isLoaded ? (
        <Form setSelectionState={setSelectionState} metaData={metaData} />
      ) : (
        <Box sx={{ display: "flex" }} justifyContent={"center"} flex={1}>
          <CircularProgress />
        </Box>
      )}
    </Container>
  );
}

export default App;
