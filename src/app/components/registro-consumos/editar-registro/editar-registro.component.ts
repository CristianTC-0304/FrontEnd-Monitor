import { Component, OnInit } from '@angular/core'
import { CostoAvicolaService } from '../../../services/costo-avicola.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AveService } from '../../../services/ave.service';
import swal from 'sweetalert';
@Component({
    selector: 'app-editar-registro',
    templateUrl: './editar-registro.component.html',
    styleUrls: ['./editar-registro.component.css']
})
export class EditarRegistroComponent implements OnInit {

    costoAvicola: any = new Object();
    costoAlimento: any = new Object();
    resListAve = [];

    constructor(
        private costoAvicolaService: CostoAvicolaService,
        private aveService: AveService,
        private router: Router,
        private route: ActivatedRoute
    ) { }

    ngOnInit() {
        this.getData()
        this.getAve()
    }

    getAve() {
        this.aveService.getAve().subscribe(result => {
            this.resListAve = result
        })
    }

    getData() {
        this.route.params.subscribe(params => {
            this.costoAvicolaService.getIdCostoAvicola(params['id']).subscribe(result => {
                this.costoAvicola = Object.assign(result)
                this.costoAvicola['idcostoAvicola'] = params['id'];
                this.costoAvicola.idAve = result['ave'].idAve;
            })
        })
    }

    editConsumo(form) {
        const summ = ((form.costoAlimento + form.totalVacunas) +
            ((form.totalManoObra + form.despique) + form.empaque) +
            ((form.totalAlojamiento + form.calefacion) + (form.serviciosPublicos + form.depresiacion) +
                (form.amortizacion + form.mortalidad))
        )
        console.log('sum', summ)
        form.ave = this.resListAve.find(res => res.idAve == form.idAve)
        form.granTotal = parseFloat(summ)
        form.subTotal = "0"
        form.valorMortalidad = "0"
        form.viruta = "0"
        form.cantidadKg = 0
        form.planta = "0"
        form.fechaCreacion = new Date()
        form.idcostoAvicola = this.costoAvicola.idcostoAvicola;
        this.costoAvicolaService.createCostoAvicola(form).subscribe(result => {
            swal("Petición correcta!", "", "success").then(() => {
                this.router.navigate(['/registroConsumo']);
            });
        })
    }
}