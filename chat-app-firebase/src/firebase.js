import firebase from 'firebase/compat/app'
import 'firebase/compat/firestore';
import 'firebase/compat/auth';

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyCTZMDoMWDnryGpncMl47QKcAlefKVd13A",
  authDomain: "chat-app-new-ecede.firebaseapp.com",
  projectId: "chat-app-new-ecede",
  storageBucket: "chat-app-new-ecede.appspot.com",
  messagingSenderId: "1012502477543",
  appId: "1:1012502477543:web:16247d88e99700940ac042",
  measurementId: "G-GVL6SJ2S6Z"
});

const db = firebaseApp.firestore()

const auth = firebase.auth();

export{db , auth}