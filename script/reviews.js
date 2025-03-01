let currentIndex = 0;
let interval;

// Fonction pour récupérer les avis depuis le backend PHP
async function fetchGoogleReviews() {
  try {
    const response = await fetch("https://fleurs-story.fr/get_reviews.php"); // Mets l'URL correcte
    const data = await response.json();
    return data.reviews || [];
  } catch (error) {
    console.error("Erreur lors de la récupération des avis:", error);
    return [];
  }
}

// Fonction pour afficher les étoiles en fonction de la note
function getStarRating(rating) {
  return "⭐".repeat(Math.round(rating)); // Arrondi et répète les étoiles
}

// Fonction pour afficher tous les avis (si pas en carrousel)
function displayReviews(reviews) {
  const container = document.getElementById("review-content");
  if (!container || !reviews.length) return;

  // Trier les avis par date (du plus récent au plus ancien)
  reviews.sort((a, b) => b.time - a.time);

  let html = reviews
    .map(
      (review) => `
    <div class="review">
      <div class="profil-reviews">
        <img src="${review.profile_photo_url}" alt="Photo de ${
        review.author_name
      }">
        <p><strong>${review.author_name}</strong></p>
      </div>
      <div class="text-reviews">
        <div class="rating">${getStarRating(review.rating)} - ${
        review.relative_time_description
      }</div>
        <p class="reviews-text">"${review.text}"</p>
      </div>
    </div>
  `
    )
    .join("");

  container.innerHTML = html;

  // Démarrer le carrousel
  startAutoSlide(reviews);
}

// Fonction pour afficher un seul avis (mode carrousel)
function displaySingleReview(reviews) {
  const container = document.getElementById("review-content");
  if (!container || !reviews.length) return;

  const review = reviews[currentIndex];
  container.innerHTML = `
      <div class="profil-reviews">
        <img src="${review.profile_photo_url}" alt="Photo de ${
    review.author_name
  }">
        <p><strong>${review.author_name}</strong></p>
      </div>
      <div class="text-reviews">
        <div class="rating">${getStarRating(review.rating)} - ${
    review.relative_time_description
  }
        </div>
        <p class="reviews-text">"${review.text}"</p>
      </div>
  `;
}

// Fonction pour passer à l'avis suivant
function nextReview(reviews) {
  currentIndex = (currentIndex + 1) % reviews.length;
  displaySingleReview(reviews);
  restartAutoSlide(reviews);
}

// Fonction pour revenir à l'avis précédent
function prevReview(reviews) {
  currentIndex = (currentIndex - 1 + reviews.length) % reviews.length;
  displaySingleReview(reviews);
  restartAutoSlide(reviews);
}

// Fonction pour démarrer le carrousel automatique
function startAutoSlide(reviews) {
  clearInterval(interval);
  interval = setInterval(() => nextReview(reviews), 10000);
}

// Fonction pour redémarrer le carrousel
function restartAutoSlide(reviews) {
  clearInterval(interval);
  startAutoSlide(reviews);
}

// Exécution au chargement de la page
document.addEventListener("DOMContentLoaded", async () => {
  const reviews = await fetchGoogleReviews();

  if (reviews.length > 1) {
    // Mode carrousel : affichage un par un
    displaySingleReview(reviews);

    // Ajouter les événements une seule fois
    document
      .getElementById("next-review")
      .addEventListener("click", () => nextReview(reviews));
    document
      .getElementById("prev-review")
      .addEventListener("click", () => prevReview(reviews));

    startAutoSlide(reviews);
  } else {
    // Affichage normal si un seul avis
    displayReviews(reviews);
  }
});
