import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
  AbstractControl
} from '@angular/forms';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { AlimentoService } from '../../services/alimento.service';
import { DocumentTypeService } from '../../services/documentType.service';
import { CreateAlimentoComponent } from './create-alimento/create-alimento.component';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import swal from 'sweetalert';


@Component({
  selector: 'app-alimento',
  templateUrl: './alimento.component.html',
  styleUrls: ['./alimento.component.css']
})
export class AlimentoComponent implements OnInit {

  resData = [];
  numTable: number;
  isModalVisible = false;
  isSaveVisible = true;
  dataSave = [];
  dataEdit: any = new Object();
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private alimentoServices: AlimentoService,
  ) { }

  ngOnInit() {
    this.getDataAlimento();
  }

  getDataAlimento() {
    this.alimentoServices.getAlimento().subscribe((data: any) => {
      this.resData = data.filter(item => item.estado == 1);
    });
  }

  showFormCreateAlimento() {
    // window["domModalAlimento"].isAlertVisible = false;
    window["domModalAlimento"].alimento = new Object();
    this.isModalVisible = true;
  }

  saveEmitAlimento(event) {
    this.isSaveVisible = event.showButtonSave;
    this.dataSave = event.data;
  }


  handleCancelTop() {
    this.isModalVisible = false;
    this.getDataAlimento();
  }

  editAlimento(obj: any) {
    this.dataEdit = obj;
    this.isModalVisible = true;
    window["domModalAlimento"].infoEdit(this.dataEdit);
  }

  eliminarAlimento(id: any) {

    swal({
      title: "Alerta",
      text: "¿Esta seguro de eliminar el registro?",
      icon: "warning",
      dangerMode: true,
      closeOnClickOutside: true,
      closeOnEsc: false
    }).then(willDelete => {
      if (willDelete) {
        this.alimentoServices.deleteAlimento(id).subscribe(result => {
          swal("Petición correcta!", "Se elimino correctamente", "success").then(() => {
            this.getDataAlimento();
          });
        });
      }
    });
  }

}
