 import firebase from 'firebase';
 
 // Your web app's Firebase configuration
 const firebaseConfig = {
    apiKey: "AIzaSyBkbhCKmhdUTdMaHfVCviFL2DY_ys4cAVA",
    authDomain: "issue-tracker-7d354.firebaseapp.com",
    databaseURL: "https://issue-tracker-7d354.firebaseio.com",
    projectId: "issue-tracker-7d354",
    storageBucket: "issue-tracker-7d354.appspot.com",
    messagingSenderId: "733294546486",
    appId: "1:733294546486:web:72d8d2710bd23b619c5297"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  export default firebase;