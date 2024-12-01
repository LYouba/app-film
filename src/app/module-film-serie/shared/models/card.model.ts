export class Card {
  constructor(
    public id: number,
    public title: string,
    public anneeProduction: number,
    public imgSrc: string,
  ) {}
}

export interface CardInterface{
  toCard() : Card;
}
