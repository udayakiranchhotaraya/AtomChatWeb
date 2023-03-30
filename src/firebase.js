import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyDS111G5tQSDuPVXFNoGMsw6VMyQZ7134c",
    authDomain: "chat-web-3987c.firebaseapp.com",
    projectId: "chat-web-3987c",
    storageBucket: "chat-web-3987c.appspot.com",
    databaseURL:"https://chat-web-3987c-default-rtdb.firebaseio.com/",
    messagingSenderId: "574181298708",
    appId: "1:574181298708:web:89eada80c9126cd36c0d01",
    measurementId: "G-QH5VPY8XT9"
  };

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const storage = getStorage(app);
const db = getFirestore(app);
const realTime_db = getDatabase(app);

export {auth, storage, db, realTime_db}