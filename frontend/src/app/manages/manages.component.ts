import { Component, OnInit } from '@angular/core';
import { HttpClient,HttpParams,HttpHeaders } from '@angular/common/http';
// import { Observable, interval, Subscription } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-manages',
  templateUrl: './manages.component.html',
  styleUrls: ['./manages.component.css']
})
export class ManagesComponent implements OnInit {

  private listWIP:any;
  // private updateSubscription: Subscription;

  constructor(
    private http : HttpClient,
    private cookie : CookieService,
    private router: Router
  ) { }

  ngOnInit() {

    console.log();
    if(this.cookie.get("token").length == 0){
      this.router.navigate(['admin-wip']);
    } else {

    }
    
    // this.updateSubscription = interval(5000).subscribe(
    //   (val) => { this.updateStats()
    // }
// );
this.updateStats();
  }

addnewScore(idwip:string,newscore: string,oldscore:string){
  console.log(newscore);
  console.log(oldscore);

  let score;
  score = parseInt(newscore)+parseInt(oldscore)+"";

  if(oldscore == "NaN"){
   score = newscore;
  }
 
  const headers = new HttpHeaders()
            .set("token", this.cookie.get('token'));
  const payload = new HttpParams().set('wip_id', idwip).set('wip_score',score);
  this.http.post("http://localhost:3001/addScore", payload,{headers}).subscribe(
    (val) => {
      // 
    },
    response => {
      alert('Add success');
      this.updateStats();
    },
    () => {
      console.log("The POST observable is now completed.");
    });
}

removeScore(idwip:string,newscore: string,oldscore:string){
  let score = parseInt(oldscore)-parseInt(newscore)+"";
  const headers = new HttpHeaders()
            .set("token", this.cookie.get('token'));
  const payload = new HttpParams().set('wip_id', idwip).set('wip_score',score);
  this.http.post("http://localhost:3001/addScore", payload,{headers}).subscribe(
    (val) => {
      // 
    },
    response => {
      alert('Add success');
      this.updateStats();
    },
    () => {
      console.log("The POST observable is now completed.");
    });
}

addWIP(wipid:string,wipname:string,wiplogo:string,wip_score:string){

  const headers = new HttpHeaders()
  .set("token", this.cookie.get('token'));

  const payload = new HttpParams()
  .set('wip_id', wipid)
  .set('wip_name',wipname)
  .set('wip_icon',wiplogo)
  .set('wip_score',wip_score)

  this.http.post("http://localhost:3001/addWIP", payload,{headers}).subscribe(
    (val) => {
      // 
    },
    response => {
      alert('Add WIP SUCCESS');
      this.updateStats();
    },
    () => {
      console.log("The POST observable is now completed.");
    });
  

}

private updateStats() {
  this.http.get("http://localhost:3001/getListWIP").subscribe(val =>{
    this.listWIP = val;
  })
}

logout(){
  this.cookie.delete('token');
  this.router.navigate(['admin-wip']);
}
}
