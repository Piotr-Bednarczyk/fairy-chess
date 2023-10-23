import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GameserviceService {
  public whiteMove = true;
  public moveHistory: any = [];
  public gamestate: piece[][] = [];

  constructor() {
    for (let i = 0; i < 8; i++) {
      this.gamestate[i] = new Array(8);
    }
    // clear gamestate
    for (let i = 0; i < 8; i++)
      for (let j = 0; j < 8; j++) {
        this.gamestate[i][j] = new piece(true, PiecesTypes.none);
      }
  }

  public defaultSetup(): any {
    //place pawns
    for (let i = 0; i < 8; i++) {
      this.gamestate[1][i] = new piece(false, PiecesTypes.pawn);
    }
    for (let i = 0; i < 8; i++) {
      this.gamestate[6][i] = new piece(true, PiecesTypes.pawn);
    }

    //place white pieces
    this.gamestate[7][0] = new piece(true, PiecesTypes.rook);
    this.gamestate[7][1] = new piece(true, PiecesTypes.knight);
    this.gamestate[7][2] = new piece(true, PiecesTypes.bishop);
    this.gamestate[7][3] = new piece(true, PiecesTypes.queen);
    this.gamestate[7][4] = new piece(true, PiecesTypes.king);
    this.gamestate[7][5] = new piece(true, PiecesTypes.bishop);
    this.gamestate[7][6] = new piece(true, PiecesTypes.knight);
    this.gamestate[7][7] = new piece(true, PiecesTypes.rook);

    //place dark pieces
    this.gamestate[0][0] = new piece(false, PiecesTypes.rook);
    this.gamestate[0][1] = new piece(false, PiecesTypes.knight);
    this.gamestate[0][2] = new piece(false, PiecesTypes.bishop);
    this.gamestate[0][3] = new piece(false, PiecesTypes.queen);
    this.gamestate[0][4] = new piece(false, PiecesTypes.king);
    this.gamestate[0][5] = new piece(false, PiecesTypes.bishop);
    this.gamestate[0][6] = new piece(false, PiecesTypes.knight);
    this.gamestate[0][7] = new piece(false, PiecesTypes.rook);
  }
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
