import { createBrowserRouter } from "react-router-dom";
import Welcome from "../pages/Welcome";
import Template from "../template/Template";
import HomePage from "../pages/Homepage";
import SearchPage from "../pages/SearchPage";

export const routes = createBrowserRouter([
  {
    path: "/",
    element: <Welcome />,
  },
  {
    path: "/app",
    element: <Template />,
    children: [
      {
        path: "",
        element: <HomePage />,
      },
      {
        path: "search",
        element: <SearchPage />,
      },
    ],
  },
]);
