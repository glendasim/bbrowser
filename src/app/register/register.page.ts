import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from '../auth.service';
import { ToastService } from '../toast.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  myForm: FormGroup;
  username = ""
  email = ""
  password = ""
  password1 = ""
  constructor(private authService: AuthService,
            private toast: ToastService) {
    
   }

  ngOnInit() {
  }
  register(){

    console.log(this.username)
    console.log(this.email)
    console.log(this.password)


    if (this.username.trim() === "") {
      this.toast.presentToast("Username cannot be empty!")
    } else if (this.email.trim() === "") {
      this.toast.presentToast("Email cannot be empty!")
    } else if (this.password.length < 7 || this.password1.length < 7) {
      this.toast.presentToast("Password cannot be less than 7 characters!")
    } else if (this.password.trim() !== this.password1) {
      this.toast.presentToast("Passwords does not match!")
    } else {
      this.authService.register(this.username ,this.email, this.password)
    }
    // 
  }

}
