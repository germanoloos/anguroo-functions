import axios, {AxiosResponse} from "axios";
import {AngurooProject} from "../model/project.model";
import functions = require("firebase-functions");

const api = axios.create({
  baseURL: "https://api.github.com/repos/germanoloos/anguroo-actions",
});

api.interceptors.request.use(async (config) => {
  config.headers.Authorization = `Bearer ${functions.config().github_token.key}`;
  return config;
});

export const startBuild = (payload: AngurooProject): Promise<AxiosResponse<unknown>> => {
  const base64 = new Buffer(JSON.stringify(payload)).toString("base64");
  console.log(payload);
  return api.post("/dispatches", {
    event_type: "start_build",
    client_payload: {payload, base64},
  });
};

export default api;
