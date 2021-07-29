import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ToastService } from './toast.service';
import firebase from "firebase/app";
@Injectable({
  providedIn: 'root',
})
export class FirestoreService {
  constructor(private fire: AngularFirestore,
              private toast: ToastService) {}

  getBooks() {
    return this.fire.collection('books').valueChanges({idField: 'bookId'})
  }


  getBookDetails(bookid) {
    return this.fire.collection('books').doc(bookid).get();
  }


  getUserProf(user) {
    return this.fire.collection('users').doc(user.uid).valueChanges({idField: 'uid'})
  }

  pushFav(arr, user) {
    return new Promise((resolve, reject) => {
      this.fire.collection('users').doc(user.uid).update({favourites: arr}).then(e => {
        // this.toast.presentToast("Successfully added book to favourite!")
        resolve(true)
      }).catch(e => {
        // this.toast.presentToast("Error occured, please try again.")
        reject(false)
      })
    })
  
  }

  async addFav(user ,key) {
    return new Promise((resolve, reject) => {
      this.getUserProf(user).subscribe((e: any) => {
        let data = e.data().favourites // get fav, return undefined or list of aray
        if (data) {
          data.push(key)
          this.pushFav(data, user).then(e => {
            this.toast.presentToast("Successfully added book to favourites!")
          })
          resolve(true)
        } else {
          this.pushFav([key], user).then(e => {
            this.toast.presentToast("Successfully added book to favourites!")
          })
          resolve(true)
        }
      })
    })
  }

  async unFav(user, key) {
    return new Promise((resolve, reject) => {
      this.getUserProf(user).subscribe((e: any) => {
        let data = e.data().favourites
        const newData = data.filter(e => {
          if (e !== key) {
            return e
          }
        })
        this.pushFav(newData, user).then(e => {
          resolve(true)
          this.toast.presentToast("Successfully removed book from favourites!")
        }).catch(e => {
          reject(false)
          this.toast.presentToast("Something went wrong!")
        })
      })
    })
  }

  
  async submitReview(bookId, review, user, username) {
    return new Promise((resolve, reject) => {
      this.fire.collection('reviews').add({
                                          comment: review,
                                          date_time: firebase.firestore.FieldValue.serverTimestamp(),
                                          id_book: bookId,
                                          user_id: user.uid,
                                          username: username
        }).then(e => {
          resolve(true)
        }).catch(e => {
          reject(false)
        })
    })
  }

}
