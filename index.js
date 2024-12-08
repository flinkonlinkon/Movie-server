const express = require('express')
const cors = require('cors')
const app = express()
const port = process.env.PORT || 5000;

// rE2WdrNuKW5jrvFv
// Movie

app.use(express.json())
app.use(cors())


const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://Movie:rE2WdrNuKW5jrvFv@coffee.2vgrj.mongodb.net/?retryWrites=true&w=majority&appName=coffee";

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
    await client.connect();

   

    const movieCollection = client.db('movieDB').collection('movie')
    
    app.get('/movies',async(req,res)=>{
        const point = movieCollection.find()
        // const result = await point.toArray()
        const result = await movieCollection.aggregate([
            { $limit: 6 }
        ]).toArray();
        console.log(result);
        
        res.send(result)
    })

    app.post('/movies',async(req,res)=>{
        const movieData = req.body
        const result = await movieCollection.insertOne(movieData)
        console.log(result);
        
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


app.get('/',(req,res)=>{
    res.send('hello')
})

app.listen(port,()=>{
    console.log(port);
    
})