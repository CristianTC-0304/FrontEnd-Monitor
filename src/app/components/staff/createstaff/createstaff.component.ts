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
  valueDocumento = '';
  valueTelefono = '';
  valueCelular = '';
  title = 'Este campo es numerico';

  @Input() dataEdit: Object;
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
    private positionService: PositionService,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.getDocumentType();
    this.getDepartament();
    this.getPosition();
  }

  getOnChangeData() {
    console.log('example message')
  }

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

      if(this.staff.idTipoDocumento != null && typeof this.staff.idTipoDocumento != "undefined" && this.staff.idTipoDocumento != ""
         && this.staff.idDepartamento != null && typeof this.staff.idDepartamento != "undefined" && this.staff.idDepartamento != ""
         && this.staff.idCargo != null && typeof this.staff.idCargo != "undefined" && this.staff.idCargo != ""
         && this.staff.idMunicipio != null && typeof this.staff.idMunicipio != "undefined" && this.staff.idMunicipio != ""){        
          this.staffService.createStaff(this.staff).subscribe((result: any) => {
            // this.isAlertVisible = true;
            // let entorno = this;
            //   setTimeout(function () { 
            //      }, 1000);
            let entorno = this;
            swal("Petición correcta!", "", "success").then(() => {
              entorno.staff = new Object();
              this.router.navigate(['personal']);
              entorno.isResult.emit(true);
            });
          });
      }      
    }
    else {
      swal("La dirección de email es incorrecta.", "", "warning").then(() => {
        this.staff.correoElectronico = "";
      });
    }

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
    if (this.valueTelefono.charAt(this.valueTelefono.length - 1) === '.' || this.valueTelefono === '-') {
      this.updateValue(this.valueTelefono.slice(0, -1));
    }
  }

  onBlurDocumento(): void {
    if (this.valueDocumento.charAt(this.valueDocumento.length - 1) === '.' || this.valueDocumento === '-') {
      this.updateValueDocumento(this.valueDocumento.slice(0, -1));
    }
  }

  onBlurCelular(): void {
    if (this.valueCelular.charAt(this.valueCelular.length - 1) === '.' || this.valueCelular === '-') {
      this.updateValueCelular(this.valueCelular.slice(0, -1));
    }
  }

  updateValue(value: string): void {
    const reg = /^-?(0|[1-9][0-9]*)(\.[0-9]*)?$/;
    if ((!isNaN(+value) && reg.test(value)) || value === '' || value === '-') {
      this.valueTelefono = value;
      this.inputElement.nativeElement.value = this.valueTelefono;
    }
    this.inputElement.nativeElement.value = this.valueTelefono;
  }

  updateValueDocumento(value: string): void {
    const reg = /^-?(0|[1-9][0-9]*)(\.[0-9]*)?$/;
    if ((!isNaN(+value) && reg.test(value)) || value === '' || value === '-') {
      this.valueDocumento = value;
      this.documentoElement.nativeElement.value = this.valueDocumento;
    }
    this.documentoElement.nativeElement.value = this.valueDocumento;
  }

  updateValueCelular(value: string): void {
    const reg = /^-?(0|[1-9][0-9]*)(\.[0-9]*)?$/;
    if ((!isNaN(+value) && reg.test(value)) || value === '' || value === '-') {
      this.valueCelular = value;
      this.celularElement.nativeElement.value = this.valueCelular;
    }
    this.celularElement.nativeElement.value = this.valueCelular;
  }

  validar_email(email) {
    var regex = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return regex.test(email) ? true : false;
  }
}
