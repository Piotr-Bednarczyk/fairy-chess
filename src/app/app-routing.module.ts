import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BoardComponent } from './gameboard/board/board.component';
import { MaingameComponent } from './gameboard/maingame/maingame.component';

const routes: Routes = [
  { path: '', component:MaingameComponent, pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
