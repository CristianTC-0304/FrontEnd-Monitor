import { Component, OnInit, ElementRef, ViewChild, Renderer2 } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { TipoAlimentoService } from '../../../services/tipoAlimento.service';
import { UnidadMedidaService } from '../../../services/unidadMedida.service';
import { VacunaService } from '../../../services/vacuna.service'
import { MarcaService } from '../../../services/marca.service';
import swal from 'sweetalert';
import { NzInputDirective, NzTableComponent, NzTabLabelDirective, NzTableModule } from 'ng-zorro-antd';
import { DataSource } from '@angular/cdk/collections';

let domModalVacuna;

@Component({
  selector: 'app-crear-vacuna',
  templateUrl: './crear-vacuna.component.html',
  styleUrls: ['./crear-vacuna.component.css']
})
export class CrearVacunaComponent implements OnInit {

  vacuna: any = new Object();
  inventario: any = new Object();
  listData: any[] = [];
  listTipoMovimiento = [];
  listObservacion = [];
  listMarca = [];
  resUnidadMedida = [];
  listaDtProductoDTO = [];
  widthConfig = [];
  scrollConfig = {};
  editId: string | null;
  isVisible = false;
  isEntrada = false;
  isSalida = false;


  @ViewChild(NzInputDirective, { read: ElementRef })
  @ViewChild(NzTableModule, { read: ElementRef })
  @ViewChild("editRowTable") editRowTable: ElementRef
  inputElement: ElementRef;
  //editRowTable: ElementRef

  validateFormModalContact: FormGroup;

  constructor(private fb: FormBuilder,
    private vacunaService: VacunaService,
    private marcaService: MarcaService,
    private renderer: Renderer2,
    private router: Router
  ) {
  }

  showFormVacuna($event) {
    this.isVisible = true;
  }

  handleCancel() {
    this.isVisible = false;
    this.inventario = {};
  }

  ngOnInit() {
    this.getDataInventario();
    this.getMarca();
    this.getUnidadMedida();
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

  createVacuna(event, form) {
    const marca = this.listMarca.find(result => (result.idMarca === form.marcaProducto, delete result.dto))
    this.vacuna.marcaDTO = marca
    this.vacuna.unidadMedida = form.unidadMedida
    if (this.vacuna.listaDtProductoDTO) {
      this.vacunaService.createVacuna(this.vacuna).subscribe(result => {
        this.listData = result.listaDtProductoDTO
        let entorno = this;
        swal("Petición correcta!", "", "success").then(() => {
          this.router.navigate(['vacuna']);
        });
      })
    }
  }

  createInventario(form) {
    this.validateOperation(form.descripcion, form)
    this.vacuna.tipoProductoDTO = { idtipoProducto: '1', nombreProducto: 'Vacuna' }
    form['fechaMovimiento'] = new Date()
    this.isVisible = false;
  }

  validateMoney(event) {
    console.log('validate', event)
    const formatter = new Intl.NumberFormat()
    formatter.format(parseFloat(event))    
  }


  validateOperation(type, data) {
    const obc = {
      'Saldo inicial': () => {
        const multi = data.cantidadUnitaria * data.promedioUnitario
        this.listaDtProductoDTO.push(
          Object.assign(data,
            { totalUnitario: multi},
            { cantidadTotal: data.cantidadUnitaria },
            { promedioTotal: data.promedioUnitario },
            { valorTotal: multi }
          )
        )
        this.vacuna.listaDtProductoDTO = this.listaDtProductoDTO;
        console.log('this.vacuna', this.vacuna);
      },
      'Compra': () => {
        console.log('compra')
      },
      'Salida': () => {
        console.log('salida')
      },
      'Devolución': () => {
        console.log('devolución')
      }
    }

    return obc[type]()
  }
 

}
