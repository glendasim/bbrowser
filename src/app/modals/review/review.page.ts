import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-review',
  templateUrl: './review.page.html',
  styleUrls: ['./review.page.scss'],
})
export class ReviewPage implements OnInit {

  constructor(public modal: ModalController) { }

  ngOnInit() {
  }

  async close() {
    this.modal.dismiss();
  }

  review(event) {
    console.log(event.srcElement.value)
  }
} 
