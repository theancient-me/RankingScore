import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, interval, Subscription } from 'rxjs';



@Component({
  selector: 'app-manages',
  templateUrl: './manages.component.html',
  styleUrls: ['./manages.component.css']
})
export class ManagesComponent implements OnInit {

  private listWIP:any;
  private updateSubscription: Subscription;

  constructor(
    private http : HttpClient
  ) { }

  ngOnInit() {
    this.updateSubscription = interval(5000).subscribe(
      (val) => { this.updateStats()
    }
);
  }

ngOnDestroy() {
  this.updateSubscription.unsubscribe();
}
  

private updateStats() {
  this.http.get("http://localhost:3001/getListWIP").subscribe(val =>{
    this.listWIP = val;
  })
}
}
