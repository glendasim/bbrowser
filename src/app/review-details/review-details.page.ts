import { AlertController } from '@ionic/angular';
import { UserService } from './../user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-review-details',
  templateUrl: './review-details.page.html',
  styleUrls: ['./review-details.page.scss'],
})
export class ReviewDetailsPage implements OnInit {

  user: any = {};
  myForm:FormGroup;

  constructor(private activatedRoute:ActivatedRoute,
    private userService: UserService,
    private formBuilder: FormBuilder,
    private alertController: AlertController,
    private router: Router)
     { 
       this.myForm = formBuilder.group({
         'name':'',
         'reviews': ''
       });
     }

  ngOnInit() {
     // Get the id that was passed in the URL
     let id = this.activatedRoute.snapshot.paramMap.get("id");

     //Retrieve the user information via User Service
     this.userService.getOne(id).subscribe(result => {
       this.user = result;
       this.user.id = id;
       this.myForm.controls.name.setValue(this.user.name);
       this.myForm.controls.reviews.setValue(this.user.reviews);
     });
   }
 
  // Add Update functions
  update(){
    this.userService.update(this.user.id, this.myForm.value.name, this.myForm.value.reviews);
    // Redirect to the reviews page
    this.router.navigate(['reviews']);
  }

  //Add Delete Function
  delete() {
    const alert = this.alertController.create({
      header: 'Alert!!!',
      message: 'Are you sure you want to delete the record',
      buttons: [
        {text: 'No', role: 'cancel'},
        {text: 'Yes', 
          handler: (alertData) => {
            //Delete the user via User Service
            this.userService.delete(this.user.id);
            //Redirect back to contact list
            this.router.navigate(['reviews']);
          }} 
      ]
    }).then(alert =>alert.present());
  }
} 



