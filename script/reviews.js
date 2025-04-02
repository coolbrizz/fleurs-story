let currentIndex = 0,
  interval;
async function fetchGoogleReviews() {
  try {
    let e = await fetch("https://fleurs-story.fr/get_reviews.php"),
      t = await e.json();
    return t.reviews || [];
  } catch (i) {
    return (
      console.error("Erreur lors de la r\xe9cup\xe9ration des avis:", i), []
    );
  }
}
function getStarRating(e) {
  return "⭐".repeat(Math.round(e));
}
function displayReviews(e) {
  let t = document.getElementById("review-content");
  if (!t || !e.length) return;
  e.sort((e, t) => t.time - e.time);
  let i = e
    .map(
      (e) => `
  <div class="review">
    <div class="profil-reviews">
      <img src="${e.profile_photo_url}" alt="Photo de ${e.author_name}">
      <p><strong>${e.author_name}</strong></p>
    </div>
    <div class="text-reviews">
      <div class="rating">${getStarRating(e.rating)} - ${
        e.relative_time_description
      }</div>
      <p class="reviews-text">"${e.text}"</p>
    </div>
  </div>
`
    )
    .join("");
  (t.innerHTML = i), startAutoSlide(e);
}
function displaySingleReview(e) {
  let t = document.getElementById("review-content");
  if (!t || !e.length) return;
  let i = e[currentIndex];
  t.innerHTML = `
    <div class="profil-reviews">
      <img src="${i.profile_photo_url}" alt="Photo de ${i.author_name}">
      <p><strong>${i.author_name}</strong></p>
    </div>
    <div class="text-reviews">
      <div class="rating">${getStarRating(i.rating)} - ${
    i.relative_time_description
  }
      </div>
      <p class="reviews-text">"${i.text}"</p>
    </div>
`;
}
function nextReview(e) {
  (currentIndex = (currentIndex + 1) % e.length),
    displaySingleReview(e),
    restartAutoSlide(e);
}
function prevReview(e) {
  (currentIndex = (currentIndex - 1 + e.length) % e.length),
    displaySingleReview(e),
    restartAutoSlide(e);
}
function startAutoSlide(e) {
  clearInterval(interval), (interval = setInterval(() => nextReview(e), 1e4));
}
function restartAutoSlide(e) {
  clearInterval(interval), startAutoSlide(e);
}
document.addEventListener("DOMContentLoaded", async () => {
  let e = await fetchGoogleReviews();
  e.length > 1
    ? (displaySingleReview(e),
      document
        .getElementById("next-review")
        .addEventListener("click", () => nextReview(e)),
      document
        .getElementById("prev-review")
        .addEventListener("click", () => prevReview(e)),
      startAutoSlide(e))
    : displayReviews(e);
});
