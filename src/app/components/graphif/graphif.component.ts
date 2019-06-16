import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { GraphifService } from '../../services/graphif.service';
import { Chart } from 'chart.js';

@Component({
    selector: 'app-graphif',
    templateUrl: './graphif.component.html',
    styleUrls: ['./graphif.component.css']
  })
  export class GraphifComponent  implements OnInit {

    chart;
    humidity: [44.20000076293945, 44.20000076293945, 44.20000076293945, 44.20000076293945];
    temp: {};

    constructor(private graphifService: GraphifService) {}

    ngOnInit() {
      //this.getDataGraphif();
      this.getChart();
    }

    getDataGraphif() {
        this.graphifService.getDataGraphif().subscribe(result => {
            console.log('result graphif', result);
            result.forEach(res => {
              console.log('res', res);
              Object.keys(res).map(data => {
                this.distributeData(data, res);
                //this.getDataGraphif();
              });
            });
        });
    }

    distributeData(type, res) {
      let data = {
        'humidity': (() => {
          console.log('entro en humedity');
          return this.humidity = res.humidity;
        }),
        'temp': (() => {
          console.log('entro en temp');
          return this.temp = res.temp;
        }),
        'default': (() => {
          return 'default';
        })
      };
      return (data[type] || data['default'])();
    }

    getChart() {
      console.log('data humidity', this.humidity);
      this.chart = new Chart('bar', {
        type: 'line',
        data: {
          labels: ['Humedad', 'Temperatura'],
          datasets: [
            {label: 'Humedad',
            backgroundColor: 'black',
            data: [{
              x: -10,
              y: 0
          }, {
              x: 0,
              y: 10
          }, {
              x: 10,
              y: 5
          }]
          },
            {label: 'Temperatura'}
          ]
        }
      });
    }
  }
