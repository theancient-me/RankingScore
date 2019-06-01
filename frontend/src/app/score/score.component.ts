import { Component, OnInit } from '@angular/core';
import { Observable, interval, Subscription } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-score',
  templateUrl: './score.component.html',
  styleUrls: ['./score.component.css']
})
export class ScoreComponent implements OnInit {

  private updateSubscription: Subscription;
  private listWIP: any = [];
  constructor(
    private http: HttpClient
  ) {
  }


  ngOnInit() {
    this.updateSubscription = interval(3000).subscribe(
      (val) => {
        this.updateStats();
      }
    );


  }

  ngOnDestroy() {
    this.updateSubscription.unsubscribe();
  }

  private updateStats() {
    this.http.get("http://localhost:3001/getListWIP").subscribe(val => {
      this.listWIP = val;
    })

    // console.log(this.listWIP);

  }

  private swapData(){

    var myData = ["1", "2", "3", "5", "4", "6", "7"];

    // for (let i = 0; i < myData.length - 1; i++)
    //   for (let j = 0; j < myData.length - i - 1; j++)
    //     if (myData[j] < myData[j + 1]) {
    //       // swap arr[j+1] and arr[i] 
    //       let temp = myData[j];
    //       myData[j] = myData[j + 1];
    //       myData[j + 1] = temp;
    //     }
   
  }


}
