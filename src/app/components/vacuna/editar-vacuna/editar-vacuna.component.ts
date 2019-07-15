import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
    selector: 'app-editar-vacuna',
    templateUrl: './editar-vacuna.component.html',
    styleUrls: ['./editar-vacuna.component.css']
})
export class EditarVacunaComponent implements OnInit {

    constructor(private route: ActivatedRoute,
        private router: Router,
    ) {

    }

    ngOnInit() {
        this.getData()
    }

    getData() {
        this.route.params.subscribe(params => {
            console.log('params router', params)
        })
    }
}