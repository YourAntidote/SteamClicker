const steamButton = document.querySelector(".steam");
let argentText = document.querySelector(".money");
const gamesArr = document.querySelectorAll(".jeux");
const gamesPrixArr = document.querySelectorAll(".prix");
const paniersArr = document.querySelectorAll(".panier");
var argentEnCours = 0;
let argentOnClickNum = 0.01;
let argentOnClickText = document.getElementById('click');
let arrondissement;
let arrondissement2;

function spawnFallingGames(count) {
    for (let i = 0; i < count; i++) {
        const img = document.createElement("img");

        // Choisir une image entre 1 et 12
        const randomIndex = Math.floor(Math.random() * 12) + 1;
        img.src = `./jeux/${randomIndex}.png`;

        img.classList.add("falling-game");

        // Position horizontale aléatoire
        img.style.left = Math.random() * 100 + "vw";

        // Taille aléatoire
        const scale = 0.5 + Math.random() * 0.5;
        img.style.transform = `scale(${scale})`;

        document.body.appendChild(img); 

        // Supprimer après l’animation
        setTimeout(() => {
            img.remove();
        }, 5000);
    }
}


steamButton.addEventListener('click', function () {
    arrondissement = Math.round((argentEnCours += argentOnClickNum) * 100) / 100;
    argentText.textContent = arrondissement + "$";

    // Générer des pochettes : 1 toutes les 2$ de income (ajuste à ta guise)
    let numberOfGames = Math.floor(argentOnClickNum * 0.1);
    if (numberOfGames >= 100){
        numberOfGames = 100;
    }
    spawnFallingGames(numberOfGames);
});

gamesArr.forEach(function(jeu, index) {
    jeu.addEventListener('click', function(i) {
        if (arrondissement >= jeu.value){
            arrondissement = Math.round((argentEnCours -= jeu.value) * 100) / 100;
            argentText.textContent = arrondissement + "$";
            argentOnClickNum += parseFloat(jeu.value);
            arrondissement2 = Math.round(argentOnClickNum * 100) / 100 
            argentOnClickText.textContent = "+" + arrondissement2 + "$"


            gamesPrixArr.forEach(function(prix){
                const value = prix.textContent;
                const valueSansDollar = value.replace('$', '');
                if (jeu.value == valueSansDollar){
                    //paniersArr[index].textContent = parseInt(paniersArr[index].textContent) + 1;
                    let panier = paniersArr[index];
                    let count = parseInt(panier.textContent) || 0;
                    panier.textContent = count + 1;
                }
            });

        } else {
            argentText.classList.add("shake");
            setTimeout(() => {
                argentText.classList.remove("shake");
            }, 400); // durée de l'animation
        }
    });
});