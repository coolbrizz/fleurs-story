// module.exports = {
//   content: ['index.html'],
//   css: ['style/index.min.css']
// }

runPurge();
const { PurgeCSS } = require('purgecss'); // Import de la bonne méthode
const fs = require('fs');
const path = require('path');

async function runPurge() {
    const purgeCSS = new PurgeCSS();

    // Contenu des fichiers HTML
    const content =['/*.html']; // Le chemin vers tes fichiers HTML
    
    // Ton fichier CSS
    const css = ['style/index.min.css']; // Le chemin vers ton fichier CSS

    // Purger le CSS en utilisant l'API
    const result = await purgeCSS.purge({
        content,
        css
    });

    // Écrire le résultat purgé dans un nouveau fichier
    fs.writeFileSync(path.join(__dirname, 'styles.cleaned.css'), result[0].css);
    console.log('CSS purgé écrit dans styles.cleaned.css');
}

runPurge();