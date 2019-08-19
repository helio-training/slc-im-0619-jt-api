const express = require("express")
const cors = require("cors")
const MongoClient = require("mongodb").MongoClient;
const ObjectId = require("mongodb").ObjectId;

const app = express()
const port = process.env.PORT || 4000
const db_url =
  "mongodb+srv://instructor:g7VppVh2tnXlfsNS@helio-slc-uocvs.mongodb.net/jobTracker?retryWrites=true&w=majority";

const client = new MongoClient(db_url, { useNewUrlParser: true, useUnifiedTopology: true });

app.use(express.json())
app.use(cors())

//get all leads
app.get('/leads', (req, res) => {
  client.connect (err => {
    const collection = client.db("jobTracker").collection("Leads");
    // perform actions on the collection object
    const results = collection.find({}).toArray((err, docs)=> {
      console.log(docs)
      res.send(docs)
    });

    client.close();
  });
});


//get leads by search, using two path params
app.get("/leads/:key/:value", (req, res) => {
  client.connect(err => {
    const collection = client.db("jobTracker").collection("Leads");
    // perform actions on the collection object
    const results = collection
      .find({ [req.params.key]: req.params.value }) // Using [computed_property_name] for dynamic key naming
      .toArray((err, docs) => {
        console.log(docs);
        res.send(docs);
      });

    client.close();
  });
  // res.send(
  //   `Successful get search leads! ${req.params.key} : ${req.params.value}`
  // );
});

//post new lead
app.post("/leads", (req, res) => {
    const body = req.body;
    client.connect(async err => {
      const collection = client.db("jobTracker").collection("Leads");
      // perform actions on the collection object
      const results = await collection.insertOne(body)
      res.send(results.insertedId);
      
      client.close();
    });
});

//update lead by ID
app.put("/leads/:ID", (req, res) => {
  const body = req.body;
  //res.send(`Putted. ${body} ${req.params.ID}`);
  client.connect(async err => {
    const collection = client.db("jobTracker").collection("Leads");
    // perform actions on the collection object
    const results = await collection.updateOne({_id: ObjectId(req.params.ID)},{$set: body});
    res.send(results);

    client.close();
  });
});

//delete lead by ID
app.delete("/leads/:ID", (req, res) => {
  // res.send(`Deleted. ${req.params.ID}`);
  client.connect(async err => {
    const collection = client.db("jobTracker").collection("Leads");
    // perform actions on the collection object
    const results = await collection.deleteOne({_id: ObjectId(req.params.ID)});
    res.send(results);

    client.close();
  });
});







app.listen(port,() => {console.log(`Listening on port ${port}`)})

