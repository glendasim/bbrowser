import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { FirestoreService } from '../firestore.service';
import { ToastService } from '../toast.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.page.html',
  styleUrls: ['./feedback.page.scss'],
})
export class FeedbackPage implements OnInit {

  myForm:FormGroup;

  constructor(private formBuilder: FormBuilder, 
              private router:Router,
              private fire: FirestoreService,
              private toast: ToastService,
              private navCtrl: NavController
              ) {
    this.myForm = formBuilder.group({
      'gender': new FormControl("", Validators.required),
      'name': new FormControl("", Validators.required),
      'email': new FormControl("", Validators.compose([
        Validators.required,
        Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")
      ])),
      'mobile': new FormControl("", Validators.required),
      'address': new FormControl("", Validators.required),
      'feedback': new FormControl("", Validators.required)
    });
   }

  ngOnInit() {
  }

  summary(){
    let navigationExtras: NavigationExtras = {queryParams: {name:this.myForm.value.name}};
    this.router.navigate(['/feedback/thanks'], navigationExtras);
  }


  submit() {
    this.fire.setFeedback(this.myForm.value).then(e => {
      this.toast.presentToast("Thanks for the feedback!")
      this.navCtrl.pop()
    })
  }

}
