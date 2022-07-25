import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../service/api.service';

@Component({
  selector: 'app-coin-detail',
  templateUrl: './coin-detail.component.html',
  styleUrls: ['./coin-detail.component.css']
})
export class CoinDetailComponent implements OnInit {
  coinData:any;
  coinId!: string;
  days:number=1;
  currency:string='usd';
  constructor(private api :ApiService, private activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {
  }
  getCoinData(){}

}
