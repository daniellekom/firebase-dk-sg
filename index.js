//api means express app. something remember express

////SET UP CONNECTIONS
const express = require('express')
const app= express()
app.use(express.json())

app.get('/products',(request,response) => {
  response.send('The API is listening successfully')
})


//import set of library tools from google firebase

const {
  initializeApp,
  applicationDefault,
  cert,
} = require("firebase-admin/app");
const {
  getFirestore,
  Timestamp,
  FieldValue,
} = require("firebase-admin/firestore");

// import credentials "./" means my own file
const credentials = require("./credentials.json");

//create firebase services
initializeApp({
  credential: cert(credentials),
});

//cant be initialized before initialization above
const db = getFirestore();

//create a variable for your dianas cosmetics db collection

// const cosmeticCust = db.collection("customers");

// creating customer info for cosmetics in .doc

cosmeticCust.doc('4').set({
address: '222 sesame street',
customersid:'4',
email:'joeshome@gmail.com',
fName: 'joe',
lName: 'smith',
phone: 3056652215
})
.then(()=>{
    console.log('Added customer')

}).catch(console.error)

// // reading customer info for cosmetics

cosmeticCust
  .doc("2")
  .get()
  .then((doc) => {
    console.log(doc.id, " => ", doc.data());
  })
  .catch(console.error);

// read a collection function

cosmeticCust.get().then((snapshot) => {
  snapshot.forEach((doc) => {
    console.log(doc.id, "=>", doc.data());
  });
})
.catch(console.error)

 //update a field in your collection
const products = db.collection('products')
products.doc('1').update({brand:'bobbie brown', inStock:30,})





// API commands to pass the firebase functions 

// tell our api to read a  collection from firebase
app.get("/collection/getall", async (request,respose) => {
});
//read a single doc
app.get("/collection/getone", async (request,response)=> {});
//add a doc to a collection
app.post("/collection/insertone", async (request,response) => {});
//update a doc 
app.patch("/collection/updateone", async (request,response) => {});


//listen 
let port = 3001
app.listen(port,()=>{
  console.log(`listening on port ${port}`)
})




// http://localhost:3001/products
