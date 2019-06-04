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
          setInterval(()=>{
            this.vacuna = new Object();
            this.isResult.emit(true);          
          },1000)                  
      })
  }

  /**Cargar Información a la modal */
  infoEdit(dataEdit: any){
      // this.vacuna = new Object();
      // this.aliment.nombre =  dataEdit.nombre;
      // this.aliment.estado =  dataEdit.estado;
      // this.aliment.costoAlimento =  dataEdit.costoAlimento;
      // this.aliment.idTipoAlimento =  dataEdit.idTipoAlimento.idtipoAlimento;
      // this.aliment.idUnidadMedida =  dataEdit.idUnidadMedida.idUnidadMedida;
      // this.aliment.idprecioAlimento =  dataEdit.idprecioAlimento;      
  }   
}
