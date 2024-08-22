import "./App.css";
import { RouterProvider } from "react-router-dom";
import { routes } from "./router/routes";
import { ConfigProvider } from "antd";
import { lightTheme } from "./styles/antD_styles";

function App() {
  return (
    <ConfigProvider theme={lightTheme}>
      <RouterProvider router={routes} />
    </ConfigProvider>
  );
}

export default App;
