const express = require("express")
const cors = require("cors")
const app = express()
const port = process.env.PORT || 4000

app.use(express.json())
app.use(cors())

//get all leads
//get leads by search, using two path params

//post new lead

//update lead by ID

//delete lead by ID








app.listen(port,() => {console.log(`Listening on port ${port}`)})

