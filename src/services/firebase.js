import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCWnRwUxKxjkcwim_QLeWE69O0bK1xSZrE",
  authDomain: "blockcess-university.firebaseapp.com",
  projectId: "blockcess-university",
  storageBucket: "blockcess-university.firebasestorage.app",
  messagingSenderId: "560089509304",
  appId: "1:560089509304:web:aa57b7b274f6fc4fddb34d",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
