<img width="1440" height="900" alt="Screenshot 2025-07-11 at 12 14 18 AM" src="https://github.com/user-attachments/assets/67e61e40-0c48-4922-bb2e-d429f35f82ba" />
# 🎬 Movie Recommendation App

This is a simple web app built using **HTML, CSS, JavaScript**, and **Firebase**. It helps users find movies based on genre or by searching a title, and lets them save favorites to Firebase Firestore.

## 🔍 Features
- Search movies by title using TMDB API
- Get recommendations by genre
- Save favorite movies to Firebase
- Responsive design
  
Add Firebase Configuration
const firebaseConfig = {
  apiKey: "YOUR_FIREBASE_API_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_BUCKET",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

dd TMDB API Key
const apiKey = "YOUR_TMDB_API_KEY";

## 🚀 Run Locally

1. Clone the repo:
   ```bash
   git clone https://github.com/Sankalp19y/Movie-recommendation-system.git
   cd Movie-recommendation-system
