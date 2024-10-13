// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCWMx1FXK_xEeMz5DCCObH2K733IRClW0s",
  authDomain: "travelai-29148.firebaseapp.com",
  projectId: "travelai-29148",
  storageBucket: "travelai-29148.appspot.com",
  messagingSenderId: "293968433785",
  appId: "1:293968433785:web:2d63f7869429ed4e4afaa8",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const database = getFirestore(app);
export default database;
