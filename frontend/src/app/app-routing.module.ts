import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ScoreComponent } from './score/score.component';
import { LoginComponent } from './login/login.component';
import { ManagesComponent } from './manages/manages.component';

const routes: Routes = [
{ path : '',component : ScoreComponent},
{ path : 'admin-wip',component : LoginComponent},
{ path : 'admin-wip/manage',component : ManagesComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
