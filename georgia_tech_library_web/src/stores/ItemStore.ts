import { IStore } from "./IStore";
import { action, makeObservable, observable, ObservableMap } from "mobx";
import { API_CONFIG } from "../config";
import { ItemApi, ItemDto } from "../api";

export class ItemStore extends IStore {
  private _items: ObservableMap<string, ItemDto> = observable.map();
  private _api = new ItemApi(API_CONFIG);
  constructor() {
    super();
    makeObservable<ItemStore, "_items" | "setItems">(this, {
      _items: observable,
      setItems: action,
    });
  }

  public async fetchAll() {
    const items = await this._api.apiItemGetListGet();
    this.setItems(items);
  }

  public async fetchBatch(batchNumber: number) {
    const items = await this._api.apiItemGetListBatchNumberGet({ batchNumber });
    this.setItems(items);
  }

  public get items(): ItemDto[] {
    return Array.from(this._items.values());
  }

  private setItems(items: ItemDto[]): void {
    this._items.replace(observable.map(items.map((i) => [i.isbn, i])));
  }

  //   public setSingleHealthFacility(healthFacility: HealthFacility): void {
  //     set(this._cards, healthFacility.healthFacilityGuid, healthFacility);
  //   }
}
