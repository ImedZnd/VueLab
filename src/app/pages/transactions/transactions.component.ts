import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {TransactionService} from "../../services/transaction.service";
import {CurrencyService} from "../../services/currency.service";
import {Chart} from "chart.js";

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css']
})
export class TransactionsComponent implements OnInit {

  constructor(
    private transactionService:TransactionService,
    private CurrencyService:CurrencyService)
  { }
  // @ts-ignore
  @ViewChild('sourceCanvas') private sourceCanvas: ElementRef;
  // @ts-ignore
  @ViewChild('entryCanvas') private entryCanvas: ElementRef;
  // @ts-ignore
  @ViewChild('typeCanvas') private typeCanvas: ElementRef;
  // @ts-ignore
  @ViewChild('stateCanvas') private stateCanvas: ElementRef;
  sourceChart: any = null;
  entryChart: any = null;
  typeChart: any = null;
  stateChart: any = null;

  sourceLabels:string[] =[]
  sourceNumbers:string[] =[]
  entryLabels:string[] =[]
  entryNumbers:string[] =[]
  typeLabels:string[] =[]
  typeNumbers:string[] =[]
  stateLables:string[] =[]
  stateNumbers:string[] =[]

  numberOfAllTransactions:number = 0
  numberOfAllFlaggedTransactions:number = 0
  numberOfAllCompletedTransactions:number = 0
  numberOfTotalCurrency:number = 0
  numberOfCryptoCurrency:number = 0
  ngOnInit(): void {
    this.populateFrontRow()
    this.popChartsData()
  }

  populateFrontRow(){
    this.transactionService.countAllTransactions().subscribe(data=>{this.numberOfAllTransactions = data})
    this.transactionService.countAllTransactionsFlag(true).subscribe(data =>this.numberOfAllFlaggedTransactions = data)
    this.transactionService.countAllTransactionsByState("COMPLETED").subscribe(data =>this.numberOfAllCompletedTransactions = data)
    this.CurrencyService.countAllTransactions().subscribe(data =>{this.numberOfTotalCurrency = data.length})
    this.CurrencyService.getAllByIsCrypto("true").subscribe(data=>{this.numberOfCryptoCurrency = data.length})
  }

  popChartsData(){
    this.transactionService.sourceAndNumberStream().subscribe({
      next: data => {
        this.sourceChartIsUpdated(
          JSON.parse(data)['source'],
          JSON.parse(data)['number']);
      }
    });
    this.transactionService.entryAndNumberStream().subscribe({
      next: data => {
        this.entryChartIsUpdated(
          JSON.parse(data)['entryMethod'],
          JSON.parse(data)['number']);
      }
    });
    this.transactionService.typeAndNumberStream().subscribe({
      next: data => {
        this.typeChartIsUpdated(
          JSON.parse(data)['type'],
          JSON.parse(data)['number']);
      }
    });
    this.transactionService.stateAndNumberStream().subscribe({
      next: data => {
        this.stateChartIsUpdated(
          JSON.parse(data)['state'],
          JSON.parse(data)['number']);
      }
    });
  }

  sourceChartIsUpdated(source:string,number:string){
    if(this.sourceLabels.indexOf(source) == -1){
      if (Chart.getChart('sourceCanvas')){
        // @ts-ignore
        Chart.getChart('sourceCanvas').destroy();
      }
      this.sourceLabels.push(source)
      this.sourceNumbers.push(number)
      this.sourceChartBrowser()
    }
    if(this.sourceLabels.indexOf(source) == 1  && this.sourceNumbers[this.sourceLabels.indexOf(source)] != number){
      if (Chart.getChart('sourceCanvas')){
        // @ts-ignore
        Chart.getChart('sourceCanvas').destroy();
      }
      this.sourceNumbers[this.sourceNumbers.indexOf(source)] = number
      this.sourceChartBrowser()
    }
  }

  sourceChartBrowser(): void {
    this.sourceChart = new Chart(this.sourceCanvas.nativeElement, {
      type: 'doughnut',
      data: {
        labels: this.sourceLabels,
        datasets: [{
          backgroundColor: [
            '#2ecc71',
            '#3498db',
            '#95a5a6',
            '#9b59b6',
            '#f1c40f',
            '#e74c3c'
          ],
          data: this.sourceNumbers
        }]
      }
    });
  }


  entryChartIsUpdated(entry:string,number:string){
    if(this.entryLabels.indexOf(entry) == -1){
      if (Chart.getChart('entryCanvas')){
        // @ts-ignore
        Chart.getChart('entryCanvas').destroy();
      }
      this.entryLabels.push(entry)
      this.entryNumbers.push(number)
      this.entryChartBrowser()
    }
    if(this.entryLabels.indexOf(entry) == 1  && this.entryNumbers[this.entryLabels.indexOf(entry)] != number){
      if (Chart.getChart('entryCanvas')){
        // @ts-ignore
        Chart.getChart('entryCanvas').destroy();
      }
      this.entryNumbers[this.entryNumbers.indexOf(entry)] = number
      this.entryChartBrowser()
    }
  }


  entryChartBrowser(): void {
    this.entryChart = new Chart(this.entryCanvas.nativeElement, {
      type: 'doughnut',
      data: {
        labels: this.entryLabels,
        datasets: [{
          backgroundColor: [
            '#2ecc71',
            '#3498db',
            '#95a5a6',
            '#9b59b6',
            '#f1c40f',
            '#e74c3c'
          ],
          data: this.entryNumbers
        }]
      }
    });
  }

  typeChartIsUpdated(type:string,number:string){
    if(this.typeLabels.indexOf(type) == -1){
      if (Chart.getChart('typeCanvas')){
        // @ts-ignore
        Chart.getChart('typeCanvas').destroy();
      }
      this.typeLabels.push(type)
      this.typeNumbers.push(number)
      this.typeChartBrowser()
    }
    if(this.typeLabels.indexOf(type) == 1  && this.typeNumbers[this.typeLabels.indexOf(type)] != number){
      if (Chart.getChart('typeCanvas')){
        // @ts-ignore
        Chart.getChart('typeCanvas').destroy();
      }
      this.typeNumbers[this.typeNumbers.indexOf(type)] = number
      this.typeChartBrowser()
    }
  }

  typeChartBrowser(): void {
    this.typeChart = new Chart(this.typeCanvas.nativeElement, {
      type: 'doughnut',
      data: {
        labels: this.typeLabels,
        datasets: [{
          backgroundColor: [
            '#2ecc71',
            '#3498db',
            '#95a5a6',
            '#9b59b6',
            '#f1c40f',
            '#e74c3c'
          ],
          data: this.typeNumbers
        }]
      }
    });
  }

  stateChartIsUpdated(state:string,number:string){
    if(this.stateLables.indexOf(state) == -1){
      if (Chart.getChart('stateCanvas')){
        // @ts-ignore
        Chart.getChart('stateCanvas').destroy();
      }
      this.stateLables.push(state)
      this.stateNumbers.push(number)
      this.stateChartBrowser()
    }
    if(this.stateLables.indexOf(state) == 1  && this.stateNumbers[this.stateLables.indexOf(state)] != number){
      if (Chart.getChart('stateCanvas')){
        // @ts-ignore
        Chart.getChart('stateCanvas').destroy();
      }
      this.stateNumbers[this.stateNumbers.indexOf(state)] = number
      this.stateChartBrowser()
    }
  }

  stateChartBrowser(): void {
    this.stateChart = new Chart(this.stateCanvas.nativeElement, {
      type: 'doughnut',
      data: {
        labels: this.stateLables,
        datasets: [{
          backgroundColor: [
            '#2ecc71',
            '#3498db',
            '#95a5a6',
            '#9b59b6',
            '#f1c40f',
            '#e74c3c'
          ],
          data: this.stateNumbers
        }]
      }
    });
  }


}
