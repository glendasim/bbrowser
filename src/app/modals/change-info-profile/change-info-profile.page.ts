import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController, NavParams } from '@ionic/angular';
import { AuthService } from 'src/app/auth.service';
import { FirestoreService } from 'src/app/firestore.service';
import { ToastService } from 'src/app/toast.service';
import firebase from 'firebase/app';

@Component({
  selector: 'app-change-info-profile',
  templateUrl: './change-info-profile.page.html',
  styleUrls: ['./change-info-profile.page.scss'],
})
export class ChangeInfoProfilePage implements OnInit {
  pageTitle = '';
  view = '';
  uid: any;

  username = '';
  email = '';
  password = '';
  password1 = '';
  constructor(
    private navParams: NavParams,
    private auth: AuthService,
    private modalCtrl: ModalController,
    private toast: ToastService,
    private fire: FirestoreService,
    private alertController: AlertController
  ) {
    this.view = this.navParams.get('view');
    this.auth
      .getAuthState()
      .then((e) => {
        this.uid = e;
      })
      .catch((e) => {
        this.toast.presentToast('Something went wrong');
      });
    if (this.view === 'username') {
      this.pageTitle = 'Edit Username';
    }
    if (this.view === 'email') {
      this.pageTitle = 'Edit Email';
    }
    if (this.view === 'password') {
      this.pageTitle = 'Edit Password';
    }
  }

  ngOnInit() {}

  submit() {
    if (this.view === 'username') {
      this.fire
        .updateUsername(this.uid, this.username)
        .then((e) => {
          this.toast.presentToast('Username updated successfully!');
          this.modalCtrl.dismiss();
        })
        .catch((e) => {
          this.toast.presentToast('Something went wrong!');
        });
    }

    if (this.view === 'email') {
      this.uid
        .updateEmail(this.email)
        .then((e) => {
          let msg = 'Email has been updated, please verify your email';
          this.toast.presentToast(msg);
          this.modalCtrl.dismiss();
        })
        .catch((e) => {
          console.log(e);
          if (e.code == 'auth/requires-recent-login') {
            this.presentAlertPrompt();
          } else {
            this.toast.presentToast(e.message);
            // this.toast.errorToast(null);
          }
        });
    }

    if (this.view === 'password') {
      if (this.password.length < 7 || this.password1.length < 7) {
        this.toast.presentToast('Password cannot be less than 7 characters!');
      } else if (this.password.trim() !== this.password1) {
        this.toast.presentToast('Passwords does not match!');
      } else {
        this.uid
          .updatePassword(this.password)
          .then(() => {
            let msg = 'New password has been updated!';
            this.toast.presentToast(msg);

            this.modalCtrl.dismiss();
            // Update successful.
          })
          .catch((e) => {
            if (e.code == 'auth/requires-recent-login') {
              this.presentAlertPrompt();
            } else {
              this.toast.presentToast(e.message);
            }
          });
      }
    }
  }

  exitModal() {
    this.modalCtrl.dismiss();
  }

  // CREDENTIAL PW PROMPT
  async presentAlertPrompt() {
    let msg1 = 'Please enter password to confirm';
    let msg2 = 'Please enter old password to confirm';

    var custom = msg1;
    if (this.view == 'password') {
      custom = msg2;
    }

    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: custom,
      inputs: [
        {
          name: 'password',
          type: 'password',
          placeholder: 'Please enter your password',
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          },
        },
        {
          text: 'Confirm',
          handler: (data) => {
            console.log(data);
            if (this.view == 'email') {
              const credential = firebase.auth.EmailAuthProvider.credential(
                this.uid.email,
                data.password
              );
              this.uid
                .reauthenticateWithCredential(credential)
                .then((s) => {
                  // requires some time to re-authenticate...1 sec
                  console.log(s);
                  setTimeout(() => {
                    this.submit();
                  }, 1000);
                })
                .catch((e) => {
                  console.log(e);
                  this.toast.presentToast('Something went wrong');
                });
            }

            if (this.view == 'password') {
              const credential = firebase.auth.EmailAuthProvider.credential(
                this.uid.email,
                data.password
              );
              this.uid
                .reauthenticateWithCredential(credential)
                .then((s) => {
                  // requires some time to re-authenticate...1 sec
                  console.log(s);
                  setTimeout(() => {
                    this.submit();
                  }, 1000);
                })
                .catch((e) => {
                  console.log(e);
                  this.toast.presentToast('Something went wrong');
                });
            }
          },
        },
      ],
    });
    await alert.present();
  }
}
