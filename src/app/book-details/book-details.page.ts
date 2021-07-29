import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  ActionSheetController,
  AlertController,
  ModalController,
} from '@ionic/angular';
import * as moment from 'moment';
import { AuthService } from '../auth.service';
import { FirestoreService } from '../firestore.service';
import { ReviewPage } from '../modals/review/review.page';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.page.html',
  styleUrls: ['./book-details.page.scss'],
})
export class BookDetailsPage implements OnInit {
  user: any = {};
  id;
  book = {};

  reviews = [];

  fav = false;
  constructor(
    private route: ActivatedRoute,
    private fire: FirestoreService,
    private auth: AuthService,
    public alertController: AlertController,
    private modalController: ModalController,
    public actionSheetController: ActionSheetController
  ) {
    this.id = this.route.snapshot.paramMap.get('id');
    this.checkFavStatus();
  }

  ngOnInit() {
    this.fire.getBookDetails(this.id).subscribe((e) => {
      console.log(e.data());
      this.book = e.data();
    });

    this.fire.getReviews(this.id).subscribe((e) => {
      this.reviews = e;
      console.log(e);
    });
  }

  checkFavStatus() {
    this.auth.getAuthState().then((e) => {
      this.user = e;
      this.fire.getUserFav(e).subscribe((data: any) => {
        let find = data.data().favourites;
        
        
        if (find) {
          var found = find.find((x) => x === this.id);
          this.fav = found ? true : false;
        } else {
          console.log('dsd')
          this.fav = false;
        }
      });
    });
  }

  removeBook() {
    this.fire.unFav(this.user, this.id).then((e) => {
      console.log('successs');
      this.checkFavStatus();
    });
  }

  addBook() {
    this.fire.addFav(this.user, this.id).then((e) => {
      console.log('success');
      this.checkFavStatus();
    });
  }

  async reviewModal(review, reviewId, isEdit) {
    const modal = await this.modalController.create({
      component: ReviewPage,
      cssClass: 'my-custom-class',
      componentProps: {
        bookId: this.id,
        reviewId: reviewId,
        review: review,
        isEdit: isEdit
      },
    });

    modal.onDidDismiss().then((data: any) => {
      console.log(data);
    });

    return await modal.present();
  }

  async presentActionSheet(review, reviewId) {
    const actionSheet = await this.actionSheetController.create({
      header: 'Review Menu',
      cssClass: 'my-custom-class',
      buttons: [
        {
          text: 'Edit Review',
          icon: 'pencil',
          handler: () => {
            // go to modal for edit
            this.reviewModal(review, reviewId, true)
            console.log('edit clicked');
          },
        },
        {
          text: 'Delete Review',
          role: 'destructive',
          icon: 'trash',
          handler: () => {
            this.presentAlertConfirm(reviewId)
            console.log('Delete clicked');
          },
        },
        {
          text: 'Cancel',
          icon: 'close',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          },
        },
      ],
    });
    await actionSheet.present();

    const { role } = await actionSheet.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }


  async presentAlertConfirm(reviewId) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Confirm',
      message: 'Your review will be deleted',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Delete',
          role: 'destructive',
          handler: () => {
            // delete review api
            // console.log(reviewId)
            this.fire.deleteReview(reviewId)
            console.log('Confirm Okay');
          }
        }
      ]
    });

    await alert.present();
  }

  convertDate(date) {
    return moment(date.toDate()).startOf("seconds").fromNow()
  }
}
