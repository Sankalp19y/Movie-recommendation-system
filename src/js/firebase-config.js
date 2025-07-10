const firebaseConfig = {
    apiKey: "AIzaSyDnAmfkFdAAGE9DRYSWQvjAet-YyiGJuiE",
    authDomain: "movie-recommendation-dbec3.firebaseapp.com",
    projectId: "movie-recommendation-dbec3",
    storageBucket: "movie-recommendation-dbec3.firebasestorage.app",
    messagingSenderId: "405635682601",
    appId: "1:405635682601:web:f02032996988ca3ea0a738"
  };
  
  firebase.initializeApp(firebaseConfig);
  const db = firebase.firestore();
  