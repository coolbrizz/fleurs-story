document.addEventListener("DOMContentLoaded", function () {
  const containers = document.querySelectorAll(
    ".bloc-container7, .bloc-container8"
  );

  if (containers.length === 0) return; // Sécurité pour éviter d'observer un élément inexistant

  const observer = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target); // Arrête l'observation après l'apparition
        }
      });
    },
    {
      threshold: 0.4, // Se déclenche lorsque 10% de l'élément est visible
    }
  );

  containers.forEach((container) => {
    observer.observe(container);
  });
});
