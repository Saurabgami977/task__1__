import firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyDVfq5TC7P20lAQUewoUq2kpFwo3ty8NCA",
  authDomain: "task1-b643b.firebaseapp.com",
  projectId: "task1-b643b",
  storageBucket: "task1-b643b.appspot.com",
  messagingSenderId: "903236255010",
  appId: "1:903236255010:web:40a6ce448cc0387c8ab97b",
  measurementId: "G-7M60K53YLZ"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

export default db;
