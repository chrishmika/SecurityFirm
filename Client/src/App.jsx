import { createBrowserRouter } from "react-router-dom";
import Layout from "./Layout/Layout";
import SignIn from "./Pages/SignIn";

const App = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <SignIn />,
      },
    ],
  },
]);

export default App;
