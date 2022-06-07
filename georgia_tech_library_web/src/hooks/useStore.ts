import { useContext } from "react";
import { AppContext } from "../config";
import { Stores } from "../stores";

export function useStore<K extends keyof Stores>(name: K): Stores[K] {
  const appCtx = useContext(AppContext);
  return appCtx.stores[name];
}
