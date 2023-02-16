import React from "react";
import { App, ConfigProvider } from "antd";

export default () => (
  <ConfigProvider
    theme={{
      token: {
        colorPrimary: "#00b96b",
      },
    }}
  >
    <App />
  </ConfigProvider>
);
