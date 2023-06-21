import IntlProvider from "@/context/intl";
import LayoutWrapper from "./layouts";
import QueryClientProvider from "./queries";
import React from "react";
import ReactDOM from "react-dom/client";
import { HashRouter } from "react-router-dom";
import { ConfigProvider, App } from "antd";

// import 'antd/dist/antd.variable.css'
const root = document.getElementById("root")!;

ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <div style={{ height: "100vh" }}>
      <QueryClientProvider>
        <IntlProvider>
          <ConfigProvider>
            <App>
              <HashRouter>
                <LayoutWrapper />
              </HashRouter>
            </App>
          </ConfigProvider>
        </IntlProvider>
      </QueryClientProvider>
    </div>
  </React.StrictMode>
);
