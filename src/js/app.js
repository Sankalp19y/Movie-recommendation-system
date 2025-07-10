// ✅ Your TMDB API key from https://www.themoviedb.org/settings/api
const apiKey = "212e0a1b3219c7893bb01ba0514d8fe6";

// 🔸 Static list for genre-based recommendations
const movies = [
  { title: "Avengers", genre: "action" },
  { title: "John Wick", genre: "action" },
  { title: "The Hangover", genre: "comedy" },
  { title: "Superbad", genre: "comedy" },
  { title: "The Pursuit of Happyness", genre: "drama" },
  { title: "Forrest Gump", genre: "drama" },
];

// 🔹 Genre-based recommendation
function getRecommendations() {
  const selectedGenre = document.getElementById("genre").value;
  const filtered = movies.filter((movie) => movie.genre === selectedGenre);

  const container = document.getElementById("recommendations");
  container.innerHTML = "";

  if (filtered.length === 0) {
    container.innerHTML = "<p>No recommendations found.</p>";
    return;
  }

  filtered.forEach((movie) => {
    const div = document.createElement("div");
    div.className = "movie";
    div.innerHTML = `
      <p>${movie.title}</p>
      <button onclick="savePreference('${movie.title}')">Save</button>
    `;
    container.appendChild(div);
  });
}

// 🔹 Save movie to Firebase Firestore
function savePreference(title) {
  db.collection("preferences")
    .add({
      movie: title,
      timestamp: Date.now(),
    })
    .then(() => {
      alert("✅ Saved to Firebase: " + title);
      loadSavedMovies();
    })
    .catch((error) => {
      console.error("Error saving to Firebase:", error);
    });
}

// 🔹 Load saved movies from Firestore
function loadSavedMovies() {
  const container = document.getElementById("saved-movies");
  container.innerHTML = "<p>Loading...</p>";

  db.collection("preferences")
    .orderBy("timestamp", "desc")
    .get()
    .then((snapshot) => {
      container.innerHTML = "";

      if (snapshot.empty) {
        container.innerHTML = "<p>No saved movies yet.</p>";
        return;
      }

      snapshot.forEach((doc) => {
        const data = doc.data();
        const div = document.createElement("div");
        div.className = "movie";
        div.innerHTML = `<p>${data.movie}</p>`;
        container.appendChild(div);
      });
    })
    .catch((error) => {
      console.error("Error loading saved movies:", error);
      container.innerHTML = "<p>Error loading saved movies.</p>";
    });
}

// 🔹 Load saved movies on page load
window.onload = function () {
  loadSavedMovies();
};

// 🔍 Search movies using TMDB API
function searchMovies() {
  const query = document.getElementById("search-input").value.trim();
  if (!query) {
    alert("Please enter a movie title.");
    return;
  }

  const url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${encodeURIComponent(query)}`;

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      const movies = data.results.slice(0, 6);
      console.log("TMDB Search Data:", movies); // For debugging

      const container = document.getElementById("recommendations");
      container.innerHTML = "";

      if (movies.length === 0) {
        container.innerHTML = "<p>No results found.</p>";
        return;
      }

      movies.forEach((movie) => {
        const posterUrl = movie.poster_path
          ? `https://image.tmdb.org/t/p/w200${movie.poster_path}`
          : "https://via.placeholder.com/200x300?text=No+Image";

        const div = document.createElement("div");
        div.className = "movie";
        div.innerHTML = `
          <img src="${posterUrl}" alt="${movie.title}" />
          <p><strong>${movie.title}</strong></p>
          <button onclick="savePreference('${movie.title}')">Save</button>
        `;
        container.appendChild(div);
      });
    })
    .catch((error) => {
      console.error("Search failed:", error);
      alert("Search failed.");
    });
}
