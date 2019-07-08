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
  listData: any[] = [];
  validateForm: FormControl;
  i = 0;
  editId: string | null;


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
    this.listData = [
      ...this.listData,
      {
        id: `${this.i}`,
        fechaMovimiento: "example",
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
    this.addRow();
  }

  createVacuna() {
    
  }

}
