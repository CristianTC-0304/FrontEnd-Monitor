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
import { StaffService } from '../../services/staff.service';
import { DocumentTypeService } from '../../services/documentType.service';
import { CreatestaffComponent } from './createstaff/createstaff.component';

@Component({
  selector: 'app-staff',
  templateUrl: './staff.component.html',
  styleUrls: ['./staff.component.css']
})
export class StaffComponent implements OnInit {

  @Output() createStaff = new EventEmitter();
  @ViewChild(CreatestaffComponent) createStaffComponent: CreatestaffComponent;

  resData = [];
  @Output() childSubmit = new EventEmitter<any>();

  numTable: number;
  isModalVisible = false;
  isSaveVisible = true;
  dataSave = [];
  dataEdit: any = new Object();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private staffServices: StaffService,
  ) {}

  ngOnInit() {
    this.getDataStaff();
  }

  getDataStaff() {
    console.log('cuantas veces entra');
    this.staffServices.getStaff().subscribe((data: any) => {
      console.log('data staff', data);
      this.resData = data.filter(item => item.estado === 1);
    });
  }

  showFormCreateStaff() {
    window['domModalStaff'].isAlertVisible = false;
    window['domModalStaff'].staff = new Object();
    this.isModalVisible = true;
  }

  saveStaff() {
    console.log("Entro");
    // this.createStaff.emit('example');
    this.childSubmit.emit();
  }

  editStaff(obj: any) {
    console.log('info Object', obj);
    this.dataEdit = obj;
    this.isModalVisible = true;
    window['domModalStaff'].infoEdit(this.dataEdit);
}

  handleCancelTop() {
    console.log('cuando entro');
    this.isModalVisible = false;
    this.getDataStaff();
  }

  deleteStaff(idStaff) {
    this.staffServices.deleteStaff(idStaff).subscribe(result => {
      this.getDataStaff();
    });
    console.log('idStaff', idStaff);
  }

}
