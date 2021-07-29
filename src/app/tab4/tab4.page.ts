import { Component, OnInit } from '@angular/core';
import 'firebase/auth';
import { AuthService } from '../auth.service';
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
    private fire: FirestoreService
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
}
