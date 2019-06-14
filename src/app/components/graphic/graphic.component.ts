import { Component, OnInit, ViewChild } from '@angular/core';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-graphic',
  templateUrl: './graphic.component.html',
  styleUrls: ['./graphic.component.css']
})
export class GraphicComponent implements OnInit {

  @ViewChild('lineChart') private chartRef;
  chart: any;

  constructor() { }

  ngOnInit() {
  }

charts = new Chart(this.chartRef.nativeElement, {
    type: 'line',
    data: {
      labels: [], // your labels array
      datasets: [
        {
          data: [{
            x: 1,
            y: 10
          }, {
            x: 2,
            y: 20
          }], // your data array
          borderColor: '#00AEFF',
          fill: false
        }
      ]
    },
    options: {
      legend: {
        display: false
      },
      scales: {
        xAxes: [{
          display: true
        }],
        yAxes: [{
          display: true
        }],
      }
    }
  });

}
