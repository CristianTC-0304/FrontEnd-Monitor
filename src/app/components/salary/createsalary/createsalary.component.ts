import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
// import { EventEmitter } from 'protractor';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { SalaryService } from '../../../services/salary.service';
import swal from 'sweetalert';

let domModalSalario;
@Component({
  selector: 'app-createsalary',
  templateUrl: './createsalary.component.html',
  styleUrls: ['./createsalary.component.css']
})
export class CreatesalaryComponent implements OnInit {

  title = 'Este campo es numerico';
  valueSalario = '';
  valueAuxilio = '';
  valuePrestacion = '';
  valueYear = '';
  salary: any = new Object();
  isAlertVisible = false;
  date: any = new Date();
  @Input() eventEdit = new Object();
  @Output() isResult = new EventEmitter();
  @ViewChild('salaryBasic') salaryBasicElement: ElementRef;
  @ViewChild('auxilioTransporte') auxilioTransporteElement: ElementRef;
  @ViewChild('prestacionSocial') prestacionSocialElement: ElementRef;  

  constructor(
    private salaryService: SalaryService) { }

  ngOnInit() {
    this.date = this.date.getUTCFullYear().toString();
    console.log('example', this.date);
    console.log("Info a editar==>", this.eventEdit);
    window["domModalSalario"] = this;
    this.salary.periodo = this.date;
    console.log('salary', this.salary);
  }

  saveSalary() {

    // console.log('full date', this.salary.periodo);

    if (isNaN(this.salary.salario)) {
      swal("Advertencia!", "Campo salario solo permite numero.", "warning");
      return false;
    } else {
      this.salary.salario = Number(this.salary.salario);
    }

    if (isNaN(this.salary.auxilioTransporte)) {
      swal("Advertencia!", "Campo Auxilio Transporte solo permite numero.", "warning");
      return false;
    } else {
      this.salary.auxilioTransporte = Number(this.salary.auxilioTransporte);
    }

    if (isNaN(this.salary.prestacionesSociales)) {
      swal("Advertencia!", "Campo Prestaciones Sociales solo permite numero.", "warning");
      return false;
    } else {
      this.salary.prestacionesSociales = Number(this.salary.prestacionesSociales);
    }

    /*if(isNaN(this.salary.periodo)){
      swal("Advertencia!", "Campo año solo permite numero.", "warning");
      return false;
    } else {
      this.salary.periodo = Number(this.salary.periodo);
    }*/

    this.salaryService.createSalary(this.salary).subscribe((result: any) => {
      // this.isAlertVisible = true;
      let entorno = this;
      swal("Petición correcta!", "", "success").then(() => {
        entorno.salary = new Object();
        entorno.isResult.emit(true);
      });
    });

  }

  /**Cargar Información a la modal */
  infoEdit(dataEdit: any) {
    this.salary = new Object();
    // console.log("INFO A EDITAR", dataEdit);
    this.salary.idsalario = dataEdit.idsalario;
    this.salary.salario = dataEdit.salario;
    this.salary.auxilioTransporte = dataEdit.auxilioTransporte;
    this.salary.prestacionesSociales = dataEdit.prestacionesSociales;
    this.salary.periodo = dataEdit.periodo;
    this.salary.estado = dataEdit.estado;
  }

  onChange(value: string, tipo: number): void {
    this.updateValue(value, tipo);
  }

  // '.' at the end or only '-' in the input box.
  onBlur(): void {
    if (this.valueSalario.charAt(this.valueSalario.length - 1) === '.' || this.valueSalario === '-') {
      this.updateValue(this.valueSalario.slice(0, -1));
    }
  }

  onBlurAuxilio(): void {
    if (this.valueAuxilio.charAt(this.valueAuxilio.length - 1) === '.' || this.valueAuxilio === '-') {
      this.updateValue(this.valueAuxilio.slice(0, -1));
    }
  }

  onBlurPrestacion(): void {
    if (this.valuePrestacion.charAt(this.valuePrestacion.length - 1) === '.' || this.valuePrestacion === '-') {
      this.updateValue(this.valuePrestacion.slice(0, -1));
    }
  }

  onBlurYear(): void {
    if (this.valueYear.charAt(this.valueYear.length - 1) === '.' || this.valueYear === '-') {
      this.updateValue(this.valueYear.slice(0, -1));
    }
  }

  updateValue(value: string, tipo?: number): void {
    const reg = /^-?(0|[1-9][0-9]*)(\.[0-9]*)?$/;
    if ((!isNaN(+value) && reg.test(value)) || value === '' || value === '-') {
      
      switch (tipo) {
        case 1:
          this.valueSalario = value;
          break;
        case 2:
          this.valueAuxilio = value;          
          break;
        case 3:
          this.valuePrestacion = value;          
          break;        
        default:
          break;
      }
    }
    switch (tipo) {
      case 1:
        this.salaryBasicElement.nativeElement.value = this.valueSalario;
        break;
      case 2:
        this.auxilioTransporteElement.nativeElement.value = this.valueAuxilio;
        break;
      case 3:
        this.prestacionSocialElement.nativeElement.value = this.valuePrestacion;
        break;      
      default:
        break;
    }
  }



}
