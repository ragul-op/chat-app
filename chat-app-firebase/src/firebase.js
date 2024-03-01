import firebase from 'firebase/compat/app'
import 'firebase/compat/firestore';
import 'firebase/compat/auth';

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyDsw08tB_8-ibbS5bouOq6i2pP0ZnvHIB8",
  authDomain: "chat-app-54e33.firebaseapp.com",
  projectId: "chat-app-54e33",
  storageBucket: "chat-app-54e33.appspot.com",
  messagingSenderId: "215440634206",
  appId: "1:215440634206:web:c48ca068b7ea1548b5dfcf",
  measurementId: "G-DX6MJB8NTS"
});

const db = firebaseApp.firestore()

const auth = firebase.auth();

export{db , auth}