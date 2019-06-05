import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SalaryService } from '../../services/salary.service';

@Component({
  selector: 'app-salary',
  templateUrl: './salary.component.html',
  styleUrls: ['./salary.component.css']
})
export class SalaryComponent implements OnInit {

  resData = [];
  isModalVisible = false;

  numTable: number;
  isSaveVisible = true;
  dataSave = [];
  dataEdit: any = new Object();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private salaryService: SalaryService) { }

  ngOnInit() {
    this.getDataSalary();
  }

  getDataSalary() {
    this.salaryService.getSalary().subscribe((data:any) => {
      this.resData = data.filter(item => item.estado == 1);   
    });
  }

  showFormCreateSalary() {
    window["domModalSalario"].isAlertVisible = false;
    window["domModalSalario"].salary = new Object();
    this.isModalVisible = true;
  }

  handleCancelTop() {
    this.isModalVisible = false;
    this.getDataSalary();
  }

  editSalary(obj: any) {
    this.dataEdit = obj;
    this.isModalVisible = true;
    window["domModalSalario"].infoEdit(this.dataEdit);
  }

  eliminarSalary(id:any){
    this.salaryService.deleteSalary(id).subscribe(result=>{
      this.getDataSalary();
    });      
}

}
