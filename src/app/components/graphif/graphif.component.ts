import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { GraphifService } from '../../services/graphif.service';
import { Chart } from 'chart.js';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-graphif',
    templateUrl: './graphif.component.html',
    styleUrls: ['./graphif.component.css']
  })
  export class GraphifComponent  implements OnInit {
    ex: Observable<any[]>
    data$;
    chart;
    humidity = [];
    temp = [];
    date = [];

    constructor(private graphifService: GraphifService) {}

    ngOnInit() {
      this.getDataGraphif();
    }

    getDataGraphif = async () => {
      this.data$ = this.graphifService.getData().subscribe(res => {
        res.forEach(dato => {
          (dato['humidity'] ? this.humidity.push(dato['humidity']) : []); 
          (dato['temp'] ? this.temp.push(dato['temp']) : []);
          (dato['Date'] ? this.date.push(dato['Date']): []);
          console.log('dato',dato['humidity'])
        })
        this.getChart()
        console.log('ex', res, this.humidity, this.temp)
      })
    }

    getChart() {
      this.chart = new Chart('bar', {
        type: 'line',
        data: {
          labels: this.date,
          datasets: [
            {label: 'Humedad',
            borderColor: 'green',
            backgroundColor: 'green',
            fill: false,
            data: this.humidity,
          },
            {label: 'Temperatura',
            borderColor: 'yellow',
            backgroundColor: 'yellow',
            fill: false,
            data: this.temp,
          },
          ]
        },
        options: {
					responsive: true,
					hoverMode: 'index',
					stacked: false,
					title: {
						display: true,
						text: 'Grafica de Rapsberry'
					},
					scales: {
						yAxes: [{
							type: 'linear', // only linear but allow scale type registration. This allows extensions to exist solely for log scale for instance
							display: true,
							position: 'left',
							id: 'y-axis-1',
						}, {
							type: 'linear', // only linear but allow scale type registration. This allows extensions to exist solely for log scale for instance
							display: true,
							position: 'right',
							id: 'y-axis-2',

							// grid line settings
							gridLines: {
								drawOnChartArea: false, // only want the grid lines for one axis to show up
							},
						}],
          }
        }
      });
    }
  }
