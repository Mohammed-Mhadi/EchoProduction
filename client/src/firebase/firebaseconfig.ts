// firebase.js
import { initializeApp } from "firebase/app";
import { getAuth , GoogleAuthProvider } from "firebase/auth";

// Your Firebase configuration object (get this from your Firebase project settings)
const firebaseConfig = {
  apiKey: 'AIzaSyCNxXsJErgLNg1QHRAKx5EulzkBedhLmcI',
  authDomain: 'echo-b93c4.firebaseapp.com',
  projectId: 'echo-b93c4',
  storageBucket: 'echo-b93c4.appspot.com',
  messagingSenderId: '331418520612',
  appId: '1:331418520612:web:e787be86282b61387ddcb1',
  measurementId: 'G-NYNMCXJVSB'
};

// Initialize Firebase app
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and export it
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export { auth , googleProvider};
export default app;
