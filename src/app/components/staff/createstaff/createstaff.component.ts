import { Component, OnInit, OnChanges, Output, Input, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { DocumentTypeService } from '../../../services/documentType.service';
import { DepartamentService } from '../../../services/departament.service';
import { StaffService } from '../../../services/staff.service';

@Component({
  selector: 'app-createstaff',
  templateUrl: './createstaff.component.html',
  styleUrls: ['./createstaff.component.css']
})
export class CreatestaffComponent implements OnInit {

  resDocumentType = [];
  resDepartament = [];
  staff: Object = {};
  locations = [];

  @Input() eventSave = new EventEmitter();
  @Output() isSave = new EventEmitter();

  validateForm: FormControl;

  validateFormModalContact: FormGroup;

  constructor(private fb: FormBuilder,
    private documentTypeService: DocumentTypeService,
    private departamentService: DepartamentService,
    private staffService: StaffService
  ) {
  }

  ngOnInit() {
    this.getDocumentType();
     this.getDepartament();
  }

 


  locationChange(event) {
    this.resDepartament.forEach(res => {
      if (res.idDepartamento === event) {
          this.locations = res.municipioList;
          this.staff['city'] = [].push(this.locations[0].municipio);
      }
    });
  }

  getDocumentType() {
    this.documentTypeService.getDocumentType().subscribe(result => {
      this.resDocumentType = result;
      console.log('documentType', result);
    });
  }

  getDepartament() {
    this.departamentService.getDepartament().subscribe(result => {
      this.resDepartament = result;
      console.log('departamentService', result);
    });
  }

 
  saveStaff(){
      this.staffService.createStaff(this.staff).subscribe(result => {
          console.log("Se hizo la petición: ", result);
      });
  }
 

}
