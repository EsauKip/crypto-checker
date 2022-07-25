import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../service/api.service';
import { ChartConfiguration, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

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
  constructor(private api :ApiService, private activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(val=>{
      this.coinId=val['id'];
  })
  this.getCoinData();
  this.getGraphData();
  }
  getCoinData(){
    this.api.getCurrencyById(this.coinId ).subscribe(data => {
      console.log(this.coinData);
      this.coinData = data;
    }
    )
  }
  getGraphData(){
    this.api.getGraphicalCurrencyData(this.coinId,"USD",1)
    .subscribe(data => {
      console.log(data);
   
    }
    )
  }


}
