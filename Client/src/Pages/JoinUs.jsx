import { useState } from "react";
import { NavLink, Outlet, Link } from "react-router-dom"

const JoinUs = () => {

  return (
    <div className='p-4 flex flex-col justify-center items-center'>

      <div>
        <div>
          <h1 className="text-3xl text-blue-900 font-bold mb-4">Security Guard Employment Opportunities</h1>
          <h2 className="text-2xl text-blue-900 font-medium mb-4">Join the Off Duty Officers</h2>
          <p className="text-gray-600 mb-5">Join the team of security professionals at Security Guard Services. We are always looking for qualified security guards to join our team. We offer competitive wages, benefits, and flexible hours. If you are interested in a career in security, please fill out the form below and we will contact you shortly.</p>

          <h2 className="text-2xl text-blue-900 font-medium mb-4">Security Guard Application Process</h2>
          <p className="text-gray-600 mb-5">
            To ensure we provide every candidate with the attention they deserve, we kindly request that all applicants begin the hiring process by visiting our JOBS page on Indeed. Only applicants who follow the prompts and apply on Indeed will be considered for employment.<br /><br />

            Please note: <br />
            <ul className="list-disc  ml-5">
              <li>Do not call our call center regarding employment opportunities. Our team is dedicated to managing the application process online to streamline and expedite the review of your information.</li>
              <li>Once you complete the application process on Indeed, our team will review your application and contact you promptly regarding the next steps</li>
            </ul>
          </p>
          <h3 className="text-2xl text-blue-900 font-medium mb-4">Ready to Apply?</h3>
          <p className="text-gray-600 mb-5">Click the button below to start the application process on Indeed.</p>
        </div>

      </div>
      <div>
        <nav className="mb-7">
          <NavLink className={({ isActive }) => isActive ? 'bg-red-300 hover:bg-red-400 px-4 py-2 rounded-lg font-medium ' : 'bg-blue-400 hover:bg-blue-500 px-4 py-2 rounded-lg font-medium'} to='jobapply'>Apply for job</NavLink>
        </nav>
        
      </div>
      <Outlet />



    </div>
  )
}

export default JoinUs