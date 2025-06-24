const inputs = document.querySelectorAll("#inputs input");
const playBtn = document.getElementById("play");
const resetBtn = document.getElementById("reset");
const drawnText = document.getElementById("drawn");
const resultText = document.getElementById("result");
const triesText = document.getElementById("tries");

let attempts = 1;

// Tirage initial : 6 nombres uniques entre 1 et 100
let drawnNumbers = drawNumbers();

function drawNumbers() {
  const numbers = new Set();
  while (numbers.size < 6) {
    numbers.add(Math.floor(Math.random() * 100) + 1);
  }
  return Array.from(numbers).sort((a, b) => a - b);
}

function updateTries() {
  triesText.textContent = `🧮 Tentatives restantes : ${attempts}`;
}

function disableInputs() {
  inputs.forEach(input => input.disabled = true);
  playBtn.style.display = "none";
  resetBtn.style.display = "inline-block";
}

playBtn.addEventListener("click", () => {
  const userNumbers = Array.from(inputs)
    .map(input => parseInt(input.value.trim()))
    .filter(n => !isNaN(n) && n >= 1 && n <= 100);

  const uniqueUserNumbers = [...new Set(userNumbers)];

  if (uniqueUserNumbers.length !== 6) {
    alert("⚠️ Entrez exactement 6 numéros différents entre 1 et 100.");
    return;
  }

  const matches = uniqueUserNumbers.filter(n => drawnNumbers.includes(n));

  drawnText.textContent = `🎯 Numéros gagnants : ${drawnNumbers.join(", ")}`;

  if (matches.length === 6) {
    resultText.textContent = `🏆 Incroyable ! Tu as trouvé les 6 numéros !`;
    resultText.style.color = "blue";
    disableInputs();
  } else if (attempts === 1) {
    attempts--;
    resultText.textContent = `💥 Plus de tentatives. Les bons numéros étaient : ${drawnNumbers.join(", ")}`;
    resultText.style.color = "red";
    disableInputs();
  } else {
    attempts--;
    if (matches.length > 0) {
      resultText.textContent = `✅ Tu as trouvé ${matches.length} numéro(s) : ${matches.join(", ")}`;
      resultText.style.color = "green";
    } else {
      resultText.textContent = `❌ Aucun bon numéro. Réessaie !`;
      resultText.style.color = "red";
    }

    // Afficher le bouton rejouer même si le jeu n'est pas fini
    disableInputs();
  }

  updateTries();
});

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

updateTries();
