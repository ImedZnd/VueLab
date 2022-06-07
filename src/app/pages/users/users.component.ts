import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {UserService} from "../../services/user.service";
import {Chart} from "chart.js";
import {Subscription} from "rxjs";
import {Router} from '@angular/router';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  constructor(private personService: UserService,
              private router: Router) { }

  // @ts-ignore
  @ViewChild('pieCanvas') private pieCanvas: ElementRef;
  // @ts-ignore
  @ViewChild('doughnutCanvas') private doughnutCanvas: ElementRef;
  pieChart: any = null;
  donatState: any = null;
  kycNumbers:string[]=[]
  kycLabels:string[]=[]
  sub!: Subscription;

  dataChartIsUpdated(kyc:string,number:string){
    if(this.kycLabels.indexOf(kyc) == -1){
      if (Chart.getChart('pieCanvas')){
        // @ts-ignore
        Chart.getChart('pieCanvas').destroy();
      }
      this.kycLabels.push(kyc)
      this.kycNumbers.push(number)
      this.pieChartBrowser()
    }
    if(this.kycLabels.indexOf(kyc) == 1  && this.kycNumbers[this.kycLabels.indexOf(kyc)] != number){
      if (Chart.getChart('pieCanvas')){
        // @ts-ignore
        Chart.getChart('pieCanvas').destroy();
      }
      this.kycNumbers[this.kycNumbers.indexOf(kyc)] = number
      this.pieChartBrowser()
    }
  }

  donatDataChartIsUpdated(state:string,number:string){
    if(this.stateLabels.indexOf(state) == -1){
      if (Chart.getChart('doughnutCanvas')){
        // @ts-ignore
        Chart.getChart('doughnutCanvas').destroy();
      }
      this.stateLabels.push(state)
      this.stateNumbers.push(number)
      this.doughnutChartBrowser()
    }
    if(this.stateLabels.indexOf(state) == 1  && this.stateNumbers[this.stateLabels.indexOf(state)] != number){
      if (Chart.getChart('doughnutCanvas')){
        // @ts-ignore
        Chart.getChart('doughnutCanvas').destroy();
      }
      this.stateNumbers[this.stateNumbers.indexOf(state)] = number
      this.doughnutChartBrowser()
    }
  }

  popChartsData(){
    this.sub = this.personService.kycAndNumberStream().subscribe({
      next: data => {
        this.dataChartIsUpdated(
          JSON.parse(data)['kyc'],
          JSON.parse(data)['number']);
      }
    });
    this.sub = this.personService.stateAndCountStream().subscribe({
      next:data =>{
        this.donatDataChartIsUpdated(
          JSON.parse(data)['state'],
          JSON.parse(data)['number']);
      }
    })
  }

  pieChartBrowser(): void {
    this.pieChart = new Chart(this.pieCanvas.nativeElement, {
      type: 'pie',
      data: {
        labels: this.kycLabels,
        datasets: [{
          backgroundColor: [
            '#2ecc71',
            '#3498db',
            '#95a5a6',
            '#9b59b6',
            '#f1c40f',
            '#e74c3c'
          ],
          data: this.kycNumbers
        }]
      }
    });
  }

  stateLabels :string[]=[]
  stateNumbers :string[]=[]
  doughnutChartBrowser(): void {
    this.donatState = new Chart(this.doughnutCanvas.nativeElement, {
      type: 'doughnut',
      data: {
        labels: this.stateLabels,
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

  ngOnInit(): void {
    this.popChartsData()
    this.personService.countAllUsersByIsFraudStream(true).subscribe({
        next: data => {
          this.allFraudsters = JSON.parse(data)
        },
      });
  }

  checkOneUser(id:number){
    this.router.navigate(['/user', id]);
  }

  ngAfterViewInit(){
    this.initDashElements()
    this.pupulateFrontRow()
    // this.popdata()
  }
  allUsers :number = 0
  numberOfPerson: number = 0
  numberOfFraudsters: number = 0
  numberOfActiveUsers: number = 0
  percentageOfNumberOfFraudsters: number = 0
  percentageOfNumberOfNonFraudsters: number = 0
  percentageOfNumberOfActiveUsers: number = 0
  numberOfTransactions: number = 0
  numberOfNonFlaged : number=0
  numberOfFlaged : number = 0
  percentageOfNonFlaged : number=0
  percentageOfFlaged : number=0

  initDashElements() {
    this.personService.countAllPerson().subscribe(data => {
      this.numberOfPerson = data;
      this.personService.countAllUsersByIsFraud(true).subscribe(data1 => {
        this.numberOfFraudsters = data1;
        this.percentageOfNumberOfFraudsters = Math.round(data1 / this.numberOfPerson * 100);
        this.percentageOfNumberOfNonFraudsters = Math.abs(100-this.percentageOfNumberOfFraudsters)
      })
      this.personService.countAllNonFlagged().subscribe(data3=>{
        this.numberOfNonFlaged = data3;
        this.percentageOfNonFlaged = Math.round(data3 / this.numberOfPerson * 100);
        this.percentageOfFlaged = 100-this.percentageOfNonFlaged
        this.numberOfFlaged = this.allUsers - this.numberOfNonFlaged
      })
      this.personService.countAllPersonByState("ACTIVE").subscribe(data2 => {
        this.numberOfActiveUsers = data2;
        this.percentageOfNumberOfActiveUsers = Math.round(data2 / this.numberOfPerson * 100);
      })
    })
  }
  bufferValue = 100;

  allFraudsters :number = 0
  allVerified :number = 0
  totalFlags :number = 0
  latestJoined :number = 0
  pupulateFrontRow(){
    this.personService.countAllPerson().subscribe(data =>this.allUsers = data)
    // this.personService.countAllUsersByIsFraud(true).subscribe(data =>this.allFraudsters = data)
    this.personService.countAllByHasEmail(true).subscribe(data =>this.allVerified = data)
    this.personService.countAllFlags().subscribe(data =>this.totalFlags = data)
    this.personService.countAllUsersByYear(2018).subscribe(data => {
      this.latestJoined = data;
    })
  }

}
