import { Component, OnInit } from '@angular/core';
import { ApiService } from '../service/api.service';

@Component({
  selector: 'app-coin-list',
  templateUrl: './coin-list.component.html',
  styleUrls: ['./coin-list.component.css']
})
export class CoinListComponent implements OnInit {

  constructor(private api :ApiService) { }

  ngOnInit(): void {
    this.getAllData();
    this.getBannerData(); 
  }
  getBannerData() {
    this.api.getTrendingCurrency('usd').subscribe(data => {
      console.log(data);
    }
    )
  }
getAllData() {
  this.api.getCurrency('usd').subscribe(data => {
    console.log(data);
  }
  )
}
}


