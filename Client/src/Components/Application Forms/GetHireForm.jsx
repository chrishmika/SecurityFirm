import React from 'react'

const GetHireForm = () => {
  return (
    <div className='bg-white lg:w-[500px] sm:w-100 '>
      <h1 className='text-red-800 text-2xl mb-4 p-3 font-medium text-center'>Fill the form completely </h1>

      <form action="">

        <div className=" mb-5">
          <label htmlFor="" className='text-gray-900 text-sm font-medium mb-2'>Full Name : </label>
          <input className='bg-gray-50 border border-gray-300 rounded-lg text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 p-2.5 w-full ' type="text" name="" id="" required placeholder='xxx' />
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
          <label className='text-gray-900 text-sm font-medium mb-2' htmlFor="">Service Location : </label>
          <input className='bg-gray-50 border border-gray-300 rounded-lg text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 p-2.5 w-full ' type="text" name="" id="" required placeholder='xxx' />

        </div>

        <div className="mb-5">
          <label className='text-gray-900 text-sm font-medium mb-2' htmlFor="">District : </label>
          <input className='bg-gray-50 border border-gray-300 rounded-lg text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 p-2.5 w-full ' type="text" name="" id="" required placeholder='xxx' />
        </div>

        <div className="mb-5">
          <label className='text-gray-900 text-sm font-medium mb-2' htmlFor="">Nearest City : </label>
          <input className='bg-gray-50 border border-gray-300 rounded-lg text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 p-2.5 w-full ' type="text" name="" id="" required placeholder='xxx' />
        </div>

        <div
          className='mb-5'>
          <p className='mb-2'>Detailed Dates & Times</p>
          <div className='flex justify-between'>
            <div className='pr-4'>
              <label className='text-gray-900 text-sm font-medium mb-2' htmlFor="">Start of servive date</label>
              <input className='bg-gray-50 border border-gray-300 rounded-lg text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 p-2.5 w-full ' type="date" name="" id="" />
            </div>
            <div className=''>
              <label className='text-gray-900 text-sm font-medium mb-2' htmlFor="">How many days : </label>
              <input className='bg-gray-50 border border-gray-300 rounded-lg text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 p-2.5 w-full ' type="number" name="" id="" min="1" max="24" step="1" />
            </div>
          </div>

        </div>

        <div className='mb-5'>
          <label className='text-gray-900 text-sm font-medium mb-2' htmlFor="">What type of service are you looking for?</label>
          <select class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" name="" id="">
            <option value="*">Please choose</option>
            <option value="Security Guard Services">Security Guard Services</option>
            <option value="Event Security">Event Security</option>
            <option value="Fire Watch">Fire Watch</option>

          </select>
        </div>
        <div>

        </div>
        <div className='mb-5'>
          <label className='text-gray-900 text-sm font-medium mb-2' htmlFor="">Provide details of your security services request:</label>
          <textarea name="" id="" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500" rows="5" placeholder='Provide additional details : Specific days, Hours ... '></textarea>
        </div>
        <div className="mb-5 flex justify-center">
          <button className='text-gray-800 bg-blue-300 px-4 py-2 text-sm font-medium rounded-lg hover:bg-blue-400' type="submit">Submit</button>
        </div>
      </form>
    </div>
  )
}

export default GetHireForm