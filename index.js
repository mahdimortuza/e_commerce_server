require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const { MongoClient, ServerApiVersion } = require("mongodb");
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

const uri = process.env.URI;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});
async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)

    await client.connect();
    const productsBd = client.db("e_commerceDb");
    const productsCollection = productsBd.collection("products");





    // get all products api
    app.get('/products', async (req, res) => {
      try {
        const products = await productsCollection.find().toArray()
        res.status(200).json(products);
      } catch (err) {
        console.error('error fetching products', err);
        res.status(500).json({ message: "internal server error" });
      }
    });








    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    //   await client.close();
  }
}
run().catch(console.dir);

//   root api for test
app.get("/", (req, res) => {
  res.send("hello world");
});

app.listen(port, () => {
  console.log(`e commerce is open on port ${port}`);
});
