import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider
} from 'react-router-dom'

import LayOut from './Layout/Layout'
import AboutUs from './Pages/AboutUs'
import Clients from './Pages/Clients'
import Services from './Pages/Services'
import JoinUs from './Pages/JoinUs'
import Home from './Pages/Home'
import GetHired from './Pages/GetHired'
import JobApplyForm from './Components/Application Forms/JobApplyForm'
import HandleGetHiredInJoinUs from './Pages/AboutUs'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<LayOut />}>

      <Route path='/' element={<Home />} />
      <Route path='about' element={<AboutUs />} />
      <Route path='services' element={<Services />} />
      <Route path='clients' element={<Clients />} />

      <Route path='joinus' element={<JoinUs />}>
        <Route path='jobapply' element={<JobApplyForm />} />

      </Route>
      <Route path='/' element={<HandleGetHiredInJoinUs />} />

      <Route path='gethired' element={<GetHired />} />

    </Route>
  )
)

const App = () => {
  return (
    <RouterProvider router={router} />
  )
}

export default App