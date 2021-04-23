import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyBoZcwZl68MzW5u5dt6rEKW9p0ZO0weyYM",
    authDomain: "disneyplus-ee44f.firebaseapp.com",
    projectId: "disneyplus-ee44f",
    storageBucket: "disneyplus-ee44f.appspot.com",
    messagingSenderId: "736887154746",
    appId: "1:736887154746:web:40e8489280b9fe32f1ed03",
    measurementId: "G-P6GW2YDF14"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();
const storage = firebase.storage();

export { auth, provider, storage };
export default db;
