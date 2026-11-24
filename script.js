let questions = [];

async function demarrer() {
    try {
        const reponse = await fetch("questions.json");
        if (!reponse.ok) {
            throw new Error(`Erreur HTTP ${reponse.status}`);
        }
        questions = await reponse.json();
        afficher(0);
    } catch(erreur) {
        zoneQuestion.textContent = "Impossible de charger les questions.";
        console.error(erreur);
    }
}

demarrer();
   
const zoneQuestion = document.querySelector("#question");
const zoneReponses = document.querySelector("#reponses");
const zoneRetour = document.querySelector("#retour");
const boutonRejouer = document.querySelector("#rejouer");
const boutonSuivant = document.querySelector("#suivant");

let indexCourant    = 0;
let score   = 0;



function afficher(index) {
    const q = questions[index];
    boutonSuivant.hidden    = true;
    zoneQuestion.textContent    = `Question ${index + 1} sur ${questions.length} : ${q.texte}`;
    zoneReponses.textContent    = "";
    zoneRetour.textContent      = "";
    q.choix.forEach((choix, position) => {
        const bouton = document.createElement("button");
        bouton.textContent = choix;
        bouton.addEventListener("click", () => repondre(q, position));
        zoneReponses.append(bouton);
    });
}

function repondre (q, position) {
    if (position === q.bonne) {
        score += 1;
        zoneRetour.textContent = "Bonne réponse !";
    } else {
        zoneRetour.textContent = `Raté, la bonne réponse était : ${q.choix[q.bonne]}`;
    }
    zoneReponses.querySelectorAll("button").forEach(b =>{
        b.disabled = true;
    });
    boutonSuivant.hidden = false;
    boutonSuivant.focus();
}

function messageFinal(score, total) {
    if(score === total) {
     return "Parfait !";
    } else if (score >= total/2) {
     return "Bien joué, tu peux encore progresser.";
    } else {
     return "Relis tes notes et réessaie.";
    }
}

function terminer() {
    zoneQuestion.textContent = "Quiz terminé !";
    zoneReponses.textContent = "";
    zoneRetour.textContent = `Score : ${score} sur ${questions.length}. ${messageFinal(score, questions.length)}`;
    boutonSuivant.hidden = true;
    boutonRejouer.hidden = false;
    boutonRejouer.focus();
}

boutonSuivant.addEventListener("click",() => {
    indexCourant += 1;
    if (indexCourant < questions.length) {
        afficher(indexCourant);
    } else {
        terminer();
    }
});

boutonRejouer.addEventListener("click", () => {
    score = 0;
    indexCourant = 0;
    boutonRejouer.hidden = true;
    afficher(0);
});

