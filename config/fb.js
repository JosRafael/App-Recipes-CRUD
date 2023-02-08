import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import Constants from 'expo-constants';

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyCL734KSiW5tG2IX41U4FhKHauehGw_YuE",
  authDomain: "fir-app-1e396.firebaseapp.com",
  projectId: "fir-app-1e396",
  storageBucket: "fir-app-1e396.appspot.com",
  messagingSenderId: "943811359229",
  appId: "1:943811359229:web:d25b86efb2805fc1056994",
  measurementId: "G-QS9W8BVLVC"
};

// initialize firebase
initializeApp(firebaseConfig);
export const database = getFirestore();
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';



if(!firebase.apps.length){
  firebase.initializeApp(firebaseConfig);
}

export { firebase };