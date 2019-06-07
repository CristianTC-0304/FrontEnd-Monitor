import { Component, OnInit, OnChanges,ElementRef , Output, Input, EventEmitter, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { TipoAlimentoService } from '../../../services/tipoAlimento.service';
import { UnidadMedidaService } from '../../../services/unidadMedida.service';
import { VacunaService }  from '../../../services/vacuna.service'
import swal from 'sweetalert';

let domModalVacuna;

@Component({
  selector: 'app-crear-vacuna',
  templateUrl: './crear-vacuna.component.html',
  styleUrls: ['./crear-vacuna.component.css']
})
export class CrearVacunaComponent implements OnInit {

  
  resTipoPresentacion = [];  
  vacuna: any = new Object();
  isAlertVisible = false;
  value = '';  
  // title = 'Cantidad';

  @Input() eventEdit = new Object();
  @Output() isResult = new EventEmitter();
  @ViewChild('cantidad') inputElement: ElementRef;
  @ViewChild('valor') valorElement: ElementRef;

  validateForm: FormControl;

  validateFormModalContact: FormGroup;

  constructor(private fb: FormBuilder,        
    private vacunaService: VacunaService
  ) {
  }


  ngOnInit() {
    this.getPresentacion();    

    console.log("Info a editar==>",this.eventEdit);
    window["domModalVacuna"] = this;    
  }

  getPresentacion() {
    this.vacunaService.getPresentacion().subscribe(result => {
      this.resTipoPresentacion = result;
      console.log('Presntacion', result);
    });
  }  

  savealiment(){            
      this.vacuna.estado = 1;
      this.vacuna.valor = Number(this.vacuna.valor);
      this.vacuna.cantidad = Number(this.vacuna.cantidad);                 
      this.vacunaService.createVacuna(this.vacuna).subscribe((result: any) => {           
          // this.isAlertVisible = true;          
          let entorno = this;
          swal("Petición correcta!","","success").then(()=>{
              entorno.vacuna = new Object();
              entorno.isResult.emit(true);
          });
          // setTimeout(function (){ entorno.vacuna = new Object();            
          //   entorno.isResult.emit(true); }, 1000);
          
      })
  }

  /**Cargar Información a la modal */
  infoEdit(dataEdit: any){
      this.vacuna = new Object();      
      this.vacuna.idDrogaVacuna = dataEdit.idDrogaVacuna;
      this.vacuna.nombreVacuna = dataEdit.nombreVacuna;
      this.vacuna.valor = dataEdit.valor;
      this.vacuna.fechaVencimiento = dataEdit.fechaVencimiento;
      this.vacuna.cantidad = dataEdit.cantidad;
      this.vacuna.estado = dataEdit.estado;    
      this.vacuna.idPresentacion = dataEdit.idPresentacion.idPresentacion;       
  }   

  onChange(value: string): void {
    this.updateValue(value);
  }

  onChangeValor(value: string): void {
    this.updateValueValor(value);
  }

  // '.' at the end or only '-' in the input box.
  onBlur(): void {
    if (this.value.charAt(this.value.length - 1) === '.' || this.value === '-') {
      this.updateValue(this.value.slice(0, -1));
    }
  }

  onBlurValor(): void {
    if (this.value.charAt(this.value.length - 1) === '.' || this.value === '-') {
      this.updateValueValor(this.value.slice(0, -1));
    }
  }

  updateValue(value: string): void {
    const reg = /^-?(0|[1-9][0-9]*)(\.[0-9]*)?$/;
    if ((!isNaN(+value) && reg.test(value)) || value === '' || value === '-') {
      this.value = value;
    }
    this.inputElement.nativeElement.value = this.value;   
  }  
  
  updateValueValor(value: string): void {
    const reg = /^-?(0|[1-9][0-9]*)(\.[0-9]*)?$/;
    if ((!isNaN(+value) && reg.test(value)) || value === '' || value === '-') {
      this.value = value;
    }
    this.valorElement.nativeElement.value = this.value;   
  }


}
