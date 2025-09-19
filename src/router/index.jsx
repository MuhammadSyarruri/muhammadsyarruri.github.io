import { createBrowserRouter } from "react-router-dom";

import Layout from "../Layout";
import App from "../App";
import ProjectPage from "../pages/Project";
import ContactPage from "../pages/Contact";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "/", element: <App /> },
      { path: "/project", element: <ProjectPage /> },
      { path: "/contact", element: <ContactPage /> },
    ],
  },
]);
