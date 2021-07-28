import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(private toast: ToastController) { }

  async presentToast(msg) {
    // BASIC TOAST MSG BY PASSING MSG INSIDE
    const toast = await this.toast.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }
}
