import express from 'express'
import mongoose from 'mongoose'
import path from 'path'
const app = express()

import HireForm from './Models/HireForm.js'

app.use(express.json())

app.post("/api/hire" , async (req,res) => {
    
    try {
        const hireReq = await HireForm.create(req.body)
        res.status(200).json(hireReq)
    } catch (error) {
        res.status(500).json({Messege:error.Messege})
    }
})

mongoose.connect('mongodb+srv://SecurityDB:admin123@securitydb.ecn63.mongodb.net/SecurityFirm?retryWrites=true&w=majority&appName=SecurityDB')
    .then(() => {
        console.log('Database Connected')
    })
    .catch(() => {
        console.log('Database Connection fail')
    })

app.listen(8000, () => {
    console.log('Server running on port 8000')
})