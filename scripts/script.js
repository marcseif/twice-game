const members = [
  {
    name: "Nayeon",
    images: [
      "https://kpopping.com/documents/db/1/600/250720-SANA-at-THIS-IS-FOR-World-Tour-in-Incheon-D2-documents-1(3).jpeg?v=12c9f",
      "https://kpopping.com/documents/db/1/600/250720-SANA-at-THIS-IS-FOR-World-Tour-in-Incheon-D2-documents-1(3).jpeg?v=12c9f"
    ]
  },
  {
    name: "Jeongyeon",
    images: [
      "https://kpopping.com/documents/db/1/600/250720-SANA-at-THIS-IS-FOR-World-Tour-in-Incheon-D2-documents-1(3).jpeg?v=12c9f",
      "https://kpopping.com/documents/db/1/600/250720-SANA-at-THIS-IS-FOR-World-Tour-in-Incheon-D2-documents-1(3).jpeg?v=12c9f"
    ]
  },
  {
    name: "Momo",
    images: [
      "https://kpopping.com/documents/db/1/600/250720-SANA-at-THIS-IS-FOR-World-Tour-in-Incheon-D2-documents-1(3).jpeg?v=12c9f",
      "https://kpopping.com/documents/db/1/600/250720-SANA-at-THIS-IS-FOR-World-Tour-in-Incheon-D2-documents-1(3).jpeg?v=12c9f"
    ]
  },
  {
    name: "Sana",
    images: [
      "https://kpopping.com/documents/db/1/600/250720-SANA-at-THIS-IS-FOR-World-Tour-in-Incheon-D2-documents-1(3).jpeg?v=12c9f",
      "https://kpopping.com/documents/db/1/600/250720-SANA-at-THIS-IS-FOR-World-Tour-in-Incheon-D2-documents-1(3).jpeg?v=12c9f"
    ]
  },
  {
    name: "Jihyo",
    images: [
      "https://kpopping.com/documents/db/1/600/250720-SANA-at-THIS-IS-FOR-World-Tour-in-Incheon-D2-documents-1(3).jpeg?v=12c9f",
      "https://kpopping.com/documents/db/1/600/250720-SANA-at-THIS-IS-FOR-World-Tour-in-Incheon-D2-documents-1(3).jpeg?v=12c9f"
    ]
  },
  {
    name: "Mina",
    images: [
      "https://kpopping.com/documents/db/1/600/250720-SANA-at-THIS-IS-FOR-World-Tour-in-Incheon-D2-documents-1(3).jpeg?v=12c9f",
      "https://kpopping.com/documents/db/1/600/250720-SANA-at-THIS-IS-FOR-World-Tour-in-Incheon-D2-documents-1(3).jpeg?v=12c9f"
    ]
  },
  {
    name: "Dahyun",
    images: [
      "https://kpopping.com/documents/db/1/600/250720-SANA-at-THIS-IS-FOR-World-Tour-in-Incheon-D2-documents-1(3).jpeg?v=12c9f",
      "https://kpopping.com/documents/db/1/600/250720-SANA-at-THIS-IS-FOR-World-Tour-in-Incheon-D2-documents-1(3).jpeg?v=12c9f"
    ]
  },
  {
    name: "Chaeyoung",
    images: [
      "https://kpopping.com/documents/db/1/600/250720-SANA-at-THIS-IS-FOR-World-Tour-in-Incheon-D2-documents-1(3).jpeg?v=12c9f",
      "https://kpopping.com/documents/db/1/600/250720-SANA-at-THIS-IS-FOR-World-Tour-in-Incheon-D2-documents-1(3).jpeg?v=12c9f"
    ]
  },
  {
    name: "Tzuyu",
    images: [
      "https://kpopping.com/documents/db/1/600/250720-SANA-at-THIS-IS-FOR-World-Tour-in-Incheon-D2-documents-1(3).jpeg?v=12c9f",
      "https://kpopping.com/documents/db/1/600/250720-SANA-at-THIS-IS-FOR-World-Tour-in-Incheon-D2-documents-1(3).jpeg?v=12c9f"
    ]
  }
];

let imagePool = [];
members.forEach(member => {
  member.images.forEach(image => {
    imagePool.push({ name: member.name, image });
  });
});

const totalRounds = 10;
let currentRound = 0;
let score = 0;
let currentImage = null;

const roundInfo = document.getElementById("round-info");
const feedback = document.getElementById("feedback");
const guessInput = document.getElementById("guess-input");
const memberImg = document.getElementById("member-img");
const finalScore = document.getElementById("final-score");

function nextImage() {
  if (currentRound >= totalRounds || imagePool.length === 0) {
    memberImg.style.display = "none";
    guessInput.style.display = "none";
    document.querySelector("button").style.display = "none";
    roundInfo.style.display = "none";
    feedback.style.display = "none";

    finalScore.style.display = "block";

    if (score === totalRounds) {
      finalScore.innerHTML = `
        🎉 Congratulations, you ARE going to the concert!<br/>
        <img src="https://cdn.vectorstock.com/i/1000v/53/95/thumbs-up-smiley-emoticon-vector-1075395.jpg" alt="Thumbs Up" style="width:50px; margin-top:10px;">
      `;
    } else {
      finalScore.innerHTML = `
        <img src="https://static.vecteezy.com/system/resources/thumbnails/017/260/371/small/hand-pointing-finger-at-you-vector.jpg" alt="Pointing Finger" style="width:50px; margin-bottom:10px;">
        <br/>You are NOT going to the concert.
      `;
    }

    return;
  }
  feedback.textContent = "";
  guessInput.value = "";
  guessInput.disabled = false;

  currentRound++;
  roundInfo.textContent = `Round ${currentRound} of ${totalRounds}`;

  const randomIndex = Math.floor(Math.random() * imagePool.length);
  currentImage = imagePool.splice(randomIndex, 1)[0];

  memberImg.src = currentImage.image;
  memberImg.style.display = "block";
  guessInput.focus();
}

function checkGuess() {
  const guess = guessInput.value.trim().toLowerCase();
  if (!guess) return;

  guessInput.disabled = true;

  if (guess === currentImage.name.toLowerCase()) {
    feedback.textContent = "✅ Correct!";
    feedback.style.color = "green";
    score++;
  } else {
    feedback.textContent = `❌ Incorrect! It was ${currentImage.name}.`;
    feedback.style.color = "red";
  }

  setTimeout(() => {
    nextImage();
    guessInput.disabled = false;
  }, 1400);
}

guessInput.addEventListener('keydown', function(e) {
  if (e.key === 'Enter') {
    e.preventDefault();
    checkGuess();
  }
});

window.onload = () => {
  nextImage();
  guessInput.focus();
};
