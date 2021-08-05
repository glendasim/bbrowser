import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { FirestoreService } from '../firestore.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  userid;
  listBooks = []


  constructor(private auth: AuthService,
              private fireData: FirestoreService) {
    this.auth.getAuthState().then(e => {
      this.userid = e
    })
  }

  ngOnInit() {
    this.fireData.getBooks(true).subscribe(data => {
      console.log(data)
      this.listBooks = data;
    })

 
  }
}
