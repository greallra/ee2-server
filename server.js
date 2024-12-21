import express from "express";
import axios from "axios";
import admin from "firebase-admin";
import "./firebaseconfig.js";
import { getUsers, postNotication } from "./controllers/user.js";

const app = express();
const port = 3000;
// For parsing application/json
app.use(express.json());

// For parsing application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Welcome to my server!");
});

app.get("/users", getUsers);
app.post("/notification", postNotication);

import "./utils/crons.js";

import serviceAccount from "/Users/ronangreally/Downloads/exchanges-b4fe1-firebase-adminsdk-mfrdv-4e24bcc3f3.json" assert { type: "json" };

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
