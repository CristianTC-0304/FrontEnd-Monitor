import { Component, OnInit, Input, Output, EventEmitter , ViewChild} from '@angular/core';
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
  ) {}

  ngOnInit() {
    this.getDataAlimento();
  }

  getDataAlimento() {
    this.alimentoServices.getAlimento().subscribe((data : any) => {
      this.resData = data.filter(item => item.estado == 1);      
    });
  }

  showFormCreateAlimento() {
    this.isModalVisible = true;
  }

  saveEmitAlimento(event) {
    // console.log('event data', event.data);
    this.isSaveVisible = event.showButtonSave;
    this.dataSave = event.data;
    // console.log('dataSave', this.dataSave);
  }


  handleCancelTop(){           
      this.isModalVisible = false;
      this.getDataAlimento();
  }

  editAlimento(obj: any){
      this.dataEdit = obj;
      this.isModalVisible = true;       
      window["domModalAlimento"].infoEdit(this.dataEdit); 
  }

  eliminarAlimento(id:any){
      this.alimentoServices.deleteAlimento(id).subscribe(result=>{
        this.getDataAlimento();
      });      
  }

}
