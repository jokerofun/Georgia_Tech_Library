import { makeAutoObservable } from "mobx";
import { BorrowingActivityStore } from "./BorrowingActivityStore";
import { CardStore } from "./CardStore";
import { CatalogStore } from "./CatalogStore";
import { ItemStore } from "./ItemStore";

export interface Stores {
  cardStore: CardStore;
  catalogStore: CatalogStore;
  itemStore: ItemStore;
  borrowingActivityStore: BorrowingActivityStore;
}

export class RootStore {
  stores: Stores;
  constructor() {
    makeAutoObservable(this);
    this.stores = {
      cardStore: new CardStore(),
      catalogStore: new CatalogStore(),
      itemStore: new ItemStore(),
      borrowingActivityStore: new BorrowingActivityStore(),
      //   dashboardStore: new DashboardStore(this),
    };
  }
}
