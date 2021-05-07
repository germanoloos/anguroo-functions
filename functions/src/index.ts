import functions = require("firebase-functions");
import admin = require("firebase-admin");
import {Request, Response} from "firebase-functions";
import {firestore} from "firebase-admin";

admin.initializeApp();
const db = admin.firestore();

exports.anguroozify = functions.https.onRequest(async (req: Request, res: Response) => {
  const {appName} = req.body;
  functions.logger.log("Registring app creation with name", appName);
  const writeResult = await admin.firestore().collection("projects").add({appName, logs: [`Starting creation of ${appName}...`]});
  res.json({id: writeResult.id});
});

exports.appendLog = functions.https.onRequest(async (req: Request, res: Response) => {
  const {id, logger} = req.body;
  if (logger && logger.length > 0) {
    await db.collection("projects").doc(id).update({
      logs: firestore.FieldValue.arrayUnion(logger),
    });
  }
  res.sendStatus(200);
});

exports.project = functions.https.onRequest(async (req: Request, res: Response) => {
  const {id} = req.query;
  const app = await db.collection("projects").doc(id as string).get();
  res.json(app.data());
});
