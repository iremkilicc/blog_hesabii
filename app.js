const GITHUB_LINK = "https://github.com/dtclnmetin";

function openLogin() {
  document.getElementById("loginModal").classList.add("active");
}

function closeLogin() {
  document.getElementById("loginModal").classList.remove("active");
}

function login() {
  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();

  if (username === "admin" && password === "admin") {
    closeLogin();

    const githubBtn = document.getElementById("githubContact");
    githubBtn.href = GITHUB_LINK;
    githubBtn.classList.remove("hidden");

    document.getElementById("adminNotice").classList.remove("hidden");

    clearInputs();

    document.getElementById("contact").scrollIntoView({
      behavior: "smooth"
    });
  } else {
    alert("Kullanıcı adı veya şifre hatalı.");
  }
}

function toggleSearch() {
  const searchInput = document.getElementById("searchInput");
  searchInput.classList.toggle("active");
  searchInput.focus();
}

function searchContent() {
  const searchValue = document.getElementById("searchInput").value.toLowerCase().trim();
  const items = document.querySelectorAll(".searchable");

  items.forEach((item) => {
    const text = item.innerText.toLowerCase();
    item.style.display = searchValue === "" || text.includes(searchValue) ? "" : "none";
  });
}

function handleInputCheck(inputElement) {
  checkSuspiciousInput(inputElement.value);
}

function triggerTrollOverlay() {
  const overlay = document.getElementById("trollOverlay");
  const countdownText = document.getElementById("countdown");
  const laughSound = document.getElementById("laughSound");

  overlay.classList.add("active");

  laughSound.pause();
  laughSound.currentTime = 0;
  laughSound.volume = 1;

  laughSound.play().catch(() => {
    console.log("Ses tarayıcı tarafından engellenmiş olabilir.");
  });

  let timeLeft = 3;
  countdownText.textContent = timeLeft;

  const timer = setInterval(() => {
    timeLeft--;
    countdownText.textContent = timeLeft;

    if (timeLeft <= 0) {
      clearInterval(timer);
      overlay.classList.remove("active");
      clearInputs();
      window.location.href = "/blog_hesabii/";
    }
  }, 1000);
}

function clearInputs() {
  document.querySelectorAll("input").forEach((input) => {
    input.value = "";
  });

  document.querySelectorAll(".searchable").forEach((item) => {
    item.style.display = "";
  });
}

function checkSuspiciousInput(value) {
  const lowerValue = value.toLowerCase();

  const suspiciousPatterns = [
    "<script",
    "script>",
    "</script",
    "<img",
    "<svg",
    "<iframe",
    "onerror",
    "onload",
    "onclick",
    "alert",
    "javascript:",
    "document.cookie",
    "document.location",
    "window.location",
    "fetch(",
    "eval(",
    "../",
    "..\\",
    "/etc/passwd",
    "union select",
    "drop table"
  ];

  const isSuspicious = suspiciousPatterns.some((pattern) =>
    lowerValue.includes(pattern)
  );

  if (isSuspicious) {
    triggerTrollOverlay();
  }
}

function checkSuspiciousRoute() {
  const path = window.location.pathname.toLowerCase();
  const query = window.location.search.toLowerCase();

  const suspiciousWords = [
    "admin",
    "login",
    "dashboard",
    "panel",
    "secret",
    "hidden",
    "private",
    "backup",
    "config",
    "api",
    "debug",
    "console",
    "root",
    "flag",
    "ctf",
    "hack",
    "phpmyadmin",
    "wp-admin",
    "robots.txt",
    ".env",
    ".git"
  ];

  const shouldTrigger = suspiciousWords.some((word) =>
    path.includes(word) || query.includes(word)
  );

  if (shouldTrigger) {
    triggerTrollOverlay();
  }
}

window.addEventListener("load", () => {
  checkSuspiciousRoute();
});
