// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB_cphNwUB5QoP6AAx2uj9KCeCr9jAFC0s",
  authDomain: "fir-test-b0ffc.firebaseapp.com",
  projectId: "fir-test-b0ffc",
  storageBucket: "fir-test-b0ffc.appspot.com",
  messagingSenderId: "751723045736",
  appId: "1:751723045736:web:bdba2e476555c1fbdbacdd",
  measurementId: "G-ZEQ18459HE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

