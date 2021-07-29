import { Component, OnInit, OnDestroy } from '@angular/core';
import { NavigationEnd, ResolveEnd, Router } from '@angular/router';
import { NavController, Platform } from '@ionic/angular';
import { AuthService } from '../auth.service';
import { FirestoreService } from '../firestore.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
})
export class Tab3Page {
  user;
  listBooks = [];

  routerSubs;
  constructor(
    private fireData: FirestoreService,
    private auth: AuthService,
    private plt: Platform,
    private navCtrl: NavController,
    private route: Router
  ) {
    
  }
  routerWatch() {
    this.routerSubs = this.route.events.subscribe((event: ResolveEnd) => {
      if (event.url === '/tabs/tab3' ) {
        if (event instanceof NavigationEnd) {
          this.getFavList()
          console.log('back')
        }
      }
    });
  }


  ionViewDidEnter() {
    this.getFavList()
    this.routerWatch()
  }

  getFavList() {
    this.auth.getAuthState().then((e) => {
      this.fireData.getUserFav(e).subscribe((e: any) => {
        let data = e.data().favourites;
        console.log(e.data().favourites);
        if (data.length > 0) {
          this.fireData.getFavsList(data).subscribe((e) => {
            this.listBooks = e;
          })
        } else {
          this.listBooks = []
        }
      })
    });
  }
  ionViewDidLeave() {
    console.log('left')
    this.routerSubs.unsubscribe();
  }

  ionPageWillLeave() {
    this.routerSubs.unsubscribe();
  }
}
