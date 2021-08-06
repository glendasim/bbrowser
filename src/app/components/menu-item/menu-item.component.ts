import { Component, OnInit } from '@angular/core';
import { NavController, PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-menu-item',
  templateUrl: './menu-item.component.html',
  styleUrls: ['./menu-item.component.scss'],
})
export class MenuItemComponent implements OnInit {

  constructor(private navCtrl: NavController,
              private popOver: PopoverController) { }

  ngOnInit() {}

  navEdit() {
    // this.navCtrl.navigateForward('/edit-profile')
    this.popOver.dismiss({page: '/edit-profile'})
  }
  logout() {
    this.popOver.dismiss({nav: 'logout'})
  }
  feedback() {
    this.popOver.dismiss({page: 'feedback'})
  }
}
