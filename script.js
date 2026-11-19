const questions =[
    {texte: "Quelle est la capitale du Canada ?", choix: ["Vancouver", "Ottawa", "Toronto", "Montréal"], bonne: 1},
    {texte: "Quel langage est principalement utilisé pour structurer une page web ?", choix: ["Java", "Python", "HTML", "CSS"], bonne: 2},
    {texte: "Le Soleil est une planète.", choix: ["Vrai", "Faux"], bonne: 1},
];

const zoneQuestion = document.querySelector("#question");
const zoneReponses = document.querySelector("#reponses");
const zoneRetour = document.querySelector("#retour");

function afficher(index) {
    const q = questions[index];
    zoneQuestion.textContent = q.texte;
    zoneReponses.textContent = "";
    zoneRetour.textContent= "";
    q.choix.forEach((choix, position) => {
        const bouton = document.createElement("bouton");
        bouton.textContent = choix;
        bouton.addEventListener("click", () => repondre(q, position));
        zoneReponses.append(bouton);
    });
}

function repondre(q, position) {
    if (position === q.bonne) {
        zoneRetour.textContent = "Bonne réponse!";
    } else {
        zoneRetour.textContent = `Raté, la bonne réponse était : ${q.choix[q.bonne]}`;
    }
}

afficher(0);