import { createBrowserRouter, RouterProvider, Route, createRoutesFromElements } from "react-router-dom";
//website imports
import Layout from "./Layout/LayoutWeb";
import AboutUs from "./Pages/AboutUs";
import Clients from "./Pages/Clients";
import Services from "./Pages/Services";
import JoinUs from "./Pages/JoinUs";
import Home from "./Pages/Home";
import GetHired from "./Pages/GetHired";
import JobApplyForm from "./Components/Application Forms/JobApplyForm";
//admin imports
import LayoutAdmin from "./Layout/LayoutAdmin";
import SignIn from "./Pages/SignIn";

// Using the createRoutesFromElements approach from the main branch
//routings that related with website
const webRouter = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route path="/" element={<Home />} />
      <Route path="about" element={<AboutUs />} />
      <Route path="services" element={<Services />} />
      <Route path="clients" element={<Clients />} />
      <Route path="joinus" element={<JoinUs />}>
        <Route path="jobapply" element={<JobApplyForm />} />
      </Route>
      <Route path="gethired" element={<GetHired />} />
      <Route path="signin" element={<SignIn />} />
    </Route>
  )
);

//routings that related with admin dashboard
//const adminRouter = createBrowserRouter(
// createRoutesFromElements(
// <Route path="/dashboard" element={<LayoutAdmin />}>
//<Route path="signin" element={<SignIn />} />
//</Route>
//)
//);

const App = () => {
  //return <RouterProvider router={(webRouter, adminRouter)} />;
  return <RouterProvider router={webRouter} />;
};

export default App;
