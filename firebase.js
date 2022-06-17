import firebase from 'firebase';

let firebaseConfig = {
  apiKey: "AIzaSyDW8qcDK7jouy6RncyMkt7Ts0RC-bs01SQ",
  authDomain: "books-donations.firebaseapp.com",
  databaseURL: "https://books-donations.firebaseio.com",
  projectId: "books-donations",
  storageBucket: "books-donations.appspot.com",
  messagingSenderId: "775321445283",
  appId: "1:775321445283:web:b88b7249d15d2bbc373016",
  measurementId: "G-MHEYX5MX7L"
};
// Initialize Firebase

const Firebase = firebase.initializeApp(firebaseConfig);

export default Firebase;