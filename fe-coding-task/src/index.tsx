import React from "react";
import ReactDOM from "react-dom/client";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import "./index.css";
import App, { loader } from "./App";
import reportWebVitals from "./reportWebVitals";
import { CssBaseline } from "@mui/material";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement,
);

const router = createBrowserRouter([
  {
    path: "/:boligtype?/:tid1?/:tid2?",
    loader: loader,
    element: <App />,
  },
]);

root.render(
  <React.StrictMode>
    <CssBaseline />
    <RouterProvider router={router} />
  </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
