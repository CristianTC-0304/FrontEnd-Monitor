import { Component, OnInit, Input, Output } from '@angular/core';
import { EventEmitter } from 'protractor';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { SalaryService } from '../../../services/salary.service';

@Component({
  selector: 'app-createsalary',
  templateUrl: './createsalary.component.html',
  styleUrls: ['./createsalary.component.css']
})
export class CreatesalaryComponent implements OnInit {

  salary: object = {};

  constructor(
    private salaryService: SalaryService) { }

  ngOnInit() {
  }

  saveSalary(){
    this.salaryService.createSalary(this.salary).subscribe(result => {
        console.log("Se hizo la petición: ", result);
    });
}


}
