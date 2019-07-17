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

  resAve = [];
  constructor(private fb: FormBuilder,
    private aveService: AveService,
    private costoAvicola: CostoAvicolaService,
    private router: Route
  ) { }

  ngOnInit() {
    this.getAve();
  }

  getAve() {
    this.aveService.getAve().subscribe(result => {
      this.resAve = result;
      console.log('documentType', result);
    });
  }

}
