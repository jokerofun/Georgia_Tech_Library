import { BorrowingActivity } from "./../api/models/index";
import { IStore } from "./IStore";
import { action, makeObservable, observable, ObservableMap } from "mobx";
import { API_CONFIG } from "../config";
import { BorrowingActivityApi } from "../api";

export class BorrowingActivityStore extends IStore {
  private _bas: ObservableMap<number, BorrowingActivity> = observable.map();
  private _api = new BorrowingActivityApi(API_CONFIG);
  constructor() {
    super();
    makeObservable<BorrowingActivityStore, "_bas" | "setBas">(this, {
      _bas: observable,
      setBas: action,
    });
  }

  public async fetchAll() {
    const bas = await this._api.apiBorrowingActivityGetListGet();
    this.setBas(bas);
  }
  public async fetchBatch(batchNumber: number) {
    const bas = await this._api.apiBorrowingActivityGetListBatchNumberGet({
      batchNumber,
    });
    this.setBas(bas);
  }

  public get bas(): BorrowingActivity[] {
    return Array.from(this._bas.values());
  }

  private setBas(bas: BorrowingActivity[]): void {
    this._bas.replace(observable.map(bas.map((b) => [b.id as number, b])));
  }

  //   public setSingleHealthFacility(healthFacility: HealthFacility): void {
  //     set(this._cards, healthFacility.healthFacilityGuid, healthFacility);
  //   }
}
