import { useState } from "react";
import { NavLink, Outlet, Link } from "react-router-dom"
import JobApplyForm from "../Components/Application Forms/JobApplyForm"


const JoinUs = () => {

  return (
    <div className='p-4 flex flex-col justify-center items-center'>

      <div>
        <div>
          <h1 className="text-3xl text-blue-900 font-bold mb-4">Join Our Security Team</h1>
          <h2 className="text-2xl text-blue-900 font-medium mb-4">Secure Your Future with Us!</h2>
          <p className="text-gray-600 mb-5">Join the team of security professionals at Security Guard Services. We are always looking for qualified security guards to join our team. We offer competitive wages, benefits, and flexible hours. If you are interested in a career in security, please fill out the form below and we will contact you shortly.</p>

          <h2 className="text-2xl text-blue-900 font-medium mb-4">Security Guard Application Process</h2>
          <p className="text-gray-600 mb-5">
             please fill out the form below and we will contact you shortly<br /><br />
            What Happens Next? <br />
            <ul className="list-disc  ml-5">
              <li>Our HR team will review your application.</li>
              <li>Shortlisted candidates will be contacted for an interview.</li>
              <li>Successful applicants undergo training (if required) before deployment</li>
            </ul>
          </p>
          
          <p className="text-gray-600 mb-5">Click the button below to start the application process on Indeed.</p>
        </div>
      </div>

      {/* <div>
        <nav className="mb-7">
          <NavLink className={({ isActive }) => isActive ? 'bg-red-300 hover:bg-red-400 px-4 py-2 rounded-lg font-medium ' : 'bg-blue-400 hover:bg-blue-500 px-4 py-2 rounded-lg font-medium'} to='jobapply'>Apply for job</NavLink>
        </nav>
      </div> */}

      {/* <Outlet /> */}

      <JobApplyForm/>
      
    </div>
  )
}

export default JoinUs