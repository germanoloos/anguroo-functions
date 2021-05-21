import functions = require("firebase-functions");
import admin = require("firebase-admin");
import {Request, Response} from "firebase-functions";
import {firestore} from "firebase-admin";
import express = require("express");
import {startBuild} from "./services/github-actions.service";
import {AngurooProject} from "./model/project.model";


admin.initializeApp();
const db = admin.firestore();
const app = express();

// Add middleware to authenticate requests
// app.use(myMiddleware);

app.post("/", async (req: Request, res: Response) => res.send(await create(req.body)));
app.get("/:id", async (req: Request, res: Response) => res.send(await getById(req.params.id)));
app.put("/:id/log", async (req: Request, res: Response) => {
  await update(req.params.id, req.body);
  res.sendStatus(200);
});

const create = async (projectBody: AngurooProject) => {
  functions.logger.log("Registring app creation with name", projectBody.name);
  const project = {
    logs: [`Starting creation of ${projectBody.name}...`],
    finished: false,
    url: null,
  } as any;
  Object.assign(project, projectBody);
  const writeResult = await admin.firestore().collection("projects").add(project);
  project["id"] = writeResult.id;
  await startBuild(project);
  return {id: writeResult.id};
};

const update = async (id: string, body: { logger: string }) => {
  const logger = body.logger;
  if (logger && logger.length > 0) {
    await db.collection("projects").doc(id).update({
      logs: firestore.FieldValue.arrayUnion(logger),
    });
  }
};

const getById = async (id: string) => {
  const app = await db.collection("projects").doc(id).get();
  return {data: app.data()};
};

exports.anguroo = functions.https.onRequest(app);
