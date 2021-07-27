import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private firestore: AngularFirestore) { }

  //Create - Add user 
  add(name, reviews){
    return this.firestore.collection('users').add({name:name, reviews:reviews});
  }

  //Update User
  update(id,name, reviews){
    return this.firestore.collection('users').doc(id).update({name: name, reviews:reviews});
  }

  //Delete User
  delete(id){
    return this.firestore.collection('users').doc(id).delete();
  }

  //Retrieve All Users
  getAll(){
    return this.firestore.collection('users').valueChanges({idField: 'id'});
  }

  //Retrieve user via id
  getOne(id){
    return this.firestore.collection("users").doc(id).valueChanges();
  }

  
}
