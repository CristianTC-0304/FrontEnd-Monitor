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

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private staffServices: StaffService,
  ) {}

  ngOnInit() {
    this.getDataStaff();
  }

  getDataStaff() {
    this.staffServices.getStaff().subscribe(data => {
      this.resData = data;
    });
  }

  showFormCreateStaff() {
    this.isModalVisible = true;
  }

  saveEmitStaff(event) {
    console.log('event data', event.data);
    this.isSaveVisible = event.showButtonSave;
    this.dataSave = event.data;
    console.log('dataSave', this.dataSave);
  }

  saveStaff() {
    console.log("Entro");
    // this.createStaff.emit('example');
    this.childSubmit.emit();
  }

}
