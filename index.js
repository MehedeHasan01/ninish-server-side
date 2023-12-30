const express = require('express');
const cors = require('cors');
const qrcode = require('qrcode');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config();
const port = process.env.PORT || 5000;
const app = express();

// middleware
app.use(cors());
app.use(express.json());

app.get('/', (req, res)=>{
    res.send('নিণীষ server is runing')
});




const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.3cndw30.mongodb.net/?retryWrites=true&w=majority`;

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
    const usersCollection = client.db('spaceDB').collection('users');
    const registationsCollection = client.db('spaceDB').collection('registations');

    // get users all data from mongodb database
    app.get('/users', async(req, res)=>{
        const cursor = usersCollection.find();
        const result = await cursor.toArray()
        res.send(result)
    });

    // get users one data from mongodb database
    app.get('/users/:id', async(req, res)=>{
        const id = req.params.id;
        const filter = {_id: new ObjectId(id)}
        const result = await usersCollection.findOne(filter)
        res.send(result)
    })


    // get users all data from mongodb database
    app.get('/registations', async(req, res)=>{
        const cursor = registationsCollection.find();
        const result = await cursor.toArray()
        res.send(result)
    });





     // get registations one data from mongodb database
     app.get('/registations/:id', async(req, res)=>{
        const id = req.params.id;
        const filter = {_id: new ObjectId(id)}
        const result = await registationsCollection.findOne(filter)
        res.send(result)
    })
    // get registations one data from mongodb database. filter by email
    // app.get('/registations/:email', async(req, res)=>{
    //     const email = req.params.email;
    //     const filter = { email: email.toString()}
    //     const result = await registationsCollection.findOne(filter)
    //     res.send(result)
    // })
    // get registations one data from mongodb database. filter by email
    // Assuming you have a MongoDB client initialized (e.g., MongoClient) and a database connection established

    // app.get('/registations/:email', async(req, res)=>{
    //     const email = req.params.email;
    //     // if(!email){
    //     //     res.send([]);
    //     // };
    //     const qurey = {userEmail: email};
    //     const result = registationsCollection.find(qurey).toArray();
    //     res.send(result)
    // });

// Define the collection you want to query









    // User login Data Post
    app.post('/users', async(req, res)=>{
        const user = req.body;
        const result = await usersCollection.insertOne(user);
        // console.log(result);
        res.send(result)
    })

    // User registations data Post
    app.post('/registations', async(req, res)=>{
        const user = req.body;
        const result = await registationsCollection.insertOne(user);
        res.send(result)
    })

    // User data update (put)
    // app.put('/users/:id', async(req, res) =>{
    //     const id = req.params.id
    //     const user = req.body;
    //     const filter = {_id: new ObjectId(id)}
    //     const options = {upsert: true};
    //     const updateUser = {
    //         $set:{
    //             name: user.name,
    //             dateOfBirth: user.dateOfBirth,
    //             district: user.district,
    //             clas: user.clas,
    //             institute: user.institute,
    //             category: user.category,
    //             translationID: user.translationID,
    //             senderNumber: user.senderNumber,
    //             receiverNumber: user.receiverNumber,
    //             refer: user.refer
    //         }
    //     };
    //     const result = await usersCollection.updateOne(filter,updateUser,options);
    //     res.send(result)
    // } )


    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
  }
}
run().catch(console.dir);




app.listen(port, (req, res)=>{
    console.log('Server Port number', port);
})