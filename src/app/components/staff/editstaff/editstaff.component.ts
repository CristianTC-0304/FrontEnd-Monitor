import { Component, ElementRef, OnInit, OnChanges, Output, Input, ViewChild, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import swal from 'sweetalert';
import { StaffService } from 'src/app/services/staff.service';
import { DepartamentService } from 'src/app/services/departament.service';
import { DocumentTypeService } from 'src/app/services/documentType.service';
import { PositionService } from 'src/app/services/position.service';

@Component({
    selector: 'app-editstaff',
    templateUrl: './editstaff.component.html',
    styleUrls: ['./editstaff.component.css']
})
export class EditStaffComponent implements OnInit {
    staff: any = new Object();
    resDocumentType = [];
    resDepartament = [];
    position = [];
    locations = [];
    valueDocumento = '';
    valueTelefono = '';
    valueCelular = '';
    title = 'Este campo es numerico';
    id: string;

    @ViewChild('telefono') inputElement: ElementRef;
    @ViewChild('documento') documentoElement: ElementRef;
    @ViewChild('celular') celularElement: ElementRef;

    constructor(private route: ActivatedRoute,
        private router: Router,
        private staffServices: StaffService,
        private documentTypeService: DocumentTypeService,
        private departamentService: DepartamentService,
        private positionService: PositionService,
    ) { }

    ngOnInit() {
        this.getData();
        this.getDocumentType();
        this.getPosition();
    }

    validateInputNumeric(value): void {
        console.log('isValue', value)
        const reg = /^-?(0|[1-9][0-9]*)(\.[0-9]*)?$/;
        if ((!isNaN(+value) && reg.test(value)) || value === '' || value === '-') {

        }
        //this.inputElement.nativeElement.value = this.staff.documento;
    }

    getData() {
        this.route.params.subscribe(params => {
            this.id = params['id'];
            this.staffServices.getStaffId(params['id']).subscribe(result => {
                this.staff = result;
                this.staff.idTipoDocumento = result.idTipoDocumento['idTipoDocumento'];
                this.staff.idDepartamento = result.idMunicipio['departamentoId'].idDepartamento;
                this.staff.idMunicipio = result.idMunicipio['idMunicipio'];
                this.staff.idCargo = result.idCargo['idCargo'];
                this.getDepartament();
                this.locationChange(event)
            })
        })
    }

    getDocumentType() {
        this.documentTypeService.getDocumentType().subscribe(result => {
            this.resDocumentType = result;
        });
    }

    getDepartament() {
        this.departamentService.getDepartament().subscribe(result => {
            this.resDepartament = result;
            result.forEach(res => {
                this.locations = res.municipioList
            })
        });
    }

    getPosition() {
        this.positionService.getPosition().subscribe(result => {
            this.position = result;
        });
    }

    locationChange(event) {
        this.resDepartament.forEach(res => {
            if (res.idDepartamento === event) {
                this.locations = res.municipioList;
                this.staff.idMunicipio = this.locations[0].municipio;
            }
        });
    }

    updateStaff(staff) {
        this.staffServices.updateStaff(this.staff).subscribe(result => {
            let entorno = this;
            swal("Petición correcta!", "", "success").then(() => {
              entorno.staff = new Object();
              this.router.navigate(['personal']);
            });
        })
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
        const reg = /^([1-9][0-9]*)|0$/;
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