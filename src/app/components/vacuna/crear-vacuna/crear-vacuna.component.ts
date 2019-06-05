import { Component, OnInit, OnChanges, Output, Input, EventEmitter } from '@angular/core';
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
      this.vacuna.estado = 1;

      if(isNaN(this.vacuna.cantidad)){
        swal("Advertencia!", "Campo cantidad solo permite numero.", "warning");
        return false;
      } else {
          this.vacuna.cantidad = Number(this.vacuna.cantidad);
      }       

      if(isNaN(this.vacuna.valor)){
        swal("Advertencia!", "Campo valor solo permite numero.", "warning");
        return false;
      } else {
          this.vacuna.valor = Number(this.vacuna.valor);
      }       
                 
      this.vacunaService.createVacuna(this.vacuna).subscribe((result: any) => {           
          this.isAlertVisible = true;          
          let entorno = this;
          setTimeout(function (){ entorno.vacuna = new Object();            
            entorno.isResult.emit(true); }, 1000);
          
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
}
