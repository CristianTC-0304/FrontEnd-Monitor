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

  

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private salaryService: SalaryService) { }

  ngOnInit() {
    this.getDataSalary();
  }

  getDataSalary() {
    this.salaryService.getSalary().subscribe(data => {
      this.resData = data;
    });
  }

  showFormCreateSalary() {
    this.isModalVisible = true;
  }

}
