import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-registro-consumos',
  templateUrl: './registro-consumos.component.html',
  styleUrls: ['./registro-consumos.component.css']
})
export class RegistroConsumosComponent implements OnInit {

  constructor(  private route: ActivatedRoute,
    private router: Router,) { }

  ngOnInit() {
  }

  showFormCreateConsumo() {
    // window['domModalStaff'].isAlertVisible = false;
    // window['domModalStaff'].staff = new Object();
    this.router.navigate(['crear-consumo']);
  }

}
