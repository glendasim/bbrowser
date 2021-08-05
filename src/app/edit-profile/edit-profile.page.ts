import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ChangeInfoProfilePage } from '../modals/change-info-profile/change-info-profile.page';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.page.html',
  styleUrls: ['./edit-profile.page.scss'],
})
export class EditProfilePage implements OnInit {

  constructor(private modalCtrl: ModalController ) { }

  ngOnInit() {
  }


  async editModal(edit_type) {
    const modal = await this.modalCtrl.create({
      component: ChangeInfoProfilePage,
      cssClass: 'my-custom-class',
      componentProps: {
        view: edit_type
      },
    });

    modal.onDidDismiss().then((data: any) => {
      console.log(data);
    });

    return await modal.present();
  }
}
