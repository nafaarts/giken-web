import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAwvZSR3UvfL8Xx4yq31K58UV6LioMkwRc",
  authDomain: "ta-ariyanti.firebaseapp.com",
  projectId: "ta-ariyanti",
  storageBucket: "ta-ariyanti.appspot.com",
  messagingSenderId: "690114522119",
  appId: "1:690114522119:web:276daec4c1e134e4f5cea2",
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };
