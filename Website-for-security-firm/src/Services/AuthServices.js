import React from 'react'
import axios from 'axios'

const uploadImage = async(email,type,file) => {
  const formData = new FormData()
  formData.append('email',email)
  formData.append('type',type)
  formData.append('file',file)
    console.log(file);
  try {
    const response = await axios.post('http://localhost:4000/api/v1/web/uploads',formData,{
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
    return response.data.path;
  } catch (error) {
    console.log(error)
  }

}

export default uploadImage