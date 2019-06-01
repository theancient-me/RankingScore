import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ScoreComponent } from './score/score.component';
import { LoginComponent } from './login/login.component';
import { ManagesComponent } from './manages/manages.component';


@NgModule({
  declarations: [
    AppComponent,
    ScoreComponent,
    LoginComponent,
    ManagesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
