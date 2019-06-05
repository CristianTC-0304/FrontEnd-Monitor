import { Component, OnInit, OnChanges, Output, Input, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { DocumentTypeService } from '../../../services/documentType.service';
import { DepartamentService } from '../../../services/departament.service';
import { StaffService } from '../../../services/staff.service';
import { PositionService } from '../../../services/position.service';

@Component({
  selector: 'app-createstaff',
  templateUrl: './createstaff.component.html',
  styleUrls: ['./createstaff.component.css']
})
export class CreatestaffComponent implements OnInit {

  resDocumentType = [];
  resDepartament = [];
  position = [];
  staff: any = new Object();
  locations = [];
  isAlertVisible = false;

  @Input() eventSave = new EventEmitter();
  @Output() isResult = new EventEmitter();

  validateForm: FormControl;

  validateFormModalContact: FormGroup;

  constructor(private fb: FormBuilder,
    private documentTypeService: DocumentTypeService,
    private departamentService: DepartamentService,
    private staffService: StaffService,
    private positionService: PositionService
  ) {
  }

  ngOnInit() {
    this.getDocumentType();
     this.getDepartament();
     this.getPosition();
     window['domModalStaff'] = this;
  }

  locationChange(event) {
    this.resDepartament.forEach(res => {
      if (res.idDepartamento === event) {
          this.locations = res.municipioList;
          this.staff.idMunicipio = this.locations[0].municipio;
          console.log('model staff', this.staff.idMunicipio);
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

  getPosition() {
    this.positionService.getPosition().subscribe(result => {
      this.position = result;
      console.log('result position', this.position);
    });
  }

  saveStaff() {
    console.log('example data', this.staff);
      this.staffService.createStaff(this.staff).subscribe((result: any) => {
        this.isAlertVisible = true;
        let entorno = this;
          setTimeout(function () { entorno.staff = new Object();
            entorno.isResult.emit(true); }, 1000);
      });
  }

  infoEdit(dataEdit: any) {
    console.log('dataEdit', dataEdit);
    this.staff = new Object();
    this.locationChange(dataEdit.idMunicipio.departamentoId.idDepartamento);
    this.staff.idPersonal = dataEdit.idPersonal;
    this.staff.idTipoDocumento =  dataEdit.idTipoDocumento.idTipoDocumento;
    this.staff.idCargo =  dataEdit.idCargo.idCargo;
    this.staff.primerNombre =  dataEdit.primerNombre;
    this.staff.primerApellido =  dataEdit.primerApellido;
    this.staff.correoElectronico =  dataEdit.correoElectronico;
    this.staff.idDepartamento =  dataEdit.idMunicipio.departamentoId.idDepartamento;
    this.staff.documento = dataEdit.documento;
    this.staff.segundoNombre = dataEdit.segundoNombre;
    this.staff.segundoApellido = dataEdit.segundoApellido;
    this.staff.celular = dataEdit.celular;
    this.staff.idMunicipio = dataEdit.idMunicipio.dto.idMunicipio;
    this.staff.direccion = dataEdit.direccion;
    this.staff.telefono = 'sada';
    this.staff.estado = 1;
}
}
