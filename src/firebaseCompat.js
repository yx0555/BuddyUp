import firebase from 'firebase/compat/app';

const firebaseConfig = {
    apiKey: "AIzaSyA1fq8jqlhIVKQkklygiQVZreuDKWASrJc",
    authDomain: "buddyup-e927c.firebaseapp.com",
    projectId: "buddyup-e927c",
    storageBucket: "buddyup-e927c.appspot.com",
    messagingSenderId: "904223545611",
    appId: "1:904223545611:web:57687b9a3ef90bb81aea0e"
  };

firebase.initializeApp(firebaseConfig);

export default firebase;