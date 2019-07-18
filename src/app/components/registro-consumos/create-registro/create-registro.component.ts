import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AveService } from '../../../services/ave.service';
import { CostoAvicolaService } from '../../../services/costo-avicola.service';
import { Route } from '@angular/compiler/src/core';

@Component({
  selector: 'app-create-registro',
  templateUrl: './create-registro.component.html',
  styleUrls: ['./create-registro.component.css']
})
export class CreateRegistroComponent implements OnInit {

  costoAvicola: any = new Object();
  sumTotalMaterial: string;
  resListAve: [];

  constructor(
    private aveService: AveService
  ) { 

  }

  ngOnInit() {
    this.getAve();
  }

  getAve() {
    this.aveService.getAve().subscribe(result => console.log('example list aver', result))
  }


  createConsumo(form) {
    console.log('example form registro', form)
  }

  sumMaterial(event) {
    console.log('event', event)
    this.sumTotalMaterial = event + this.costoAvicola.totalVacunas;
    console.log('exmaple', this.sumTotalMaterial, this.costoAvicola.totalVacunas)
  }
}
