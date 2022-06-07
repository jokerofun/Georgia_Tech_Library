import { IStore } from "./IStore";
import { action, makeObservable, observable, ObservableMap } from "mobx";
import { API_CONFIG } from "../config";
import { Catalog } from "./../api/models/index";
import { CatalogApi } from "../api";

export class CatalogStore extends IStore {
  private _catalog: ObservableMap<string, Catalog> = observable.map();
  private _api = new CatalogApi(API_CONFIG);
  constructor() {
    super();
    makeObservable<CatalogStore, "_catalog" | "setCatalog">(this, {
      _catalog: observable,
      setCatalog: action,
    });
  }

  public async fetch() {
    const catalog = await this._api.apiCatalogGetListGet();
    this.setCatalog(catalog);
  }

  public get catalog(): Catalog[] {
    return Array.from(this._catalog.values());
  }

  private setCatalog(catalog: Catalog[]): void {
    this._catalog.replace(
      observable.map(catalog.map((c) => [c.libraryName, c])),
    );
  }

  //   public setSingleHealthFacility(healthFacility: HealthFacility): void {
  //     set(this._cards, healthFacility.healthFacilityGuid, healthFacility);
  //   }
}
