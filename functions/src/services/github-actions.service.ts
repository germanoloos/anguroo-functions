import axios, {AxiosResponse} from "axios";
import {AngurooProject} from "../model/project.model";

const api = axios.create({
  baseURL: "https://api.github.com/repos/germanoloos/anguroo-actions",
});

api.interceptors.request.use(async (config) => {
  const token = "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";
  config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export const startBuild = (payload: AngurooProject): Promise<AxiosResponse<unknown>> => {
  const base64 = new Buffer(JSON.stringify(payload)).toString("base64");
  return api.post("/dispatches", {
    event_type: "start_build",
    client_payload: {payload, base64},
  });
};

export default api;
