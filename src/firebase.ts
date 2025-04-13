import { getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyB4NNc2fQMWmLULTxFzJnvKbiXISf6kzto",

  authDomain: "cis371-ce835.firebaseapp.com",

  projectId: "cis371-ce835",

  storageBucket: "cis371-ce835.firebasestorage.app",

  messagingSenderId: "930770370150",

  appId: "1:930770370150:web:a70754325c02c9e2e7f7a7"

};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;
