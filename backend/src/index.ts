import express, { json } from 'express'
import cors from 'cors'
import dotenv from 'dotenv'


import notes_router from "./notesRoutes/notesRoutes";


dotenv.config()
const port  = process.env.PORT || 3700
const app = express()
app.use(json())
app.use(cors())

app.use('/notes',notes_router)



app.listen(port,()=>{
    console.log(`notes running on ${port}`)
});
