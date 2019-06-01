import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders,HttpParams } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import {Router} from "@angular/router"

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public responseServer:any;


  constructor(
    private http: HttpClient,
    private cookie : CookieService,
    private router: Router
  ) { }

  ngOnInit() {
    if(this.cookie.get("token").length != 0){
      this.router.navigate(['admin-wip/manage']);
    }
  }

  onLogin(username: string, password: string) {

    // const httpOptions = {
    //   headers: new HttpHeaders({
    //     'Content-Type':  'application/x-www-form-urlencoded'
    //   })};


    const payload = new HttpParams().set('username', username).set('password', password);

    this.http.post("http://103.86.50.83:3001/wipLogin", payload).subscribe(
      (val) => {

      this.responseServer = val;

      if(this.responseServer.isPasswordMatch){
        this.cookie.set("token",this.responseServer.token);
        this.router.navigate(['admin-wip/manage']);
      }else{
        console.log('error');
      }

       

      },
      response => {
        console.log("POST call in error", response);
      },
      () => {
        console.log("The POST observable is now completed.");
      });




  }

}
