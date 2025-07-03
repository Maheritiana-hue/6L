const inputs = document.querySelectorAll("#inputs input");
const playBtn = document.getElementById("play");
const resetBtn = document.getElementById("reset");
const drawnText = document.getElementById("drawn");
const resultText = document.getElementById("result");
const triesText = document.getElementById("tries");

let attempts = 1; // une seule tentative
let drawnNumbers = drawNumbers(); // tirage initial

// Fonction : tirer 6 nombres aléatoires uniques entre 1 et 100
function drawNumbers() {
  const numbers = new Set();
  while (numbers.size < 6) {
    numbers.add(Math.floor(Math.random() * 50) + 1);
  }
  return Array.from(numbers).sort((a, b) => a - b);
}

// Afficher le nombre d’essais restants
function updateTries() {
  triesText.textContent = `🧮 Tentative restante : ${attempts}`;
}

// Désactiver les champs + bouton jouer
function disableInputs() {
  inputs.forEach(input => input.disabled = true);
  playBtn.style.display = "none";
  resetBtn.style.display = "inline-block";
}

playBtn.addEventListener("click", () => {
  const userNumbers = Array.from(inputs)
    .map(input => parseInt(input.value.trim()))
    .filter(n => !isNaN(n) && n >= 1 && n <= 50);

  const uniqueUserNumbers = [...new Set(userNumbers)];

  // Vérification : 6 numéros différents obligatoires
  if (uniqueUserNumbers.length !== 6) {
    alert("⚠️ Entrez exactement 6 numéros différents entre 1 et 50.");
    return;
  }

  const matches = uniqueUserNumbers.filter(n => drawnNumbers.includes(n));

  // Afficher les numéros tirés
  drawnText.textContent = `🎯 Numéros gagnants : ${drawnNumbers.join(", ")}`;

  // Affichage du résultat
  if (matches.length === 6) {
    resultText.textContent = `🏆 Incroyable ! Tu as trouvé les 6 numéros du premier coup !`;
    resultText.style.color = "blue";
  } else if (matches.length > 0) {
    resultText.textContent = `✅ Tu as trouvé ${matches.length} bon${matches.length > 1 ? "s" : ""} numéro${matches.length > 1 ? "s" : ""} : ${matches.join(", ")}`;
    resultText.style.color = "green";
  } else {
    resultText.textContent = `❌ Aucun bon numéro. Essaie encore !`;
    resultText.style.color = "red";
  }

  // Fin de la partie après 1 tentative
  attempts = 0;
  updateTries();
  disableInputs();
});

// Bouton rejouer
resetBtn.addEventListener("click", () => {
  attempts = 1;
  drawnNumbers = drawNumbers();
  updateTries();
  resultText.textContent = "";
  drawnText.textContent = "";
  playBtn.style.display = "inline-block";
  resetBtn.style.display = "none";
  inputs.forEach(input => {
    input.disabled = false;
    input.value = "";
  });
});

updateTries(); // Initialiser affichage
