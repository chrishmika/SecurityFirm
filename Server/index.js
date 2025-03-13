import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'

import dotenv from 'dotenv'
dotenv.config()

const app = express()

import HireFormRoutes from './routes/FormRoutes.js'

app.use(express.json())
app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use('/uploads', express.static('/uploads'))

app.use('/api', HireFormRoutes)

mongoose.connect(process.env.MONGO_URL)
  .then(() => {
    console.log('Database Connected')

    app.listen(process.env.PORT, () => {
      console.log('Server running on port 8000')
    })
  })
  .catch(() => {
    console.log('Database Connection fail')
  })

