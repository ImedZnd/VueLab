import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Chart} from "chart.js";
import * as ChartGeo from "chartjs-chart-geo";
import "chartjs-chart-geo";

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  // @ts-ignore
  @ViewChild('sourceCanvas') private sourceCanvas: ElementRef;
  constructor() {
  }

  ngOnInit(): void {
    this.generateMap();
  }

  generateMap() {
    fetch('https://unpkg.com/world-atlas/countries-50m.json').then((r) => r.json()).then((data) => {
      // @ts-ignore
      const countries = ChartGeo.topojson.feature(data, data.objects.countries).features;

      const chart = new Chart(this.sourceCanvas.nativeElement, {
        type: 'choropleth',
        data: {
          labels: countries.map((d: { properties: { name: any; }; }) => d.properties.name),
          datasets: [{
            label: 'Countries',
            data: countries.map((d: any) => ({feature: d, value: Math.random()})),
          }]
        },
        options: {
          showOutline: true,
          showGraticule: true,
          plugins: {
            legend: {
              display: false
            },
          },
          scales: {
            xy: {
              projection: 'equalEarth'
            }
          }
        }
      });
    });
  }
}
