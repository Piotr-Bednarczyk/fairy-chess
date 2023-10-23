import { Component, OnInit } from '@angular/core';
import { GameserviceService, PiecesTypes } from '../gameservice.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  movelist: any;

  constructor(private gameService: GameserviceService) {}

  ngOnInit(): void {
    this.parseMovelist();
  }

  //Piecetype can be worked into this making it into a proper chessnotation. However I don't think that proper chessnotation will work out in grander scope.
  parseMovelist() {
    this.movelist = [];
    for (let item of this.gameService.moveHistory) {
      this.movelist.push(
        String.fromCharCode(item[0][1] + 65) +
          (8 - item[0][0]).toString() +
          '-->' +
          String.fromCharCode(item[1][1] + 65) +
          (8 - item[1][0]).toString()
      );
    }
  }
}
