import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
  apiKey: "AIzaSyBKSGLB4XO_yjS26a9pJWZiL11BhnNv2Cc",
  authDomain: "cs308-team36.firebaseapp.com",
  projectId: "cs308-team36",
  storageBucket: "cs308-team36.appspot.com",
  messagingSenderId: "609439209746",
  appId: "1:609439209746:web:0aa39363371c8585377bcb"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth();
export const storage = getStorage(app);