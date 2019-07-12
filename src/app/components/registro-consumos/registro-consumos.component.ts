import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CostoAvicolaService } from '../../services/costo-avicola.service';

@Component({
  selector: 'app-registro-consumos',
  templateUrl: './registro-consumos.component.html',
  styleUrls: ['./registro-consumos.component.css']
})
export class RegistroConsumosComponent implements OnInit {

  constructor(  private route: ActivatedRoute,
    private router: Router, 
    private costoAvicola:CostoAvicolaService) { }

    resData = [];
  ngOnInit() {
    this.getCostoAvicola();
  }

  showFormCreateConsumo() {
    // window['domModalStaff'].isAlertVisible = false;
    // window['domModalStaff'].staff = new Object();
    this.router.navigate(['crear-consumo']);
  }

  getCostoAvicola() {
    console.log("entro 3333");
     this.costoAvicola.getCostoAvicola().subscribe((data: any) => {
      console.log('data staff', data);
      this.resData = data
    });
  }

}
