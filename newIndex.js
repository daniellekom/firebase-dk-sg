//connecting firebase and express

const express = require("express");
const { initializeApp, getApps, cert } = require("firebase-admin/app");
const { getFirestore } = require("firebase-admin/firestore");
const credentials = require("./credentials.json");

const app = express();
//this line u use for posting on json
app.use(express.json())
const PORT = process.env.PORT || 3001;

function connectToFirestore() {
  if (!getApps().length) {
    initializeApp({
      credential: cert(credentials),
    });
  }
  return getFirestore();
}

//read the express through .get
app.get("/products", (req, res) => {
  const db = connectToFirestore();
  db.collection("products")
    .get()
    .then((snapshot) => {
      const products = snapshot.docs.map((doc) => {
        let product = doc.data();
        product.id = doc.id;
        return product;
      });
      res.status(200).send(products);
    })
    .catch(console.error);
});

//read a single doc
app.get("/collection/getone", async (request, response) => {
  const db = connectToFirestore();
  db.collection("products")
    .doc("101")
    .get()
    .then((doc) => {
  response.status(200).send(doc.data()); 
})
    .catch(console.error);
});

app.listen(PORT, () => console.log(`Listening on port ${PORT}...`));

//add a doc to a collection to post
app.post('/products', (request,response) =>{
const{brand,description,item,price,skuNum} =request.body
const product = {brand,description,item,price,skuNum}
const db = connectToFirestore();
db.collection('products').add(product)
.then(() => response.send(product))
.then(console.log(product))
.catch(console.error)
})


//update a doc 


// http://localhost:3001/products
