import firebase from 'firebase/app';
import "firebase/storage";



  const firebaseConfig = {
    apiKey: "AIzaSyCV4yKQyIv00nIsDSoDC5A3Jzw5atWUX2M",
    authDomain: "proyectofinciclo-f8090.firebaseapp.com",
    projectId: "proyectofinciclo-f8090",
    storageBucket: "proyectofinciclo-f8090.appspot.com",
    messagingSenderId: "983441762434",
    appId: "1:983441762434:web:5c3da67168262dd1d92c9b",
    measurementId: "G-RWD4JTGQ97"
  };
  // Initialize Firebase
firebase.initializeApp(firebaseConfig);
 
  const storage =  firebase.storage();
  
  export {storage, firebase as default}

  