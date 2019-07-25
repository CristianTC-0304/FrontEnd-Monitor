import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { VacunaService } from '../../../services/vacuna.service';
import { MarcaService } from '../../../services/marca.service';
@Component({
    selector: 'app-editar-vacuna',
    templateUrl: './editar-vacuna.component.html',
    styleUrls: ['./editar-vacuna.component.css']
})
export class EditarVacunaComponent implements OnInit {

    vacuna: any = new Object();
    inventario: any = new Object();
    listData: any[] = [];
    listTipoMovimiento = [];
    listObservacion = [];
    listMarca = [];
    resUnidadMedida = [];
    listaDtProductoDTO = [];
    isVisible = false;
    isEntrada = false;
    isSalida = false;

    constructor(private route: ActivatedRoute,
        private router: Router,
        private vacunaService: VacunaService,
        private marcaService: MarcaService
    ) {

    }

    ngOnInit() {
        this.getData()
        this.getMarca()
        this.getUnidadMedida()
        this.getDataInventario()
    }

    showFormVacuna() {
        this.isVisible = true;
    }

    handleCancel() {
        this.isVisible = false;
        this.inventario = {};
    }

    getMarca() {
        this.marcaService.getMarca().subscribe(result => {
            this.listMarca = result;
        })
    }

    getUnidadMedida() {
        this.resUnidadMedida.push(
            { name: 'Kilogramo', value: '1' },
            { name: 'Tonelada', value: '2' },
            { name: 'Miligramo', value: '3' },
            { name: 'Gramos', value: '4' },
            { name: 'Litro', value: '5' },
            { name: 'Mililitro', value: '6' },
            { name: 'Centimetro', value: '7' },
            { name: 'Milímetro', value: '8' }
        )
    }
    cancel(): void {}

    getDataInventario() {
        const date = new Date().toLocaleDateString('COT')
        this.isEntrada = false;
        this.isSalida = false;
        this.inventario.fechaMovimiento = date
        this.listTipoMovimiento.push({ name: 'Entrada', value: '1' }, { name: 'Salida', value: '2' })
    }

    movimientoChange($event) {
        this.listObservacion = []
        $event == 'Entrada' ? (this.isEntrada = true, this.listObservacion.push(
            { name: 'Saldo inicial', value: '1' },
            { name: 'Compra', value: '2' }
        )) : this.isEntrada = false
        $event == 'Salida' ? (this.isSalida = true, this.listObservacion.push(
            { name: 'Salida', value: '3' },
            { name: 'Devolución', value: '4' },
        )) : this.isSalida = false
    }

    getData() {
        this.route.params.subscribe(params => {
            console.log('params router', params)
            this.vacunaService.getVacunaId(params['id']).subscribe(result => {
                if (result.listaDtProductoDTO.length > 0) {
                    const count = result.listaDtProductoDTO.length;
                    result.listaDtProductoDTO[count - 1]['isEdit'] = true
                }
                this.vacuna.idproducto = params['id']
                this.vacuna.codProducto = result.codProducto
                this.vacuna.nombreProducto = result.nombreProducto
                this.vacuna.marcaProducto = result['marcaDTO'].idMarca
                this.vacuna.unidadMedida = result.unidadMedida
                this.listData = [
                    ...result.listaDtProductoDTO
                ]
                this.listaDtProductoDTO = [
                    ...result.listaDtProductoDTO
                ]
            })
        })
    }

    createInventario(form) {
        console.log('form inventario', form, this.listData)
        this.validateOperation(form.descripcion, form)
        this.vacuna.tipoProductoDTO = { idtipoProducto: '1', nombreProducto: 'Vacuna' }
        form['fechaMovimiento'] = new Date()
        this.isVisible = false;
    }

    currencyInputChanged(value) {
        console.log('value', value)
        var num = value.replace(/[$,]/g, "");
        return Number(num);
      }

    editVacuna(data) {
        console.log('data', data)
    }

    removeVacuna(id) {
        this.listData = this.listData.filter(form => form.iddtProducto !== id.iddtProducto)
        this.vacunaService.deleteVacuna(id.iddtProducto).subscribe(result => result);
        console.log('id vacuna', id);
    }

    validateOperation(type, data) {
        console.log('data validate', data)
        const obc = {
            'Saldo inicial': () => {
                const multi = data.cantidadUnitaria * data.promedioUnitario
                this.listaDtProductoDTO.push(
                    Object.assign(data,
                        { totalUnitario: multi },
                        { cantidadTotal: data.cantidadUnitaria },
                        { promedioTotal: data.promedioUnitario },
                        { valorTotal: multi }
                    )
                )
                this.vacuna.listaDtProductoDTO = this.listaDtProductoDTO;
            },
            'Compra': () => {
                const multi = (parseInt(data.cantidadUnitaria) * parseFloat(data.promedioUnitario))
                const dataPop = this.listData.pop()
                const v1 = ((parseFloat(dataPop.valorTotal) + multi));
                const v2 = ((parseFloat(dataPop.cantidadTotal) + parseFloat(data.cantidadUnitaria)));
                this.listaDtProductoDTO.push(
                    Object.assign(data,
                        { totalUnitario: multi },
                        { cantidadTotal: (parseFloat(dataPop.cantidadTotal) + parseFloat(data.cantidadUnitaria)) },
                        { valorTotal: (parseFloat(dataPop.valorTotal) + multi)},
                        { promedioTotal: (v1 / v2) }
                    )
                )
                this.vacuna.listaDtProductoDTO = this.listaDtProductoDTO
            },
            'Salida': () => {
                const dataPop = this.listData.pop()
                const mul = (parseFloat(data.cantidadUnitaria) * parseFloat(dataPop.promedioTotal))
                const res = (parseFloat(dataPop.cantidadTotal) - parseFloat(data.cantidadUnitaria))
                this.listaDtProductoDTO.push(
                    Object.assign(data,
                        { cantidadUnitaria: data.cantidadUnitaria },
                        { promedioUnitario: dataPop.promedioTotal },
                        { totalUnitario: mul},
                        { cantidadTotal: res },
                        { valorTotal: (parseFloat(dataPop.valorTotal) - mul) },
                        { promedioTotal: ((parseFloat(dataPop.valorTotal) - mul) / res) }
                    )
                )
                this.vacuna.listaDtProductoDTO = this.listaDtProductoDTO
            },
            'Devolución': () => {
                const dataPop = this.listData.pop()
                const mul = (parseFloat(data.cantidadUnitaria) * parseFloat(dataPop.promedioTotal))
                const res = (parseFloat(dataPop.cantidadTotal) - parseFloat(data.cantidadUnitaria))
                this.listaDtProductoDTO.push(
                    Object.assign(data,
                        { cantidadUnitaria: data.cantidadUnitaria },
                        { promedioUnitario: dataPop.promedioTotal },
                        { totalUnitario: mul},
                        { cantidadTotal: res },
                        { valorTotal: (parseFloat(dataPop.valorTotal) - mul) },
                        { promedioTotal: ((parseFloat(dataPop.valorTotal) - mul) / res) }
                    )
                )
                this.vacuna.listaDtProductoDTO = this.listaDtProductoDTO
            }
        }

        return obc[type]()
    }

    createVacuna(event, form) {
        const marca = this.listMarca.find(result => (result.idMarca === form.marcaProducto, delete result.dto))
        this.vacuna.marcaDTO = marca
        this.vacuna.unidadMedida = form.unidadMedida
        if (this.vacuna.listaDtProductoDTO) {
            console.log('example save vacuna edit', this.vacuna)
            this.vacunaService.createVacuna(this.vacuna).subscribe(result => {
                this.listData = result.listaDtProductoDTO
                this.inventario = new Object()
                console.log('result save', result);
                /*let entorno = this;
                swal("Petición correcta!", "", "success").then(() => {
                  this.router.navigate(['vacuna']);
                });*/
            })
        }
    }
}