import { configure } from "mobx";
import React from "react";
import { Configuration } from "./api";
import { RootStore } from "./stores";

export const API_CONFIG = new Configuration({
  basePath: "https://localhost:7066",
});

function configureMobx() {
  if (process.env.NODE_ENV === "development") {
    configure({
      enforceActions: "observed",
      computedRequiresReaction: true,
      reactionRequiresObservable: true,
      observableRequiresReaction: false,
      disableErrorBoundaries: true,
    });
  }
}

configureMobx();

export const AppContext = React.createContext(new RootStore());
