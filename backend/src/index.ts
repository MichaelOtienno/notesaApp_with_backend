const express = require("express");
const app = express();
import cors from 'cors'
app.use(express.json());

import notes_router from "./notesRoutes/notesRoutes";



app.use('/notes',notes_router)


app.listen(3600,()=>{
    console.log("Server running on port 3600")
});
