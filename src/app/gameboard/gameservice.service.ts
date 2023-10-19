import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GameserviceService {
  public static whiteMove = true;
  public static moveHistory: any = [];

  constructor() {}
}

export enum PiecesTypes {
  king,
  queen,
  bishop,
  knight,
  rook,
  pawn,
  none,
}

export class piece {
  public iswhite: boolean = true;
  public type: PiecesTypes = PiecesTypes.none;

  constructor(iswhite: boolean, type: PiecesTypes) {
    this.iswhite = iswhite;
    this.type = type;
  }
}
