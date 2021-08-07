import { Component, OnInit } from '@angular/core';
import { NavController, PopoverController } from '@ionic/angular';
import 'firebase/auth';
import { AuthService } from '../auth.service';
import { MenuItemComponent } from '../components/menu-item/menu-item.component';
import { FirestoreService } from '../firestore.service';



@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})
export class Tab4Page implements OnInit {

  authObj = {}
  username = ""
  constructor(
    private auth: AuthService,
    private fire: FirestoreService,
    private popoverController: PopoverController,
    private navCtrl: NavController
  ) { 

    this.auth.getAuthState().then(e => {
      this.authObj = e
      console.log('dsdsd')
      this.fire.getUserProf(e).subscribe((e : any) => {
        this.username = e.username
        console.log(e)
      })
    })
  }

  ngOnInit() {
  }

  async presentMenuItem(ev: any) {
    const popover = await this.popoverController.create({
      component: MenuItemComponent,
      cssClass: 'my-custom-class',
      event: ev,
      translucent: true
    });
    await popover.present();

    await popover.onDidDismiss().then((data:any ) => {
      let nav = data.data
      console.log(nav)
      if (nav && nav.page) {
        this.navCtrl.navigateForward(nav.page)
      } 
      if (nav && nav.nav === 'logout') {
        this.auth.logout()
      }
    })
  }
}
