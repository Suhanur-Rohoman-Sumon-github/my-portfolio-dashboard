import { initializeApp } from "firebase/app";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC0QZ2ss01g_XzP-D86JBoAqRGenki_Yqo",
  authDomain: "my-portfolio-1b132.firebaseapp.com",
  projectId: "my-portfolio-1b132",
  storageBucket: "my-portfolio-1b132.firebasestorage.app",
  messagingSenderId: "150321040486",
  appId: "1:150321040486:web:d4d9256a796559285a31a7"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);