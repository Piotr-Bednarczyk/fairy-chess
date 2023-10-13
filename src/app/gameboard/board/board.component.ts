import { Component, OnInit } from '@angular/core';
import { piece,PiecesTypes, GameserviceService } from '../gameservice.service';


@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
})

export class BoardComponent implements OnInit {

  rows: number[] = [1, 2, 3, 4, 5, 6, 7, 8];
  columns: string[] = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
  gamestate: piece[][]=[];
  selected: number[] = [-1,-1]; //currently selected piece
  available:any[] = []; // tiles piece can move into



  standard = {
    white:[
    'assets/chesspieces/Chess_klt45.svg', // king
    'assets/chesspieces/Chess_qlt45.svg', // queen
    'assets/chesspieces/Chess_blt45.svg', // bishop
    'assets/chesspieces/Chess_nlt45.svg', // knight
    'assets/chesspieces/Chess_rlt45.svg', // rook
    'assets/chesspieces/Chess_plt45.svg'], // pawn
    black:[
      'assets/chesspieces/Chess_kdt45.svg', // king
      'assets/chesspieces/Chess_qdt45.svg', // queen
      'assets/chesspieces/Chess_bdt45.svg', // bishop
      'assets/chesspieces/Chess_ndt45.svg', // knight
      'assets/chesspieces/Chess_rdt45.svg', // rook
      'assets/chesspieces/Chess_pdt45.svg'] // pawn
  };


  constructor(
  ) {
    for (let i = 0; i < this.rows.length; i++) {
      this.gamestate[i] = new Array(this.columns.length);
    }
    // clear gamestate
    for (let i=0;i<8;i++)
      for (let j=0;j<8;j++){
        this.gamestate[i][j]= new piece(true,PiecesTypes.none)
    }    
   }

  ngOnInit(): void {
    this.defaultSetup();
    console.log(this.gamestate);
  }

  defaultSetup(){
    //place pawns
    for (let i=0;i<8;i++){
      this.gamestate[1][i]=new piece(false,PiecesTypes.pawn);
    }
    for (let i=0;i<8;i++){
      this.gamestate[6][i]=new piece(true,PiecesTypes.pawn);
    }

    //place white pieces
    this.gamestate[7][0]=new piece(true,PiecesTypes.rook);
    this.gamestate[7][1]=new piece(true,PiecesTypes.knight);
    this.gamestate[7][2]=new piece(true,PiecesTypes.bishop);
    this.gamestate[7][3]=new piece(true,PiecesTypes.queen);
    this.gamestate[7][4]=new piece(true,PiecesTypes.king);    
    this.gamestate[7][5]=new piece(true,PiecesTypes.bishop);
    this.gamestate[7][6]=new piece(true,PiecesTypes.knight);
    this.gamestate[7][7]=new piece(true,PiecesTypes.rook);

    //place dark pieces
    this.gamestate[0][0]=new piece(false,PiecesTypes.rook);
    this.gamestate[0][1]=new piece(false,PiecesTypes.knight);
    this.gamestate[0][2]=new piece(false,PiecesTypes.bishop);
    this.gamestate[0][3]=new piece(false,PiecesTypes.queen);
    this.gamestate[0][4]=new piece(false,PiecesTypes.king);    
    this.gamestate[0][5]=new piece(false,PiecesTypes.bishop);
    this.gamestate[0][6]=new piece(false,PiecesTypes.knight);
    this.gamestate[0][7]=new piece(false,PiecesTypes.rook);
  }

  selectTile(i:number,j:number){
    if (this.selected[0]==-1)
    {
      if (this.gamestate[i][j].type!=PiecesTypes.none && this.gamestate[i][j].iswhite==GameserviceService.whiteMove) {
        this.selected[0]=i;
        this.selected[1]=j;
        this.highlightAvailable(i,j);
      }
    }
    else if(this.contains(this.available,[i,j])){ 
      let tech = this.gamestate[this.selected[0]][this.selected[1]]
      this.gamestate[i][j] = tech;
      this.gamestate[this.selected[0]][this.selected[1]]=new piece(true,PiecesTypes.none)
      
      GameserviceService.whiteMove=!GameserviceService.whiteMove;
      this.selected[0]=-1;
      this.selected[1]=-1;
      this.available=[];
    }
    else {
      this.selected[0]=-1;
      this.selected[1]=-1;
      this.available=[];
    }
  }
  
  highlightTile(i:number,j:number){
    if (this.gamestate[i][j].iswhite!=GameserviceService.whiteMove || this.gamestate[i][j].type==PiecesTypes.none)
    this.available.push([i,j])
  }

  highlightAvailable(i:number,j:number){
    if(this.gamestate[i][j].type==PiecesTypes.pawn){
      if(this.gamestate[i][j].iswhite){  //White Pawns
        if(this.gamestate[i-1][j].type==PiecesTypes.none) //if nothing obstructs forward movement of pawn
        {
            this.highlightTile(i-1,j);
          if (i==6) //if pawn hasn't moved yet
          {
            this.highlightTile(i-2,j);
            // en passant o mein got
          }
        }
        //check captures
        if(this.gamestate[i-1][j+1])
          if(this.gamestate[i-1][j+1].type!=PiecesTypes.none)
            this.highlightTile(i-1,j+1);
        if(this.gamestate[i-1][j-1])
          if(this.gamestate[i-1][j-1].type!=PiecesTypes.none)
            this.highlightTile(i-1,j-1);   
      }    

      if(!this.gamestate[i][j].iswhite){  //Black Pawns
        if(this.gamestate[i+1][j].type==PiecesTypes.none) //if nothing obstructs forward movement of pawn
        {
            this.highlightTile(i+1,j);
          if (i==1) //if pawn hasn't moved yet
          {
            this.highlightTile(i+2,j);
            // en passant o mein got
          }
        }
        //check captures
        if(this.gamestate[i+1][j+1])
          if(this.gamestate[i+1][j+1].type!=PiecesTypes.none)
            this.highlightTile(i+1,j+1);
        if(this.gamestate[i+1][j-1])
          if(this.gamestate[i+1][j-1].type!=PiecesTypes.none)
            this.highlightTile(i+1,j-1);   
      }

    }
    

    if(this.gamestate[i][j].type==PiecesTypes.bishop){
      // Why it doesn't work? it works 10 lines higher
      // if(this.gamestate[i+1][j+1])  
      // this.diagonalMovement(i+1,j+1,"++")
      // if(this.gamestate[i-1][j+1]) 
      // this.diagonalMovement(i-1,j+1,"-+")
      // if(this.gamestate[i+1][j-1]) 
      // this.diagonalMovement(i+1,j-1,"+-")
      // if(this.gamestate[i-1][j-1]) 
      // this.diagonalMovement(i-1,j-1,"--")

      if(i!=7 && j!=7)  
      this.diagonalMovement(i+1,j+1,"++")
      if(i!=0 && j!=7) 
      this.diagonalMovement(i-1,j+1,"-+")
      if(i!=7 && j!=0)  
      this.diagonalMovement(i+1,j-1,"+-")
      if(i!=0 && j!=0) 
      this.diagonalMovement(i-1,j-1,"--")

      }

    if(this.gamestate[i][j].type==PiecesTypes.rook){
      if(i!=7)
        this.straightLineMovement(i+1,j,"i+")
      if(i!=0)
        this.straightLineMovement(i-1,j,"i-")
      if(j!=7)
       this.straightLineMovement(i,j+1,"j+")
      if(j!=0)
       this.straightLineMovement(i,j-1,"j-")
      }

    if(this.gamestate[i][j].type==PiecesTypes.queen){
      if(i!=7)
        this.straightLineMovement(i+1,j,"i+")
      if(i!=0)
        this.straightLineMovement(i-1,j,"i-")
      if(j!=7)
        this.straightLineMovement(i,j+1,"j+")
      if(j!=0)
        this.straightLineMovement(i,j-1,"j-")
      if(i!=7 && j!=7)  
        this.diagonalMovement(i+1,j+1,"++")
      if(i!=0 && j!=7) 
        this.diagonalMovement(i-1,j+1,"-+")
      if(i!=7 && j!=0)  
        this.diagonalMovement(i+1,j-1,"+-")
      if(i!=0 && j!=0) 
        this.diagonalMovement(i-1,j-1,"--")
      }

    if(this.gamestate[i][j].type==PiecesTypes.knight){
      if (i<6) {
        if (j!=7) this.highlightTile(i+2,j+1);
        if (j!=0) this.highlightTile(i+2,j-1);
      }
      if (i>1) {
        if (j!=7) this.highlightTile(i-2,j+1);
        if (j!=0) this.highlightTile(i-2,j-1);
      }
      if (j<6) {
        if (i!=7) this.highlightTile(i+1,j+2);
        if (i!=0) this.highlightTile(i-1,j+2);
      }
      if (j>1) {
        if (i!=7) this.highlightTile(i+1,j-2);
        if (i!=0) this.highlightTile(i-1,j-2);
      }
      }

      if(this.gamestate[i][j].type==PiecesTypes.king){
        if(i!=7){
          this.highlightTile(i+1,j);
          if(j!=7) this.highlightTile(i+1,j+1);
          if(j!=0) this.highlightTile(i+1,j-1);
        }
        if(i!=0){
          this.highlightTile(i-1,j);
          if(j!=7) this.highlightTile(i-1,j+1);
          if(j!=0) this.highlightTile(i-1,j-1);
        }
        if(j!=7)  this.highlightTile(i,j+1);
        if(j!=0)  this.highlightTile(i,j-1);
      }
  
  }

  straightLineMovement(i:number,j:number,direction:string){
    this.highlightTile(i,j);
    if(this.gamestate[i][j].type!=PiecesTypes.none) {    
      return
    }
    if(direction=="i+") {
      if(i!=7)
        this.straightLineMovement(i+1,j,"i+")
    }
    if(direction=="i-") {
      if(i!=0)
        this.straightLineMovement(i-1,j,"i-")
    }
    if(direction=="j+") {
      if(j!=7)
        this.straightLineMovement(i,j+1,"j+")
    }
    if(direction=="j-") {
      if(j!=0)
        this.straightLineMovement(i,j-1,"j-")
    }
  }

  diagonalMovement(i:number,j:number,direction:string){
    this.highlightTile(i,j);
    if(this.gamestate[i][j].type!=PiecesTypes.none) {    
      return
    }
    if(direction=="++") {
      if(i!=7 && j!=7)
        this.diagonalMovement(i+1,j+1,"++")
    }
    else if(direction=="+-") {
      if(i!=7 && j!=0) 
        this.diagonalMovement(i+1,j-1,"+-")
    }
    else if(direction=="-+") {
      if(i!=0 && j!=7)
        this.diagonalMovement(i-1,j+1,"-+")
    }
    else if(direction=="--") {
      if(i!=0 && j!=0) 
        this.diagonalMovement(i-1,j-1,"--")
    }
  }

  //includes doesn't work :(
   contains(arr: any[][], target: any[]): boolean { 
    for (const row of arr) {
      if (this.arraysAreEqual(row, target)) {
        return true; 
      }
    }
    return false;
  }
  
   arraysAreEqual(arr1: any[], arr2: any[]): boolean {
    if (arr1.length !== arr2.length) {
      return false;
    }
  
    for (let i = 0; i < arr1.length; i++) {
      if (arr1[i] !== arr2[i]) {
        return false;
      }
    }
  
    return true;
  }
  

}
