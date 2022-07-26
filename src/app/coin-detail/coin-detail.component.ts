import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../service/api.service';
import { ChartConfiguration, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { CurrencyService } from '../service/currency.service';

@Component({
  selector: 'app-coin-detail',
  templateUrl: './coin-detail.component.html',
  styleUrls: ['./coin-detail.component.css']
})
export class CoinDetailComponent implements OnInit {
  coinData:any;
  coinId!: string;
  days:number=5;
  currency:string='usd';
  public lineChartData:ChartConfiguration['data'] = {
    datasets:[
      {
        data:[],
        label:'Price Trends',
        borderColor:'#3cba9f',
        backgroundColor:'blue',
        pointBackgroundColor:'#3cba9f',
        pointBorderColor:'#3cba9f',
        pointHoverBackgroundColor:'#3cba9f',
        pointHoverBorderColor:'#3cba9f',
      }],
    labels:[]};
  public lineChartOptions:ChartConfiguration['options'] = {
    elements: {
      point: {
        radius: 1
      }
    },
    plugins: {
      legend: {display: true},
    }

  };
  public lineChartType:ChartType = 'line';
  @ViewChild(BaseChartDirective, { static: true })
  myLineChart!: BaseChartDirective;
  constructor(private api :ApiService, private activatedRoute:ActivatedRoute, private currencyService : CurrencyService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(val=>{
      this.coinId=val['id'];
  })
  this.getCoinData();
  this.getGraphData(this.days);
  this.currencyService.getCurrency().subscribe(val => {
    this.currency=val;
    this.getGraphData(this.days);
    this.getCoinData();
  })
  }
  getCoinData(){
    this.api.getCurrencyById(this.coinId ).subscribe(data => {
      console.log(this.coinData);
      this.coinData = data;
      if(this.currency === 'GBP'){
        data.market_data.current_price.usd = data.market_data.current_price.gbp;
       data.market_data.market_cap.usd = data.market_data.market_cap.gbp;
      }
      data.market_data.current_price.usd = data.market_data.current_price.usd;
      data.market_data.market_cap.usd = data.market_data.market_cap.usd;
      
    }
    )
  }
  getGraphData(days:number){
    this.days=days;
    this.api.getGraphicalCurrencyData(this.coinId,this.currency,this.days)
    .subscribe(data => {
      setTimeout(() => {
        this.myLineChart.chart?.update();
      },200)
      this.lineChartData.datasets[0].data=data.prices.map((a:any)=>{return a[1]});
      this.lineChartData.labels=data.prices.map((a:any)=>{
      let date = new Date(a[0]);
      let time= date.getHours()>12?
    `${date.getHours()-12}:${date.getMinutes()}`:
  `${date.getHours()}:${date.getMinutes()} Am`
return this.days === 1? time:date.toLocaleDateString();
});
      
      console.log(data);
   
    }
    )
  }


      }
