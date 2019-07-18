import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-registro',
  templateUrl: './create-registro.component.html',
  styleUrls: ['./create-registro.component.css']
})
export class CreateRegistroComponent implements OnInit {

  costoAvicola: any = new Object();

  constructor() { }

  ngOnInit() {
  }

}
