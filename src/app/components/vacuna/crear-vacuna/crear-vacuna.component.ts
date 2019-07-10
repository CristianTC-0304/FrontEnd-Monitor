import { Component, OnInit, HostListener, OnChanges, ElementRef, Output, Input, EventEmitter, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { TipoAlimentoService } from '../../../services/tipoAlimento.service';
import { UnidadMedidaService } from '../../../services/unidadMedida.service';
import { VacunaService } from '../../../services/vacuna.service'
import swal from 'sweetalert';
import { NzInputDirective } from 'ng-zorro-antd';

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
  widthConfig = [];
  scrollConfig = {};
  validateForm: FormControl;
  i = 0;
  editId: string | null;
  isVisible = false;
  isEntrada = false;
  isSalida = false;


  @ViewChild(NzInputDirective, { read: ElementRef })
  inputElement: ElementRef;

  validateFormModalContact: FormGroup;

  constructor(private fb: FormBuilder,
    private vacunaService: VacunaService
  ) {
  }

  //@HostListener('window:click', ['$event'])
  handleClick(e: MouseEvent): void {
    if (this.editId && this.inputElement && this.inputElement.nativeElement !== e.target) {
      this.editId = null;
    }
  }

  addRow() {
    const date = new Date();
    this.listData = [
      ...this.listData,
      {
        id: `${this.i}`,
        fechaMovimiento: date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear(),
        descripcion: "example d",
        costoProducto: "example costos",
        entrada: "exmaple entrada",
        salida: "example salida",
        cantidadTotal: "example catidadTotal",
        valorTotal: "example valorTotal"
      }
    ]
    this.i++;
  }

  showFormVacuna() {
    this.isVisible = true;
  }

  handleCancel() {
    this.isVisible = false;
  }

  startEdit(id: string, event: MouseEvent): void {
    console.log('example id', id)
    event.preventDefault();
    event.stopPropagation();
    this.editId = id;
  }

  deleteRow(id: string): void {
    this.listData = this.listData.filter(d => d.id !== id);
  }

  ngOnInit() {
    this.inventario.fechaIngreso
    this.getDataInventario();
    this.addRow();
  }

  getDataInventario() {
    this.widthConfig = ['100px', '200px', '200px', '100px', '100px', '200px', '200px', '100px'];
    this.scrollConfig = { x: '1600px', y: '260px' };
    const date = new Date();
    this.isEntrada = false;
    this.isSalida = false;
    this.inventario.fechaIngreso = date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear()
    this.listTipoMovimiento.push({ name: 'Entrada', value: '1' }, { name: 'Salida', value: '2' })
    this.listObservacion.push(
      { name: 'Salida inicial', value: '1' },
      { name: 'Compra', value: '2' },
      { name: 'Salida', value: '3' },
      { name: 'Devolución', value: '4' },
      { name: 'Ventas', value: '5' }
    )
  }

  movimientoChange($event) {
    console.log('event change', $event)
    $event == '1' ? this.isEntrada = true : this.isEntrada = false
    $event == '2' ? this.isSalida = true : this.isSalida = false
  }

  createVacuna() {

  }

  createInventario(form) {
    console.log('form inventario', form)
  }

}
