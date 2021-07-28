import { Component, OnInit } from '@angular/core';
import { FirestoreService } from '../firestore.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  queryText: string;

  bookRender = []
  loadedBooks = []

  constructor(private fire: FirestoreService) {}


  ngOnInit() {
    this.fire.getBooks().subscribe(data => {
      this.bookRender = data
      this.loadedBooks = data
    })
  }

  initializeItems() {
    this.bookRender = this.loadedBooks;
  }

  getItems(searchbar) {
    // Reset items back to all of the items
    this.initializeItems();

    // set q to the value of the searchbar
    var q = searchbar.srcElement.value;


    // if the value is an empty string don't filter the items
    if (!q) {
      return;
    }

    this.bookRender = this.bookRender.filter((v) => {
      if (v.author && q ) {
        if (v.author.toLowerCase().indexOf(q.toLowerCase()) > -1 || v.title.toLowerCase().indexOf(q.toLowerCase()) > -1) {
          return true;
        }
        return false;
      }
    });
    console.log(q, this.bookRender.length);
  }
}
