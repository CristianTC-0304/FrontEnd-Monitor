import { Component, OnInit, OnChanges, Output, Input, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { TipoAlimentoService } from '../../../services/tipoAlimento.service';
import { UnidadMedidaService } from '../../../services/unidadMedida.service';
import { VacunaService }  from '../../../services/vacuna.service'

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
  // locations = [];

  @Input() eventEdit = new Object();
  @Output() isResult = new EventEmitter();

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
      this.vacunaService.createVacuna(this.vacuna).subscribe((result: any) => {           
          this.isAlertVisible = true;
          // this.getData();
          let entorno = this;
          setTimeout(function (){ entorno.vacuna = new Object();            
            entorno.isResult.emit(true); }, 1000);
          
      })
  }

  
  // getData(){
  //   window["vacunaLista"].getDataVacuna();
  // }

  /**Cargar Información a la modal */
  infoEdit(dataEdit: any){
      this.vacuna = new Object();
      // console.log("INFO A EDITAR", dataEdit);
      this.vacuna.idDrogaVacuna = dataEdit.idDrogaVacuna;
      this.vacuna.nombreVacuna = dataEdit.nombreVacuna;
      this.vacuna.valor = dataEdit.valor;
      this.vacuna.fechaVencimiento = dataEdit.fechaVencimiento;
      this.vacuna.cantidad = dataEdit.cantidad;
      this.vacuna.estado = dataEdit.estado;    
      this.vacuna.idPresentacion = dataEdit.idPresentacion.idPresentacion;       
  }   
}
