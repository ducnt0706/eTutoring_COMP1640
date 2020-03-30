// Config for Firebase SDK
const admin = require("firebase-admin");
const serviceAccount = require("../permissions.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://comp-1640-project.firebaseio.com"
});

// Call Firebase SDK to use
const db=admin.firestore();
const auth=admin.auth();

// Routes Api
const express= require('express');
const router=express.Router();

// Login by google api
router.get('/senddata',(req,res)=>{
    return res.status(200).send({data:"hello"});
});

// Export router
module.exports= router;