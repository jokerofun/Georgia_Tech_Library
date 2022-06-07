import { useRef } from "react";
import { BaseAPI, Configuration } from "../api";
import { API_CONFIG } from "../config";

export function useAPI<T extends BaseAPI>(api: new (cfg: Configuration) => T) {
  return useRef(new api(API_CONFIG)).current;
}

export function APIhelper<T extends BaseAPI>(
  api: new (cfg: Configuration) => T,
) {
  return new api(API_CONFIG);
}
