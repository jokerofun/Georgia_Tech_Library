import { RootStore } from ".";

export abstract class IStore {
  protected _rootStore?: RootStore;

  protected get root() {
    if (!this._rootStore) {
      throw new Error(
        "Tried to access root store before store has been initialized.",
      );
    }
    return this._rootStore;
  }
  public initialize(rootStore: RootStore) {
    this._rootStore = rootStore;
  }
}
