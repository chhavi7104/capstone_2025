import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import App from "./App";
import "./index.css";
import { CompareProvider } from "./context/CompareContext";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
       <CompareProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
      </CompareProvider>
    </QueryClientProvider>
  </React.StrictMode>
);