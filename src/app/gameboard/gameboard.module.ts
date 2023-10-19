import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BoardComponent } from './board/board.component';
import { MaingameComponent } from './maingame/maingame.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [BoardComponent, MaingameComponent, SidebarComponent],
  imports: [CommonModule, MatButtonModule],
  exports: [BoardComponent],
})
export class GameboardModule {}
