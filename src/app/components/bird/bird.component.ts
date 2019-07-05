import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BirdService } from '../../services/bird.service';

@Component({
  selector: 'app-bird',
  templateUrl: './bird.component.html',
  styleUrls: ['./bird.component.css']
})
export class BirdComponent implements OnInit {

  
  resData = [];
  isModalVisible = false;

  numTable: number;
  isSaveVisible = true;
  dataSave = [];
  dataEdit: any = new Object();
  
  constructor(private route: ActivatedRoute,
    private router: Router, private birdService: BirdService) { }

  ngOnInit() {
this.getDataBird();
  }

  getDataBird() {
    this.birdService.getBird().subscribe((data: any) => {
      this.resData = data.filter(item => item.estado == 1);
    });
  }

}
