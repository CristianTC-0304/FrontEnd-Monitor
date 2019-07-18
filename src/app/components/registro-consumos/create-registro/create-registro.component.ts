import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AveService } from '../../../services/ave.service';
import { CostoAvicolaService } from '../../../services/costo-avicola.service';
import swal from 'sweetalert';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-create-registro',
  templateUrl: './create-registro.component.html',
  styleUrls: ['./create-registro.component.css']
})
export class CreateRegistroComponent implements OnInit {

  costoAvicola: any = new Object();
  sumTotalMaterial: string;
  resListAve = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private aveService: AveService,
    private costoAvicolaService: CostoAvicolaService
  ) {

  }

  ngOnInit() {
    this.getAve();
  }

  getAve() {
    this.aveService.getAve().subscribe(result => {
      this.resListAve = result;
    })
  }


  createConsumo(form) {
    const summ = ((form.costoAlimento + form.totalVacunas) +
      ((form.totalManoObra + form.despique) + form.empaque) +
      ((form.totalAlojamiento + form.calefacion) + (form.serviciosPublicos + form.depresiacion) +
        (form.amortizacion + form.mortalidad))
    )
    console.log('summ', summ)
    form.ave = this.resListAve.find(res => res.idAve == form.idAve)
    form.granTotal = summ
    form.subTotal = "0"
    form.valorMortalidad = "0"
    form.viruta = "0"
    form.cantidadKg = 0
    form.planta = "0"
    form.fechaCreacion = new Date()
    this.costoAvicolaService.createCostoAvicola(form).subscribe(result => {
      swal("Petición correcta!", "", "success").then(() => {
        this.router.navigate(['/registroConsumo']);
      });
    })
  }

}
