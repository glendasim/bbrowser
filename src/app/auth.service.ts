import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private fireAuth: AngularFireAuth,
              private toastController: ToastController,
              private router: Router) { }

  //CREATE REGISTER FUNC
  register(email, password){
    return this.fireAuth.createUserWithEmailAndPassword(email, password)
    .then(() => {
      const toast =  this.toastController.create({
        message: 'User created!',
        duration: 3000,
        position: 'bottom'
      }).then(alert => alert.present());
      this.router.navigate(['/login']);
    }).catch((error) => {})   
  }
    
  // Create Login Function
  login(email, password)
  {
    return this.fireAuth.signInWithEmailAndPassword(email, password)
    .then((user) => {
      //If user is login, navigate to home page
      if (user) {
        const toast = this.toastController.create({
          message:'Success',
          duration: 3000,
          position: 'bottom',
        }).then(alert => alert.present());
        this.router.navigate(['/tabs/tab1']);   
      }
    }).catch((error) => {})
  }

       //Create Logout Function add to app
       logout(){
        return this.fireAuth.signOut().then(() =>
        {
          this.router.navigate(['/login']);
        })
      }

}



