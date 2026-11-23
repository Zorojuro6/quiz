const questions =[
    {texte: "Quelle est la capitale du Canada ?", choix: ["Vancouver", "Ottawa", "Toronto", "Montréal"], bonne: 1},
    {texte: "Quel langage est principalement utilisé pour structurer une page web ?", choix: ["Java", "Python", "HTML", "CSS"], bonne: 2},
    {texte: "Le Soleil est une planète.", choix: ["Vrai", "Faux"], bonne: 1},
];

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

function terminer() {
    zoneQuestion.textContent = "Quiz terminé !";
    zoneReponses.textContent = "";
    zoneRetour.textContent = `Score : ${score} sur ${questions.length}`;
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

afficher(0);