import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { ChartDataset, ChartOptions } from 'chart.js';
// import { Color, Label } from 'ng2-charts';
import { Chart } from 'chart.js';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'VueLab';
  constructor(private httpClient: HttpClient) { }
}
