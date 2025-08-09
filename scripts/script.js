const members = [
  {
    name: "Nayeon",
    images: [
      "images/nayeon1.jpeg",
      "images/nayeon2.jpeg",
      "images/nayeon3.jpeg",
      "images/nayeon4.jpeg",
      "images/nayeon5.jpeg",
    ],
  },
  {
    name: "Jeongyeon",
    images: [
      "images/jeongyeon1.jpeg",
      "images/jeongyeon2.jpeg",
      "images/jeongyeon3.jpeg",
      "images/jeongyeon4.jpeg",
      "images/jeongyeon5.jpeg",
    ],
  },
  {
    name: "Momo",
    images: [
      "images/momo1.jpeg",
      "images/momo2.jpeg",
      "images/momo3.jpeg",
      "images/momo4.jpeg",
      "images/momo5.jpeg",
    ],
  },
  {
    name: "Sana",
    images: [
      "images/sana1.jpeg",
      "images/sana2.jpeg",
      "images/sana3.jpeg",
      "images/sana4.jpeg",
      "images/sana5.jpeg",
    ],
  },
  {
    name: "Jihyo",
    images: [
      "images/jihyo1.jpeg",
      "images/jihyo2.jpeg",
      "images/jihyo3.jpeg",
      "images/jihyo4.jpeg",
      "images/jihyo5.jpeg",
    ],
  },
  {
    name: "Mina",
    images: [
      "images/mina1.jpeg",
      "images/mina2.jpeg",
      "images/mina3.jpeg",
      "images/mina4.jpeg",
      "images/mina5.jpeg",
    ],
  },
  {
    name: "Dahyun",
    images: [
      "images/dahyun1.jpeg",
      "images/dahyun2.jpeg",
      "images/dahyun3.jpeg",
      "images/dahyun4.jpeg",
      "images/dahyun5.jpeg",
    ],
  },
  {
    name: "Chaeyoung",
    images: [
      "images/chaeyoung1.jpeg",
      "images/chaeyoung2.jpeg",
      "images/chaeyoung3.jpeg",
      "images/chaeyoung4.jpeg",
      "images/chaeyoung5.jpeg",
    ],
  },
  {
    name: "Tzuyu",
    images: [
      "images/tzuyu1.jpeg",
      "images/tzuyu2.jpeg",
      "images/tzuyu3.jpeg",
      "images/tzuyu4.jpeg",
      "images/tzuyu5.jpeg",
    ],
  },
];

const songs = [
  { name: "Four", file: "audio/four.mp3" },
  { name: "This is For", file: "audio/thisisfor.mp3" },
  { name: "After Moon", file: "audio/aftermoon.mp3" },
  { name: "Battitude", file: "audio/battitude.mp3" },
  { name: "BDZ", file: "audio/bdz.mp3" },
  { name: "Cry For Me", file: "audio/cryforme.mp3" },
  { name: "Dance The Night Away", file: "audio/dancethenightaway.mp3" },
  { name: "DAT AHH DAT OOH", file: "audio/datahhdatooh.mp3" },
  { name: "Do It Again", file: "audio/doitagain.mp3" },
  { name: "Fancy", file: "audio/fancy.mp3" },
  { name: "Feel Special", file: "audio/feelspecial.mp3" },
  { name: "Gone", file: "audio/gone.mp3" },
  { name: "Hell In Heaven", file: "audio/hellinheaven.mp3" },
  { name: "I Can't Stop Me", file: "audio/icantstopme.mp3" },
  { name: "I Got You", file: "audio/igotyou.mp3" },
  { name: "Make Me Go", file: "audio/makemego.mp3" },
  { name: "Mars", file: "audio/mars.mp3" },
  { name: "Moonlight Sunrise", file: "audio/moonlightsunrise.mp3" },
  { name: "One Spark", file: "audio/onespark.mp3" },
  { name: "Options", file: "audio/options.mp3" },
  { name: "Right Hand Girl", file: "audio/righthandgirl.mp3" },
  { name: "Set Me Free", file: "audio/setmefree.mp3" },
  { name: "Strategy", file: "audio/strategy.mp3" },
  { name: "Talk That Talk", file: "audio/talkthattalk.mp3" },
  { name: "The Feels", file: "audio/thefeels.mp3" },
  { name: "What Is Love", file: "audio/whatislove.mp3" },
  { name: "Yes or Yes", file: "audio/yesoryes.mp3" },
  { name: "You In My Heart", file: "audio/youinmyheart.mp3" },
  // add more mp3 files...
];

// Create suggestion list from members and songs
const suggestionsList = [
  ...members.map((m) => m.name),
  ...songs.map((s) => s.name),
];

let currentMember = null;
let usedImages = [];
let correctCount = 0;
const maxRounds = 10;
let roundActive = true; // prevent multiple submissions in one round
let currentLevel = 1;
let level2Unlocked = false;

function getRandomUnusedImage() {
  let attempts = 0;
  while (attempts < 100) {
    const member = members[Math.floor(Math.random() * members.length)];
    const image =
      member.images[Math.floor(Math.random() * member.images.length)];
    const key = `${member.name}-${image}`;
    if (!usedImages.includes(key)) {
      usedImages.push(key);
      return { member, image };
    }
    attempts++;
  }
  return null;
}

function switchLevel(level) {
  if (level === 2 && !level2Unlocked) return; // prevent locked access
  currentLevel = level;

  // Highlight active level
  document.getElementById("level1-btn").classList.remove("active");
  document.getElementById("level2-btn").classList.remove("active");
  document.getElementById(`level${level}-btn`).classList.add("active");

  // Show/hide media
  if (currentLevel === 1) {
    document.getElementById("member-img").style.display = "block";
    document.getElementById("song-audio").style.display = "none";
  } else {
    document.getElementById("member-img").style.display = "none";
    document.getElementById("song-audio").style.display = "block";
  }

  const audioControls = document.getElementById("audio-controls");
  if (currentLevel === 1) {
    audioControls.style.display = "none";
  } else {
    audioControls.style.display = "flex";
  }

  restartGame();
}

function nextImage() {
  roundActive = true;
  document.getElementById("feedback").textContent = "";
  document.getElementById("guess-input").value = "";

  if (correctCount >= maxRounds) {
    endGame(true);
    return;
  }

  if (currentLevel === 1) {
    const data = getRandomUnusedImage();
    if (!data) return endGame(true);
    currentMember = data.member;
    document.getElementById("member-img").src = data.image;
    document.getElementById("member-img").style.display = "block";
    document.getElementById("song-audio").style.display = "none";
  } else if (currentLevel === 2) {
    const song = songs[Math.floor(Math.random() * songs.length)];
    currentMember = song;
    const audio = document.getElementById("song-audio");
    const playBtn = document.getElementById("custom-play-btn");
    const volumeSlider = document.getElementById("volume-slider");
    const audioControls = document.getElementById("audio-controls");

    // Show custom controls for Level 2
    audioControls.style.display = "flex";

    audio.src = song.file;
    playBtn.disabled = true; // re-lock until ready

    // Apply saved volume if available
    if (typeof window.savedVolume !== "undefined") {
      audio.volume = window.savedVolume;
      volumeSlider.value = window.savedVolume;
    } else {
      audio.volume = 0.5; // default
      volumeSlider.value = 0.5;
    }

    // Volume slider persistence
    volumeSlider.oninput = () => {
      audio.volume = volumeSlider.value;
      window.savedVolume = parseFloat(volumeSlider.value);
    };

    audio.addEventListener("loadedmetadata", function playSegment() {
      const duration = audio.duration;
      if (duration > 5) {
        const startTime = Math.random() * (duration - 5);

        playBtn.disabled = false;
        playBtn.onclick = () => {
          audio.currentTime = startTime;
          audio.play();

          audio.ontimeupdate = () => {
            if (audio.currentTime >= startTime + 5) {
              audio.pause();
              audio.currentTime = 0; // reset
              audio.ontimeupdate = null;
            }
          };
        };
        playBtn.onclick();
      }
      audio.removeEventListener("loadedmetadata", playSegment);
    });
  }
}

function checkGuess() {
  if (!roundActive) return;
  const guess = document
    .getElementById("guess-input")
    .value.trim()
    .toLowerCase();
  const correct = currentMember.name.toLowerCase();

  if (guess === correct) {
    correctCount++;
    document.getElementById("feedback").textContent = "✅ Correct!";
    document.getElementById("feedback").style.color = "green";

    // Move the person for BOTH levels
    movePerson(correctCount);

    roundActive = false;
    setTimeout(nextImage, 800);
  } else {
    document.getElementById(
      "feedback"
    ).textContent = `❌ Wrong! It was ${currentMember.name}.`;
    document.getElementById("feedback").style.color = "red";
    endGame(false);
  }
}

function endGame(won) {
  document.getElementById("guess-input").disabled = true;
  document.getElementById("submit-btn").disabled = true;
  roundActive = false;

  const endMsg = document.getElementById("end-message");
  const person = document.getElementById("person");
  const concert = document.getElementById("concert");
  const retryButton = document.querySelector("#retry-container button"); // add this line

  if (won && correctCount === maxRounds) {
    if (currentLevel === 1) {
      // Level 1 win text
      endMsg.innerHTML = `🎉 Congratulations, you unlocked <strong>Level 2</strong>!`;
      level2Unlocked = true;
      const level2Btn = document.getElementById("level2-btn");
      level2Btn.disabled = false;
      level2Btn.classList.remove("locked");

      retryButton.textContent = "Go to Level 2";
      retryButton.classList.add("pulse-btn"); // Add pulse
      retryButton.onclick = () => {
        retryButton.classList.remove("pulse-btn"); // Remove pulse once clicked
        document.getElementById("level2-btn").click();
      };
    } else if (currentLevel === 2) {
      // Level 2 win text
      endMsg.innerHTML = `🎉 Congratulations, you <strong>ARE</strong> going to the concert! <br><img src="https://cdn.vectorstock.com/i/1000v/53/95/thumbs-up-smiley-emoticon-vector-1075395.jpg" height="100">`;
      person.classList.add("celebrating");
      retryButton.textContent = "Retry";
      retryButton.classList.remove("pulse-btn");
      retryButton.onclick = restartGame;

      // Final snap to exact center
      const concertCenter = concert.offsetLeft + concert.offsetWidth / 2;
      const personCenter = person.offsetWidth / 2;
      person.style.left = `${concertCenter - personCenter}px`;
    }
  } else {
    endMsg.innerHTML = `👉 You <strong>are NOT</strong> going to the concert! <br><img src="https://static.vecteezy.com/system/resources/thumbnails/017/260/371/small/hand-pointing-finger-at-you-vector.jpg" height="100">`;
    retryButton.textContent = "Retry";
    retryButton.classList.remove("pulse-btn");
    retryButton.onclick = restartGame;
  }

  document.getElementById("retry-container").style.display = "block";
}

function movePerson(count) {
  const person = document.getElementById("person");
  const gameArea = document.getElementById("game-area");
  const concert = document.getElementById("concert");

  const concertX = concert.offsetLeft + concert.offsetWidth / 2;
  const personWidth = person.offsetWidth;
  const stepSize = (concertX - personWidth / 2) / maxRounds;

  person.style.left = `${stepSize * count}px`;
}

document
  .getElementById("guess-input")
  .addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
      checkGuess();
    }
  });

window.onload = () => {
  document.getElementById("retry-container").style.display = "none"; // hide retry initially
  nextImage();
};

function restartGame() {
  correctCount = 0;
  usedImages = [];
  roundActive = true;
  document.getElementById("end-message").innerHTML = "";
  document.getElementById("feedback").textContent = "";
  document.getElementById("retry-container").style.display = "none";

  // Reset guess input
  document.getElementById("guess-input").disabled = false;
  document.getElementById("guess-input").value = "";

  // ✅ Explicitly re-enable submit button
  document.getElementById("submit-btn").disabled = false;

  const person = document.getElementById("person");
  person.style.left = "0px";
  person.classList.remove("celebrating");

  nextImage();
}

const guessInput = document.getElementById("guess-input");
const suggestionsBox = document.getElementById("suggestions");
let currentSuggestions = [];
let selectedIndex = -1;

// Function to update suggestions based on level
function updateSuggestionList() {
  if (currentLevel === 1) {
    return members.map((m) => m.name);
  } else if (currentLevel === 2) {
    return songs.map((s) => s.name);
  }
  return [];
}

// Listen for typing
guessInput.addEventListener("input", function () {
  const query = this.value.toLowerCase();
  suggestionsBox.innerHTML = "";
  selectedIndex = -1;
  currentSuggestions = updateSuggestionList().filter((item) =>
    item.toLowerCase().includes(query)
  );

  if (!query || currentSuggestions.length === 0) {
    suggestionsBox.style.display = "none";
    return;
  }

  currentSuggestions.forEach((item, index) => {
    const div = document.createElement("div");
    div.textContent = item;
    div.onclick = () => selectSuggestion(index);
    suggestionsBox.appendChild(div);
  });

  suggestionsBox.style.display = "block";
});

// Keyboard navigation
guessInput.addEventListener("keydown", function (e) {
  const items = suggestionsBox.querySelectorAll("div");
  if (suggestionsBox.style.display === "none") return;

  if (e.key === "ArrowDown") {
    e.preventDefault();
    selectedIndex = (selectedIndex + 1) % items.length;
    highlightSuggestion(items);
  } else if (e.key === "ArrowUp") {
    e.preventDefault();
    selectedIndex = (selectedIndex - 1 + items.length) % items.length;
    highlightSuggestion(items);
  } else if (e.key === "Enter") {
    // Always hide suggestions on Enter
    suggestionsBox.style.display = "none";

    if (selectedIndex >= 0 && selectedIndex < currentSuggestions.length) {
      e.preventDefault();
      selectSuggestion(selectedIndex);
    }
  }
});

function highlightSuggestion(items) {
  items.forEach((item, idx) => {
    item.style.backgroundColor = idx === selectedIndex ? "#ffe0e0" : "";
  });
}

function selectSuggestion(index) {
  guessInput.value = currentSuggestions[index];
  suggestionsBox.style.display = "none";
  guessInput.focus();
}

// Hide suggestions if user clicks outside
document.addEventListener("click", function (e) {
  if (!document.getElementById("autocomplete-container").contains(e.target)) {
    suggestionsBox.style.display = "none";
  }
});
