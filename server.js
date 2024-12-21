import express from "express";
import axios from "axios";
import admin from "firebase-admin";
import "./firebaseconfig.js";
import { fileURLToPath } from "url";
import { dirname } from "path";
import { getUsers, postNotication } from "./controllers/user.js";
import dotenv from "dotenv";
dotenv.config();

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

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// import serviceAccount from "./ee2-server/exchanges-b4fe1-firebase-adminsdk-mfrdv-4e24bcc3f3.json" assert { type: "json" };
console.log(12, process.env.API_KEY);
admin.initializeApp({
  credential: admin.credential.cert({
    type: "service_account",
    project_id: "exchanges-b4fe1",
    private_key_id: process.env.PRIVATE_KEY_ID,
    private_key: process.env.PRIVATE_KEY,

    client_email:
      "firebase-adminsdk-mfrdv@exchanges-b4fe1.iam.gserviceaccount.com",
    client_id: "115384883805817604934",
    auth_uri: "https://accounts.google.com/o/oauth2/auth",
    token_uri: "https://oauth2.googleapis.com/token",
    auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
    client_x509_cert_url:
      "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-mfrdv%40exchanges-b4fe1.iam.gserviceaccount.com",
    universe_domain: "googleapis.com",
  }),
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
