import { Component } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(
    private menuController: MenuController,
    private authService: AuthService
  ) {
    this.authService.getAuthInfo().then(e => {
      console.log(e)
    })
  }
  


  close() {
    this.menuController.close('main');
  }

  //User the auth service logout function
  userLogout() {
    return this.authService.logout().then(e => {
      this.close()
    });
  }
}
