import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCi-dRfcMUBLPSwj2xYcTdWmXSOYeYMfkg",
  authDomain: "personal-db-8afe4.firebaseapp.com",
  databaseURL: "https://personal-db-8afe4-default-rtdb.firebaseio.com",
  projectId: "personal-db-8afe4",
  storageBucket: "personal-db-8afe4.firebasestorage.app",
  messagingSenderId: "109171031987",
  appId: "1:109171031987:web:6a5ba3bd3a6e1f14bc55c6"
};

// Inicializamos Firebase
const app = initializeApp(firebaseConfig);

// Exportamos la base de datos para usarla en los componentes
export const db = getFirestore(app);