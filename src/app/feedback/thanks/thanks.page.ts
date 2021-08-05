import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-thanks',
  templateUrl: './thanks.page.html',
  styleUrls: ['./thanks.page.scss'],
})
export class ThanksPage implements OnInit {

  name:string=""

  constructor(private activatedRoute:ActivatedRoute) {
    this.activatedRoute.queryParams.subscribe(params => {
      this.name =params.name;
    });
      
   }
  ngOnInit() {
  }

}
