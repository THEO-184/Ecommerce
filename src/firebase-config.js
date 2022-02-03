import { initializeApp } from "firebase/app";
import { getFirestore, collection } from "firebase/firestore";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
	apiKey: "AIzaSyD0JhFJxa8pCzegZYAH2tZLuaFR4T7_-HE",
	authDomain: "ecommerce-bf365.firebaseapp.com",
	projectId: "ecommerce-bf365",
	storageBucket: "ecommerce-bf365.appspot.com",
	messagingSenderId: "305780442583",
	appId: "1:305780442583:web:00a36fc92df35db032f792",
};

initializeApp(firebaseConfig);
// authenticate
const auth = getAuth();
// access database
const db = getFirestore();
// access colection
const colRef = collection(db, "products");

export { colRef, auth };
export default db;
