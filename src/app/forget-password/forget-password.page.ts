import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';





export interface sendEmail{
  email: string
} 


@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.page.html',
  styleUrls: ['./forget-password.page.scss'],
})


export class ForgetPasswordPage implements OnInit {
  passwordReset_form : FormGroup

  constructor(private formBuilder : FormBuilder, private auth: AuthService) {
    this.passwordReset_form = this.formBuilder.group({
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")
      ]))
    })
   }

  ngOnInit() {
  }
  sendEmail(val : sendEmail){
    this.auth.fireSendEmail(val).then((res)=>{
      console.log(res)
    }).catch((err)=>{
      console.log(err)
    })

  }
  get email() { return this.passwordReset_form.get('email'); }

}
