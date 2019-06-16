import { Component, OnInit } from '@angular/core';
import { GraphifService } from '../../services/graphif.service';
import { Chart } from 'chart.js';

@Component({
    selector: 'app-graphif',
    templateUrl: './graphif.component.html',
    styleUrls: ['./graphif.component.css']
  })
  export class GraphifComponent  implements OnInit {

    data: any = {};


    constructor(private graphifService: GraphifService) {}

    ngOnInit() {
        this.getDataGraphif();
        this.formatChart();
    }

    getDataGraphif() {
        this.graphifService.getDataGraphif().subscribe(result => {
            console.log('result graphif', result);
        });
    }

    formatChart() {
        const ex = document.getElementById('myChart');
        console.log('example', ex);
        const myChart = new Chart(ex, {
            type: 'bar',
    data: {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [{
            label: '# of Votes',
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    }
        });
        console.log('graphif', myChart);
    }
  }
