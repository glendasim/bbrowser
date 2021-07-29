import { Injectable } from '@angular/core';
import { LoadingController, ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  constructor(private toast: ToastController,
              public loadingController: LoadingController) { 
                
              }

  async presentToast(msg) {
    // BASIC TOAST MSG BY PASSING MSG INSIDE
    const toast = await this.toast.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }




  async presentLoading() {
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      // message: 'Please wait...',
    });
    await loading.present();
    
    console.log('Loading dismissed!');
  }


  async stopLoading() {
    this.loadingController.dismiss()
  }

}
