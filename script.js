
const correctPasswordHash = "3972905cc58310b37c7989feb13592ea71cf0902fd0fe4415782ece0c469d22c";

const loginContainer = document.getElementById("loginContainer");
const mainContent = document.getElementById("mainContent");
const passwordInput = document.getElementById("passwordInput");
const submitBtn = document.getElementById("submitBtn");
const errorMsg = document.getElementById("errorMsg");
const urlParams = new URLSearchParams(window.location.search);
const userNameTo = urlParams.get('to') || "";
const userNameFrom = urlParams.get('from') || "";

// Handle password submission
submitBtn.addEventListener("click", validatePassword);
passwordInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    validatePassword();
  }
});

function validatePassword() {
  const enteredPassword = passwordInput.value;
  // Hash the entered password using SHA256
  const enteredPasswordHash = CryptoJS.SHA256(enteredPassword).toString();

  if (enteredPasswordHash === correctPasswordHash) {
    // Correct password - hide login and show main content
    loginContainer.style.display = "none";
    document.querySelector(".question-title").textContent = `Hey ${userNameTo}, I have a question for you...`;
    mainContent.style.display = "block";
    errorMsg.classList.remove("show");
  } else {
    // Wrong password - show error
    errorMsg.textContent = "❌ Wrong password. Try again!";
    errorMsg.classList.add("show");
    passwordInput.value = "";
    passwordInput.focus();
  }
}

passwordInput.focus();

const questionContainer = document.querySelector(".question-container");
const resultContainer = document.querySelector(".result-container");
const gifResult = document.querySelector(".gif-result");
const heartLoader = document.querySelector(".cssload-main");
const heartsBackground = document.querySelector(".hearts-background");
const bgAudio = document.getElementById("bgAudio");
const yesBtn = document.querySelector(".js-yes-btn");
const noBtn = document.querySelector(".js-no-btn");

// Create scrolling hearts
function createHeart() {
  const heart = document.createElement("div");
  heart.classList.add("heart");
  heart.textContent = "❤️";

  // Random horizontal position
  const randomLeft = Math.random() * window.innerWidth;
  heart.style.left = randomLeft + "px";

  // Random animation duration (5-7 seconds)
  const duration = 5 + Math.random() * 2;
  heart.style.animationDuration = duration + "s";

  heartsBackground.appendChild(heart);

  // Remove heart after animation completes
  setTimeout(() => {
    heart.remove();
  }, duration * 1000);
}

// Generate hearts continuously
setInterval(createHeart, 300);

// /change the postion of no button
noBtn.addEventListener("mouseover", () => {
  const newX = Math.floor(Math.random() * questionContainer.offsetWidth);
  const newY = Math.floor(Math.random() * questionContainer.offsetHeight);

  noBtn.style.left = `${newX}px`;
  noBtn.style.top = `${newY}px`;
});
noBtn.addEventListener("click", () => {
  const newX = Math.floor(Math.random() * questionContainer.offsetWidth);
  const newY = Math.floor(Math.random() * questionContainer.offsetHeight);

  noBtn.style.left = `${newX}px`;
  noBtn.style.top = `${newY}px`;
});

// yes button functionality

yesBtn.addEventListener("click", () => {
  questionContainer.style.display = "none";
  heartLoader.style.display = "inherit";
  document.querySelector(".forevertext").textContent = `Forever #${userNameFrom}${userNameTo}❤️`;
  // Play audio on button click
  bgAudio.play();

  const timeoutId = setTimeout(() => {
    heartLoader.style.display = "none";
    resultContainer.style.display = "inherit";
    gifResult.play();
  }, 3000);
});

// Replay button functionality
const replayBtn = document.getElementById("replayBtn");
const valentineVideo = document.getElementById("valentineVideo");

// Disable replay button initially
replayBtn.disabled = true;
replayBtn.style.opacity = "0.5";
replayBtn.style.cursor = "not-allowed";

// Enable replay button when video ends
valentineVideo.addEventListener("ended", () => {
  replayBtn.disabled = false;
  replayBtn.style.opacity = "1";
  replayBtn.style.cursor = "pointer";
});

replayBtn.addEventListener("click", () => {
  if (!replayBtn.disabled) {
    // Disable button again during replay
    replayBtn.disabled = true;
    replayBtn.style.opacity = "0.5";
    replayBtn.style.cursor = "not-allowed";
    
    valentineVideo.currentTime = 0;
    valentineVideo.play();
  }
});
