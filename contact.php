<!DOCTYPE html>
<html lang="fr">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <!-- ✅ Titre optimisé pour le SEO -->
    <title>Fleurs Story - Formulaire de contact</title>
    <meta name="robots" content="noindex, nofollow">

    <!-- ✅ Meta Description (importante pour le SEO) -->
    <meta name="description" content="Fleurs Story | Formulaire de contact">
    <!-- ✅ Favicon -->
    <link rel="icon" type="image/png" href="/favicon-96x96.png" sizes="96x96" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <link rel="shortcut icon" href="/favicon.ico" />
    <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
    <meta name="apple-mobile-web-app-title" content="MyWebSite" />
    <link rel="manifest" href="/site.webmanifest" />
    <link rel="canonical" href="https://www.fleurs-story.fr/contact.php" />


    <link rel="stylesheet" href="/style/index.min.css" media="print" onload="this.onload=null;this.media='all';">
</head>


<body>
    <header>
        <div class="navbar">
            <div class="navbar-li">
                <nav>
                    <ul class="nav-links" id="nav-main-links">
                        <li><a class='lien' href="/"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#999" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                                    <polyline points="9 22 9 12 15 12 15 22"></polyline>
                                </svg>
                            </a></li>
                        <li><a class="lien" href="/prestations.html">Prestations</a></li>
                        <li><a class="lien" href="/realisations.html">Réalisations</a></li>
                    </ul>
                </nav>
            </div>
            <div class="contact">
                <ul class="nav-links" id="nav-contact-links">
                    <li><a class="lien active" href="#">Contact</a></li>
                </ul>
            </div>
            <div class="burger-menu" id="burger-menu">
                <span></span>
                <span></span>
                <span></span>
            </div>
        </div>
        <div class="logo-img">
            <img src="/Images/logo_svg.png" alt="Fleurs Story">
        </div>
    </header>
    <div class="container-contact">
        <?php
        if ($_SERVER['REQUEST_METHOD'] === 'POST') {
            // Vérification Honeypot (champ caché pour piéger les robots)
            if (!empty($_POST['honeypot'])) {
                die("Spam détecté !");
            }

            // Nettoyage des entrées utilisateur
            $name = htmlspecialchars(trim($_POST['name']), ENT_QUOTES, 'UTF-8');
            $email = filter_var(trim($_POST['email']), FILTER_SANITIZE_EMAIL);
            $message = htmlspecialchars(trim($_POST['message']), ENT_QUOTES, 'UTF-8');

            // Validation des données
            $errors = [];
            if (empty($name)) {
                $errors[] = "Le nom est obligatoire.";
            }
            if (empty($email) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
                $errors[] = "Une adresse email valide est obligatoire.";
            }
            if (empty($message)) {
                $errors[] = "Le message est obligatoire.";
            }

            if (empty($errors)) {
                // Adresse email de réception
                $to = "fleurs.story@gmail.com";
                $subject = "Nouveau message de $name";

                // Sécurisation du corps de l'email
                $body = "Nom: " . htmlentities($name) . "\n";
                $body .= "Email: " . htmlentities($email) . "\n\n";
                $body .= "Message:\n" . htmlentities($message);

                // Sécurisation des en-têtes pour éviter l'injection
                $headers = "From: noreply@tonsite.com\r\n";  // Ne pas mettre l'email utilisateur ici !
                $headers .= "Reply-To: " . filter_var($email, FILTER_SANITIZE_EMAIL) . "\r\n";
                $headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

                // Envoi de l'email et gestion des erreurs
                if (mail($to, $subject, $body, $headers)) {
                    echo "<p class='success'>Votre message a été envoyé avec succès !</p>";
                } else {
                    error_log("Erreur lors de l'envoi du mail à $to");
                    echo "<p class='error'>Une erreur est survenue lors de l'envoi. Veuillez réessayer plus tard.</p>";
                }
            } else {
                foreach ($errors as $error) {
                    echo "<p class='error'>$error</p>";
                }
            }
        }
        ?>


        <form action="contact.php" method="POST" class="contact-form">
            <h1>Contactez-nous au : <a href="tel:+33491516676"> 04 91 51 66 76</a></h1>
            <p>Ou remplissez le formulaire ci-dessous pour nous envoyer un message.</p>
            <div class="form-group">
                <label for="name">Nom</label>
                <input type="text" id="name" name="name" placeholder="Votre nom" required>
            </div>

            <div class="form-group">
                <label for="email">Email</label>
                <input type="email" id="email" name="email" placeholder="Votre adresse email" required>
            </div>

            <div class="form-group">
                <label for="message">Message</label>
                <textarea id="message" name="message" placeholder="Votre message" rows="5" required></textarea>
            </div>

            <button type="submit" class="submit-btn">Envoyer</button>
        </form>

    </div>
    <div class="container-back">
        <div class="back">
            <a href="/index.html">
                <h3>Revenir à l'accueil</h3>
                <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24">
                    <path d="M0 0h24v24H0V0z" fill="none" />
                    <path d="M11 9l1.42 1.42L8.83 14H18V4h2v12H8.83l3.59 3.58L11 21l-6-6 6-6z" />
                </svg>
            </a>
        </div>
    </div>
    <footer>
        <div class="footercontainer">
            <div class="bloccontainer">
                <!-- Adresse -->
                <div class="service">
                    <h3>Services proposés :</h3>
                    <ul>
                        <ul>
                            <li>💐 <a href="#creations-florales"><strong>Créations florales sur mesure</strong></a></li>
                            <li>🌿 <a href="#plantes"><strong>Plantes d’intérieur et d’extérieur</strong></a></li>
                            <li>💍 <a href="#mariage"><strong>Fleurs pour mariages</strong></a></li>
                            <li>🕊️ <a href="#deuil"><strong>Compositions pour le deuil</strong></a></li>
                            <li>🎉 <a href="#evenements"><strong>Fleurs pour événements</strong></a></li>
                            <li>🚚 <a href="#livraison"><strong>Livraison rapide</strong></a></li>
                            <li>🛍️ <a href="#livraison"><strong>Click & Collect</strong></a></li>
                            <li>💳 <a href="#livraison"><strong>Paiement à distance</strong></a></li>
                        </ul>

                    </ul>

                </div>
                <div class="reseausociaux">
                    <h3>Rejoignez-nous sur les réseaux sociaux</h3>
                    <div class="icons">
                        <a href="https://www.facebook.com/profile.php?id=100055470117028">
                            <img src="/Images/facebook.webp" alt="Suivez Fleurs story sur Facebook">
                        </a>
                        <a href="https://www.instagram.com/fleurs.story/">
                            <img src="/Images/instagram.webp" alt="Suivez fleurs story sur Instagram">
                        </a>
                    </div>
                </div>
                <!-- Horaires -->
                <div class="contact">
                    <h3>Horaires de la boutique :</h3>
                    <p>Ouvert du mardi au samedi de 9h à 19h30<br>
                        Et le dimanche de 9h à 13h00<br>
                        Fermé le lundi</p>

                    <div class="adresse">
                        <h3>Adresse de la boutique :</h3>
                        <p>117 Av. François Mitterrand 115,<br> 13170 Les Pennes-Mirabeau</p>
                    </div>
                </div>
            </div>

        </div>
        <div class="spacer">
            <span></span>
        </div>
        <div class="container-droits">
            <p class="droits">©2024 Fleurs story. Site créé par <a href="https://coolbrizz.github.io/MonPortfolio/">Antony Auvray</a></p>
            <a href="/mentions.html">Mentions légales</a>
        </div>


    </footer>
    <script src="/script/burger.js"></script>
</body>

</html>