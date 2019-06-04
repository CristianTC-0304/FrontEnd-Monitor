import { Component, OnInit, OnChanges, Output, Input, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { TipoAlimentoService } from '../../../services/tipoAlimento.service';
import { UnidadMedidaService } from '../../../services/unidadMedida.service';
import { AlimentoService }  from '../../../services/alimento.service'

let domModalAlimento;

@Component({
  selector: 'app-create-alimento',
  templateUrl: './create-alimento.component.html',
  styleUrls: ['./create-alimento.component.css']
})
export class CreateAlimentoComponent implements OnInit {

  resTipoAlimento = [];
  resUnidadMedida = [];
  aliment: any = new Object();
  isAlertVisible = false;
  // locations = [];

  @Input() eventEdit = new Object();
  @Output() isResult = new EventEmitter();

  validateForm: FormControl;

  validateFormModalContact: FormGroup;

  constructor(private fb: FormBuilder,
    private tipoAlimentoService: TipoAlimentoService,   
    private unidadMedidaService: UnidadMedidaService,
    private alimentoService: AlimentoService
  ) {
  }


  ngOnInit() {
    this.getTipoAlimento();
    this.getUnidadMedida();
    console.log("Info a editar==>",this.eventEdit);
    window["domModalAlimento"] = this;    
  }

  getTipoAlimento() {
    this.tipoAlimentoService.getTipoAlimento().subscribe(result => {
      this.resTipoAlimento = result;
      console.log('documentType', result);
    });
  }

  getUnidadMedida() {
    this.unidadMedidaService.getUnidadMedida().subscribe(result => {
      this.resUnidadMedida = result;
      console.log('documentType', result);
    });
  }


  savealiment(){        
      this.alimentoService.createAlimento(this.aliment).subscribe((result: any) => {           
          this.isAlertVisible = true;
          let entorno = this;
          setTimeout(function (){ entorno.aliment = new Object();            
            entorno.isResult.emit(true); }, 1000);
      })
  }

  /**Cargar Información a la modal */
  infoEdit(dataEdit: any){
      this.aliment = new Object();
      this.aliment.nombre =  dataEdit.nombre;
      this.aliment.estado =  dataEdit.estado;
      this.aliment.costoAlimento =  dataEdit.costoAlimento;
      this.aliment.idTipoAlimento =  dataEdit.idTipoAlimento.idtipoAlimento;
      this.aliment.idUnidadMedida =  dataEdit.idUnidadMedida.idUnidadMedida;
      this.aliment.idprecioAlimento =  dataEdit.idprecioAlimento;      
  }




   
}
