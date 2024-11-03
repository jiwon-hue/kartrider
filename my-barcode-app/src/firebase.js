// firebase.js
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase } from "firebase/database";

// Firebase 프로젝트 설정 정보
const firebaseConfig = {
  apiKey: "AIzaSyClYaPYlZtcakGPeJ7hpDjtYjrd96aN2rg",
  authDomain: "test1-cae81.firebaseapp.com",
  projectId: "test1-cae81",
  storageBucket: "test1-cae81.firebasestorage.app",
  messagingSenderId: "912000676839",
  appId: "1:912000676839:web:280dede8c42bf04f9fc342",
  measurementId: "G-C5DVQQ9Y2Y"
};


// Firebase 초기화
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app); // Analytics 초기화
const db = getDatabase(app); // Realtime Database 초기화

export { db, analytics };