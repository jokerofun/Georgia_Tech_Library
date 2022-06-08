import { CardApi } from "./../api/apis/CardApi";
import { Card } from "./../api/models/index";
import { IStore } from "./IStore";
import { action, makeObservable, observable, ObservableMap, set } from "mobx";
import { API_CONFIG } from "../config";

export class CardStore extends IStore {
  private _cards: ObservableMap<string, Card> = observable.map();
  private _api = new CardApi(API_CONFIG);
  constructor() {
    super();
    makeObservable<CardStore, "_cards" | "setCards">(this, {
      _cards: observable,
      setCards: action,
    });
  }

  public async fetch() {
    const cards = await this._api.apiCardGetListGet();
    this.setCards(cards);
  }

  public get cards(): Card[] {
    return Array.from(this._cards.values());
  }

  private setCards(cards: Card[]): void {
    this._cards.replace(observable.map(cards.map((c) => [c.cardNumber, c])));
  }

  public setSingleCard(card: Card): void {
    set(this._cards, card.cardNumber, card);
  }
}
