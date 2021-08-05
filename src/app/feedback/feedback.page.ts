import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.page.html',
  styleUrls: ['./feedback.page.scss'],
})
export class FeedbackPage implements OnInit {

  myForm:FormGroup;

  constructor(private formBuilder: FormBuilder, private router:Router) {
    this.myForm = formBuilder.group({
      'gender': '',
      'name': '',
      'email': '',
      'mobile': '',
      'address': '',
      'feedback': ''
    });
   }

  ngOnInit() {
  }

  summary(){
    let navigationExtras: NavigationExtras = {queryParams: {name:this.myForm.value.name}};
    this.router.navigate(['/feedback/thanks'], navigationExtras);
  }

}
