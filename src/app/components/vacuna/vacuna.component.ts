import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
  AbstractControl
} from '@angular/forms';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { VacunaService } from '../../services/vacuna.service';
import swal from 'sweetalert';

// let vacunaList;

@Component({
  selector: 'app-vacuna',
  templateUrl: './vacuna.component.html',
  styleUrls: ['./vacuna.component.css']
})
export class VacunaComponent implements OnInit {

  resData = [];

  numTable: number;
  isModalVisible = false;
  isSaveVisible = true;
  dataSave = [];
  dataEdit: any = new Object();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private vacunaServices: VacunaService,
  ) { }

  ngOnInit() {
    this.getDataVacuna();
    // window["vacunaLista"] = this;
  }

  getDataVacuna() {
    this.vacunaServices.getVacuna().subscribe((data: any) => {
      console.log('result vacuna', data)
      this.resData = data
    });
  }

  showFormCreateVacuna() {
    this.router.navigate(['crear-vacuna'])
  }

  saveEmitVacuna(event) {
    this.isSaveVisible = event.showButtonSave;
    this.dataSave = event.data;
  }


  handleCancelTop() {
    this.isModalVisible = false;
    this.getDataVacuna();
  }

  editVacuna(obj: any) {
    this.dataEdit = obj;
    this.isModalVisible = true;
    window["domModalVacuna"].infoEdit(this.dataEdit);
  }

  eliminarVacuna(id: any) {

    swal({
      title: "Alerta",
      text: "¿Esta seguro de eliminar el registro?",
      icon: "warning",
      dangerMode: true,
      closeOnClickOutside: true,
      closeOnEsc: false
    }).then(willDelete => {
        if (willDelete) {
          this.vacunaServices.deleteVacuna(id).subscribe(result => {
            swal("Petición correcta!", "Se elimino correctamente", "success").then(() => {
              this.getDataVacuna();
            });
          });
        }
      });
  }




}
