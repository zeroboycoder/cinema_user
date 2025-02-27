import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "./App.tsx";
import { Provider } from "./provider.tsx";
import "@/styles/globals.css";
import { NuqsAdapter } from 'nuqs/adapters/react'

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider>
        <NuqsAdapter>
          <App />
        </NuqsAdapter>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
);
