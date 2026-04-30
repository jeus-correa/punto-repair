import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Reemplaza estos valores con los de tu consola de Firebase
// Firebase Console -> Configuración del proyecto -> Tus apps -> Configuración (SDK Setup)
const firebaseConfig = {
  apiKey: "AIzaSyDnDVHJ4EcjdBkk79gaj7MWxx8ggRFJJS0",
  authDomain: "contador-408d2.firebaseapp.com",
  projectId: "contador-408d2",
  storageBucket: "contador-408d2.firebasestorage.app",
  messagingSenderId: "270464020413",
  appId: "1:270464020413:web:6695cbf6428029d3926cd4",
  measurementId: "G-2X15XQ2B9F"
};
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
