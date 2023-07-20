import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyB_cphNwUB5QoP6AAx2uj9KCeCr9jAFC0s",
  authDomain: "fir-test-b0ffc.firebaseapp.com",
  projectId: "fir-test-b0ffc",
  storageBucket: "fir-test-b0ffc.appspot.com",
  messagingSenderId: "751723045736",
  appId: "1:751723045736:web:bdba2e476555c1fbdbacdd",
  measurementId: "G-ZEQ18459HE"
};
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);