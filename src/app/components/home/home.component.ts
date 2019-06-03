import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public href = '';

  constructor() { }

  ngOnInit() {
    this.href = location.pathname;
    console.log('href', this.href);
  }
}

