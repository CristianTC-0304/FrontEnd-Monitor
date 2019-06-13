import { Component, ElementRef, OnInit, OnChanges, Output, Input, ViewChild, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { DocumentTypeService } from '../../../services/documentType.service';
import { DepartamentService } from '../../../services/departament.service';
import { StaffService } from '../../../services/staff.service';
import { PositionService } from '../../../services/position.service';
import swal from 'sweetalert';

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
  value = '';
  title = 'Este campo es numerico';
  @Input() eventSave = new EventEmitter();
  @Output() isResult = new EventEmitter();
  //@ViewChild('inputElement') inputElement: ElementRef;
  @ViewChild('telefono') inputElement: ElementRef;
  @ViewChild('documento') documentoElement: ElementRef;
  @ViewChild('celular') celularElement: ElementRef;

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

  // onChange(value: string): void {
  //   this.validateInputNumeric(value);
  // }

  validateInputNumeric(value): void {
    console.log('isValue', value)
    const reg = /^-?(0|[1-9][0-9]*)(\.[0-9]*)?$/;
    if ((!isNaN(+value) && reg.test(value)) || value === '' || value === '-') {

    }
    //this.inputElement.nativeElement.value = this.staff.documento;
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
    if (this.validar_email(this.staff.correoElectronico)) {
      console.log('example data', this.staff);
      this.staffService.createStaff(this.staff).subscribe((result: any) => {
        // this.isAlertVisible = true;
        // let entorno = this;
        //   setTimeout(function () { 
        //      }, 1000);
        let entorno = this;
        swal("Petición correcta!", "", "success").then(() => {
          entorno.staff = new Object();
          entorno.isResult.emit(true);
        });
      });
    }
    else {
      swal("La dirección de email es incorrecta.", "", "warning").then(() => {
        this.staff.correoElectronico = "";
      });
    }

  }

  infoEdit(dataEdit: any) {
    console.log('dataEdit', dataEdit);
    this.staff = new Object();
    this.locationChange(dataEdit.idMunicipio.departamentoId.idDepartamento);
    this.staff.idPersonal = dataEdit.idPersonal;
    this.staff.idTipoDocumento = dataEdit.idTipoDocumento.idTipoDocumento;
    this.staff.idCargo = dataEdit.idCargo.idCargo;
    this.staff.primerNombre = dataEdit.primerNombre;
    this.staff.primerApellido = dataEdit.primerApellido;
    this.staff.correoElectronico = dataEdit.correoElectronico;
    this.staff.idDepartamento = dataEdit.idMunicipio.departamentoId.idDepartamento;
    this.staff.documento = dataEdit.documento;
    this.staff.segundoNombre = dataEdit.segundoNombre;
    this.staff.segundoApellido = dataEdit.segundoApellido;
    this.staff.celular = dataEdit.celular;
    this.staff.idMunicipio = dataEdit.idMunicipio.dto.idMunicipio;
    this.staff.direccion = dataEdit.direccion;
    this.staff.telefono = dataEdit.telefono;
    this.staff.estado = 1;
  }

  onChange(value: string): void {
    this.updateValue(value);
  }

  onChangeDocumento(value: string): void {
    this.updateValueDocumento(value);
  }

  onChangeCelular(value: string): void {
    this.updateValueCelular(value);
  }

  onBlur(): void {
    if (this.value.charAt(this.value.length - 1) === '.' || this.value === '-') {
      this.updateValue(this.value.slice(0, -1));
    }
  }

  onBlurDocumento(): void {
    if (this.value.charAt(this.value.length - 1) === '.' || this.value === '-') {
      this.updateValueDocumento(this.value.slice(0, -1));
    }
  }

  onBlurCelular(): void {
    if (this.value.charAt(this.value.length - 1) === '.' || this.value === '-') {
      this.updateValueCelular(this.value.slice(0, -1));
    }
  }

  updateValue(value: string): void {
    const reg = /^-?(0|[1-9][0-9]*)(\.[0-9]*)?$/;
    if ((!isNaN(+value) && reg.test(value)) || value === '' || value === '-') {
      this.value = value;
    }
    this.inputElement.nativeElement.value = this.value;
  }

  updateValueDocumento(value: string): void {
    const reg = /^-?(0|[1-9][0-9]*)(\.[0-9]*)?$/;
    if ((!isNaN(+value) && reg.test(value)) || value === '' || value === '-') {
      this.value = value;
    }
    this.documentoElement.nativeElement.value = this.value;
  }

  updateValueCelular(value: string): void {
    const reg = /^-?(0|[1-9][0-9]*)(\.[0-9]*)?$/;
    if ((!isNaN(+value) && reg.test(value)) || value === '' || value === '-') {
      this.value = value;
    }
    this.celularElement.nativeElement.value = this.value;
  }

  validar_email(email) {
    var regex = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return regex.test(email) ? true : false;
  }
}
