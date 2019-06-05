import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
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

  salary: any = new Object();
  isAlertVisible = false;
  @Input() eventEdit = new Object();
  @Output() isResult = new EventEmitter();
  constructor(
    private salaryService: SalaryService) { }

  ngOnInit() {
    console.log("Info a editar==>", this.eventEdit);
    window["domModalSalario"] = this;
  }

  saveSalary() {

    if(isNaN(this.salary.salario )){
      swal("Advertencia!", "Campo salario solo permite numero.", "warning");
      return false;
    } else {
      this.salary.salario = Number(this.salary.salario);
    }       

    if(isNaN(this.salary.auxilioTransporte)){
      swal("Advertencia!", "Campo Auxilio Transporte solo permite numero.", "warning");
      return false;
    } else {
      this.salary.auxilioTransporte = Number(this.salary.auxilioTransporte);
    }             

    if(isNaN(this.salary.prestacionesSociales)){
      swal("Advertencia!", "Campo Prestaciones Sociales solo permite numero.", "warning");
      return false;
    } else {
      this.salary.prestacionesSociales = Number(this.salary.prestacionesSociales);
    }   
    
    if(isNaN(this.salary.periodo)){
      swal("Advertencia!", "Campo año solo permite numero.", "warning");
      return false;
    } else {
      this.salary.periodo = Number(this.salary.periodo);
    }     

    this.salaryService.createSalary(this.salary).subscribe((result: any) => {
      this.isAlertVisible = true;
      let entorno = this;
      setTimeout(function () {
        entorno.salary = new Object();
        entorno.isResult.emit(true);
      }, 1000);
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


}
