import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { ToastService } from './toast.service';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private fireAuth: AngularFireAuth,
    private toastController: ToastController,
    private router: Router,
    private toast: ToastService,
    private fire: AngularFirestore
  ) {}

  //CREATE REGISTER FUNC
  register(username, email, password) {
    return this.fireAuth
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        this.toast.presentToast("Successfully registered!")
        this.router.navigate(['//tabs/tab1']);
        this.fireAuth.onAuthStateChanged(e => {
          this.updateUsername(e, username)
        })
      })
      .catch((error) => {
        console.log(error)
      });
  }

  // Create Login Function
  login(email, password) {
    return this.fireAuth
      .signInWithEmailAndPassword(email, password)
      .then((user) => {
        console.log(user)
        //If user is login, navigate to home page
        if (user) {
          this.toast.presentToast("Login Successfully!")
          this.router.navigate(['/tabs/tab1']);
        }
      })
      .catch((error) => {});
  }

  //Create Logout Function add to app
  logout() {
    return this.fireAuth.signOut().then(() => {
      this.toast.presentToast("Sign Out Successfully!")
      this.router.navigate(['/login']);
    });
  }

  getAuthInfo() {
    return this.fireAuth.currentUser;
  }

  getAuthState() {
    return new Promise((resolve, reject) => {
      this.fireAuth.onAuthStateChanged((user) => {
        resolve(user);
      }).catch(e => {
        reject(e)
      })
    })
  }


  updateUsername(user, username) {
    return this.fire.collection('users').doc(user.uid).set({username:username})
  }
}
