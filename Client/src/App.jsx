import { createBrowserRouter, RouterProvider, Route, createRoutesFromElements } from 'react-router-dom';
import Layout from './Layout/Layout';
import AboutUs from './Pages/AboutUs';
import Clients from './Pages/Clients';
import Services from './Pages/Services';
import JoinUs from './Pages/JoinUs';
import Home from './Pages/Home';
import GetHired from './Pages/GetHired';
import JobApplyForm from './Components/Application Forms/JobApplyForm';
import SignIn from './Pages/SignIn';

// Using the createRoutesFromElements approach from the main branch
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Layout />}>
      <Route path='/' element={<Home />} />
      <Route path='signin' element={<SignIn />} />
      <Route path='about' element={<AboutUs />} />
      <Route path='services' element={<Services />} />
      <Route path='clients' element={<Clients />} />
      <Route path='joinus' element={<JoinUs />}>
        <Route path='jobapply' element={<JobApplyForm />} />
      </Route>
      <Route path='gethired' element={<GetHired />} />
    </Route>
  )
);

const App = () => {
  return (
    <RouterProvider router={router} />
  );
};

export default App;
