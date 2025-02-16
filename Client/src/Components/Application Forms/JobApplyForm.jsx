import React from 'react'

const JobApplyForm = () => {
  return (
    <div>
        <div className='mb-4'>
        <h1 className='text-red-700 text-4xl'>Apply</h1>

      </div>
      <div className='bg-white lg:w-[500px] w-56'>
        <form action="">
          <div className="mb-5">
            <label htmlFor="" className='text-gray-900 text-sm font-medium mb-2'>Full Name : </label>
            <input className='bg-gray-50 border border-gray-300 rounded-lg text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 p-2.5 w-full ' type="text" name="" id="" required placeholder='xxx' />
          </div>
          <div className="mb-5">
            <label className='text-gray-900 text-sm font-medium mb-2' htmlFor="">Age : </label>
            <input className='bg-gray-50 border border-gray-300 rounded-lg text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 p-2.5 w-full ' type='number' name="" id="" required placeholder='xxx' />
          </div>
          <div className="mb-5">
            <label className='text-gray-900 text-sm font-medium mb-2' htmlFor="">Address : </label>
            <input className='bg-gray-50 border border-gray-300 rounded-lg text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 p-2.5 w-full ' type="text" name="" id="" required placeholder='xxx' />

          </div>
          <div className='mb-5'>
          <label className='text-gray-900 text-sm font-medium mb-2' htmlFor="">Gender : </label>
          <select class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" name="" id="">
            <option value="*">Please choose</option>
            <option value="male">Male</option>
            <option value="female">Female</option>

          </select>
        </div>
          <div className="mb-5">
            <label className='text-gray-900 text-sm font-medium mb-2' htmlFor="">Years of Experience : </label>
            <input className='bg-gray-50 border border-gray-300 rounded-lg text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 p-2.5 w-full ' type="number" name="" id="" required placeholder='xxx'  />
          </div>
          <div className="mb-5">
            <label className='text-gray-900 text-sm font-medium mb-2' htmlFor="">Email : </label>
            <input className='bg-gray-50 border border-gray-300 rounded-lg text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 p-2.5 w-full ' type="email" name="" id="" required placeholder='xxx' />
          </div>
          <div className="mb-5">
            <label className='text-gray-900 text-sm font-medium mb-2' htmlFor="">Mobile : </label>
            <input className='bg-gray-50 border border-gray-300 rounded-lg text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 p-2.5 w-full ' type="text" name="" id="" required placeholder='xxx' />
          </div>
          <div className="mb-5">
            
            <label className='text-gray-900 text-sm font-medium mb-2' htmlFor="">ID Card (JPG, JPEG, PNG) : </label>
            <p>both sides must be one image</p>
            <input className='block w-full bg-gray-50 border text-sm border-gray-300 p-2.5 rounded-lg ' type="file" name="" id="" accept='image/*' />
            
            
          </div>
          
          <div className="mb-5">
            <label className='text-gray-900 text-sm font-medium mb-2' htmlFor="">CV (PDF) : </label>
            
            <input className='block w-full bg-gray-50 border text-sm border-gray-300 p-2.5 rounded-lg ' type="file" name="" id="" accept='.pdf' />
            
          </div>
          <div className="mb-5 flex justify-center">
            <button className='text-gray-800 bg-blue-300 px-4 py-2 text-sm font-medium rounded-lg hover:bg-blue-400' type="submit">Submit</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default JobApplyForm