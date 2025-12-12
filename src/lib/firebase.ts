
import { initializeApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics, isSupported } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyCEvNr8jf5wm5_bwCQotVJWLGrJi136YeY",
  authDomain: "bioscriptsayt.firebaseapp.com",
  projectId: "bioscriptsayt",
  storageBucket: "bioscriptsayt.appspot.com",
  messagingSenderId: "398300054604",
  appId: "1:398300054604:web:67f2c4253ce42e0c26e0e9",
  measurementId: "G-W3790RE4TD"
};


// Initialize Firebase
let app;
if (!getApps().length) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApps()[0];
}

// Initialize Analytics if supported
if (typeof window !== 'undefined') {
  isSupported().then(supported => {
    if (supported) {
      getAnalytics(app);
    }
  });
}

const db = getFirestore(app);

export { db };
