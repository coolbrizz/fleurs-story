document.addEventListener("DOMContentLoaded", function () {
  const burgerMenu = document.getElementById("burger-menu");
  const navMainLinks = document.getElementById("nav-main-links");
  const navContactLinks = document.getElementById("nav-contact-links");

  burgerMenu.addEventListener("click", function () {
    navMainLinks.classList.toggle("active");
    navContactLinks.classList.toggle("active");
    burgerMenu.classList.toggle("active");
  });
});
document.addEventListener("DOMContentLoaded", function () {
  const targetId = window.location.hash.substring(1);
  if (targetId) {
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      setTimeout(() => {
        window.scrollTo({
          top: targetElement.offsetTop - 80 /* Ajuste selon le header */,
          behavior: "smooth",
        });
      }, 100); // Petit délai pour garantir le bon positionnement
    }
  }
});
