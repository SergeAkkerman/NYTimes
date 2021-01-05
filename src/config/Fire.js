import firebase from "firebase";

var firebaseConfig = {
    apiKey: "AIzaSyD5OcVgJAazB_ZdSiwnQMUwwEhrQvrF1q0",
    authDomain: "linkuptest-1c414.firebaseapp.com",
    databaseURL: "https://linkuptest-1c414-default-rtdb.firebaseio.com/",
    projectId: "linkuptest-1c414",
    storageBucket: "linkuptest-1c414.appspot.com",
    messagingSenderId: "92451929773",
    appId: "1:92451929773:web:465576a8f15dfb2e2f9024"
  };

const fire = firebase.initializeApp(firebaseConfig);
export default fire;