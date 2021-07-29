import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertController, ModalController } from '@ionic/angular';
import { AuthService } from '../auth.service';
import { FirestoreService } from '../firestore.service';
import { ReviewPage } from '../modals/review/review.page';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.page.html',
  styleUrls: ['./book-details.page.scss'],
})
export class BookDetailsPage implements OnInit {
  user: any = {}
  id;
  book = {}

  fav = false
  constructor(private route: ActivatedRoute,
              private fire: FirestoreService,
              private auth: AuthService,
              public alertController: AlertController,
              private modalController: ModalController) { 

    this.id = this.route.snapshot.paramMap.get('id');
    this.checkFavStatus()
  }

  ngOnInit() {
    this.fire.getBookDetails(this.id).subscribe(e => {
      console.log(e.data())
      this.book = e.data()
    })
  }

  checkFavStatus() {
    this.auth.getAuthState().then(e => {
      this.user = e
      this.fire.getUserProf(e).subscribe((data: any) => {
        let find = data.data().favourites
        var found = find.find(x => x === this.id)
        if (found) {
          this.fav = true
        } else {
          this.fav = false
        }
      })
    })
  }

  removeBook() {
    this.fire.unFav(this.user, this.id).then(e => {
      console.log('successs')
      this.checkFavStatus()
    })
  }


  addBook() {
    this.fire.addFav(this.user, this.id).then(e => {
      console.log('success')
      this.checkFavStatus()
    })
  }


  async reviewModal() {
    const modal = await this.modalController.create({
      component: ReviewPage,
      cssClass: 'my-custom-class',
      componentProps: {
        bookId: this.id
      }
    });

    modal.onDidDismiss()
      .then((data: any) => {
        console.log(data)
      })

    return await modal.present();
  }
  
}
