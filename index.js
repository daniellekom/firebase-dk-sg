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

//connect to firebase
initializeApp({
  credential: cert(credentials),
});

//connect to firestore
const db = getFirestore();

//create a variable for your dianas cosmetics db collection

const cosmeticCust = db.collection("customers");

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

// reading customer info for cosmetics

cosmeticCust
  .doc("2")
  .get()
  .then((doc) => {
    console.log(doc.id, " => ", doc.data());
  })
  .catch(console.error);

// // read a collection

cosmeticCust.get().then((snapshot) => {
  snapshot.forEach((doc) => {
    console.log(doc.id, "=>", doc.data());
  });
})
.catch(console.error)

// update a field in your collection

const products = db.collection('products')
products.doc('100').update({brand:'bobbie brown', inStock:30})

