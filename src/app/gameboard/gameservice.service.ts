import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GameserviceService {

  static gamestate = "whiteMove";



  constructor() { }
}


export enum Color {
  black,
  white
}

 export enum PiecesTypes{
  king,
  queen,
  bishop,
  knight,
  rook,
  pawn,
  none
}

export class piece{
  public color: Color =Color.white;
  public type: PiecesTypes = PiecesTypes.none;

  constructor(color: Color,
    type: PiecesTypes,){
      this.color=color;
      this.type=type;
    }
  
}

