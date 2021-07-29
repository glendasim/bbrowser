import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { AuthService } from 'src/app/auth.service';
import { FirestoreService } from 'src/app/firestore.service';
import { ToastService } from 'src/app/toast.service';

@Component({
  selector: 'app-review',
  templateUrl: './review.page.html',
  styleUrls: ['./review.page.scss'],
})
export class ReviewPage implements OnInit {
  user
  reviewWord = ""

  bookId;
  reviewId;
  reviewEdit = ""
  isEdit = false

  constructor(public modal: ModalController,
              private toast: ToastService,
              private navParams: NavParams,
              private fire: FirestoreService,
              private auth: AuthService,

            ) { 
              
              this.bookId = this.navParams.get('bookId')

              if (this.navParams.get('review') != '') {
                this.reviewWord = this.navParams.get('review')
                this.reviewId = this.navParams.get('reviewId')
              }
              
              this.isEdit = this.navParams.get('isEdit')

              this.auth.getAuthInfo().then(e => {
                this.fire.getUserProf(e).subscribe(e => {
                  this.user = e
                })
              })
            }

  ngOnInit() {
  }

  async close() {
    this.modal.dismiss();
  }

  review(event) {
    console.log(event)
    // this.reviewWord = event.srcElement.value.trim()
    
  }

  submit() {
    console.log(this.bookId)
    if (this.reviewWord != "") {
      // send back review words
      this.fire.submitReview(this.bookId, this.reviewWord, this.user, this.user.username).then(e => {
        this.toast.presentToast("Succesfully submit review!")
        this.modal.dismiss()
      }).catch(e => {
        this.toast.presentToast("Something went wrong! Please try again")
      })
      
    } else {
      this.toast.presentToast("Review cannot be empty!")
    }
    
  }

  saveReview() {
    console.log(this.reviewWord)
    if (this.reviewWord != "") {
      this.fire.updateReview(this.reviewId, this.reviewWord).then(e => {
        this.modal.dismiss()
      })
    } else {
      this.toast.presentToast("Review cannot be empty!")
    }
  }
} 
