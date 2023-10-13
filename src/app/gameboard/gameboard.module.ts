import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BoardComponent } from './board/board.component';
import {DragDropModule} from '@angular/cdk/drag-drop';
import { MaingameComponent } from './maingame/maingame.component';
import { SidebarComponent } from './sidebar/sidebar.component';



@NgModule({
  declarations: [
    BoardComponent,
    MaingameComponent,
    SidebarComponent
  ],
  imports: [
    CommonModule,
    DragDropModule
  ],
  exports:[
    BoardComponent
  ]

})
export class GameboardModule { }
