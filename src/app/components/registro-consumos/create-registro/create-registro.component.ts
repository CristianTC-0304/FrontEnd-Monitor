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

  constructor() { }

  ngOnInit() {
    this.getAve();
  }

  getAve() {
    
  }

}
