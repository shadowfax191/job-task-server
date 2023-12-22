const express = require('express')
var jwt = require('jsonwebtoken');
const cors = require('cors')
const app = express()
const port = process.env.PORT || 5000



app.use(cors())
app.use(express.json())



const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const { error } = require('console');
const uri = "mongodb+srv://shahariarhossain0599:jejqUkWFon1FVLbR@cluster0.ch5al24.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)


    const TaskCollection = client.db("taskDB").collection("task");
    const UsersCollection = client.db("taskDB").collection("users");

    
 


    app.get('/users', async (req, res) => {

      const result = await UsersCollection.find().toArray()
      res.send(result)
    })




    app.post('/tasks', async (req, res) => {

      const user = req.body
      const result = await TaskCollection.insertOne(user)
      res.send(result)
    })

 


    app.get('/tasks', async (req, res) => {

      const result = await TaskCollection.find().toArray()
      res.send(result)
    })

    app.put('/tasks/:id', async (req, res) => {
      const id = req.params.id;
      const data = req.body;
      const query = { _id: new ObjectId(id) }
      const updatedDoc = {
        $set: {
          info: data.table
        }

      }
      const result = await TaskCollection.updateOne(query, updatedDoc);
      res.send(result);
    })

app.put('/upTasks/:id', async (req, res) => {
      const id = req.params.id;
      const taskData = req.body;
   
      const query = { _id: new ObjectId(id) }
      const updatedDoc = {
        $set: {
          data: taskData.data
        }

      }
      const result = await TaskCollection.updateOne(query, updatedDoc);
      res.send(result);
    })

    app.delete('/tasks/:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) }
      const result = await TaskCollection.deleteOne(query)
      res.send(result)
    })







    
    

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);


app.get('/', (req, res) => {
  res.send('task server running')
})

app.listen(port, () => {
  console.log(`task server on port ${port}`);
})