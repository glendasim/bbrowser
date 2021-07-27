import { AlertController } from '@ionic/angular';
import { UserService } from './../user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.page.html',
  styleUrls: ['./reviews.page.scss'],
})
export class ReviewsPage implements OnInit {
  users:any = [];

  constructor(private userService: UserService,
              private alertController: AlertController) {
                //subscribe to user service so that we can retrieve data whenever there is any changes to it
                userService.getAll().subscribe((data) => {
                  this.users = data;
                });
               }

  //Add Reviews Function
  addReview(){
    const alert = this.alertController.create({
      header: 'Enter Review: ',
      inputs:[{name: 'name', type: 'text', placeholder: 'name'},
              {name: 'reviews', type: 'text', placeholder: 'reviews'},],
      buttons: [
        {text: 'Cancel', role: 'cancel'},
        {text: 'Ok',
         handler: (alertData) => {
           //Take the data and add to the firestore
           this.userService.add(alertData.name, alertData.reviews);
         }}
      ]
    }).then(alert => alert.present());
  }

  ngOnInit() {
  }

}
