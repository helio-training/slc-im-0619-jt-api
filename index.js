const express = require("express")
const cors = require("cors")
const app = express()
const port = process.env.PORT || 4000

app.use(express.json())
app.use(cors())

//get all leads
app.get('/leads', (req, res) => {
    res.send("Successful get all leads!");
});

//get leads by search, using two path params
app.get("/leads/:key/:value", (req, res) => {
  res.send(
    `Successful get search leads! ${req.params.key} : ${req.params.value}`
  );
});

//post new lead
app.post("/leads", (req, res) => {
    const body = req.body;
  res.send(`Posted. ${body}`);
});

//update lead by ID
app.put("/leads/:ID", (req, res) => {
  const body = req.body;
  res.send(`Putted. ${body} ${req.params.ID}`);
});

//delete lead by ID
app.delete("/leads/:ID", (req, res) => {
  res.send(`Deleted. ${req.params.ID}`);
});





app.listen(port,() => {console.log(`Listening on port ${port}`)})

