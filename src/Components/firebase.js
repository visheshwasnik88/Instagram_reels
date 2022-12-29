import firebase from 'firebase/compat/app'
import  'firebase/compat/auth'
import  'firebase/compat/storage'
import  'firebase/compat/firestore'
import {firebaseConfig} from '../secret'



  firebase.initializeApp(firebaseConfig)

  export const auth=firebase.auth();

  const firestore=firebase.firestore();

  export const database={
    //collections
    users: firestore.collection('users'),
    posts: firestore.collection('posts'),
    comments:firestore.collection('comments'),
    getTimeStamp:firebase.firestore.FieldValue.serverTimestamp
  }
  export const storage=firebase.storage()
