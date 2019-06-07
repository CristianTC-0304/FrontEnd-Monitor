import { Component, OnInit, Input, Output, EventEmitter , ViewChild, ElementRef} from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { TipoAlimentoService } from '../../../services/tipoAlimento.service';
import { UnidadMedidaService } from '../../../services/unidadMedida.service';
import { AlimentoService }  from '../../../services/alimento.service'
import swal from 'sweetalert';


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
  value = '';

  @Input() eventEdit = new Object();
  @Output() isResult = new EventEmitter();
  @ViewChild('costoAlimento') inputElement: ElementRef;

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
    this.aliment.estado = 1;
    if(isNaN(this.aliment.costoAlimento)){
      swal("Advertencia!", "Campo costo alimento solo permite numero.", "warning");
    } else {
      this.aliment.costoAlimento = Number(this.aliment.costoAlimento);
    }        
      this.alimentoService.createAlimento(this.aliment).subscribe((result: any) => {           
        let entorno = this;
        swal("Petición correcta!","","success").then(()=>{
            entorno.aliment = new Object();
            entorno.isResult.emit(true);
        });
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



  onChange(value: string): void {
    this.updateValue(value);
  }

  // '.' at the end or only '-' in the input box.
  onBlur(): void {
    if (this.value.charAt(this.value.length - 1) === '.' || this.value === '-') {
      this.updateValue(this.value.slice(0, -1));
    }
  }

  updateValue(value: string): void {
    const reg = /^-?(0|[1-9][0-9]*)(\.[0-9]*)?$/;
    if ((!isNaN(+value) && reg.test(value)) || value === '' || value === '-') {
      this.value = value;
    }
    this.inputElement.nativeElement.value = this.value;
  }


   
}
