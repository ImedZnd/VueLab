import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {UserService} from "../../services/user.service";
import {Chart} from "chart.js";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

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


  constructor(private route: ActivatedRoute, private userService: UserService) {
  }

  myParam: string = "";
  userSeq: string = "";
  userFailedSignInAttempts: number = 0;
  userCountryCode: string = "";
  userPhoneCountry: string = "";
  userHasEmail: boolean = false;
  userIsFraudster: boolean = false;
  userKyc: string = "";
  userState: string = "";
  userNumberOfFlags: string = "";
  userNumberOfTransactions: number = 0
  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.myParam = params['id'];
      this.userService.countTransactionsOfUser(this.myParam).subscribe(data=>this.userNumberOfTransactions=data)
      this.userService.getUserByIdStream(this.myParam).subscribe(data => {
        this.userSeq = JSON.parse(data)['seqUser']
        this.userFailedSignInAttempts = JSON.parse(data)['failedSignInAttempts']
        this.userCountryCode = JSON.parse(data)['countryCode']
        this.userPhoneCountry = JSON.parse(data)['phoneCountry']
        this.userHasEmail = JSON.parse(data)['hasEmail']
        this.userIsFraudster = JSON.parse(data)['fraudster']
        this.userKyc = JSON.parse(data)['kyc']
        this.userState = JSON.parse(data)['state']
        this.userNumberOfFlags = JSON.parse(data)['numberOfFlags']
      })
    });
    this.popChartsData()
  }

  flagUserButtonOnClick(){
    this.userService.flagUserById(this.myParam).subscribe()
  }

  fraudUserButtonOnClick(){
    this.userService.fraudUserById(this.myParam).subscribe()
  }

  unFraudUserButtonOnClick(){
    this.userService.unFraudUserById(this.myParam).subscribe()
  }

  popChartsData(){
    this.userService.countSourceAndNumberByUserId(this.myParam).subscribe({
      next: data => {
        this.sourceChartIsUpdated(
          JSON.parse(data)['source'],
          JSON.parse(data)['number']);
      }
    });
    this.userService.countEntryMethodAndNumberByUserId(this.myParam).subscribe({
      next: data => {
        this.entryChartIsUpdated(
          JSON.parse(data)['entryMethod'],
          JSON.parse(data)['number']);
      }
    });
    this.userService.countTypeAndNumberByUserId(this.myParam).subscribe({
      next: data => {
        this.typeChartIsUpdated(
          JSON.parse(data)['type'],
          JSON.parse(data)['number']);
      }
    });
    this.userService.countStateAndNumberByUserId(this.myParam).subscribe({
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
