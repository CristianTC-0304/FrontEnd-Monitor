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

  validateForm: FormControl;

  validateFormModalContact: FormGroup;

  constructor(private fb: FormBuilder,        
    private vacunaService: VacunaService
  ) {
  }


  ngOnInit() {
  }

  


}
