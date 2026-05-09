const GITHUB_LINK = "https://github.com/dtclnmetin";

function openLogin() {
  document.getElementById("loginModal").classList.add("active");
}

function closeLogin() {
  document.getElementById("loginModal").classList.remove("active");
}

function login() {
  const username = document.getElementById("username").value.trim().toLowerCase();
  const password = document.getElementById("password").value.trim();

  if (username === "metindataçalan" && password === "tebriklerkanka") {
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

function showAdminRestrictedScreen() {
  document.body.innerHTML = `
    <div style="
      min-height: 140vh;
      background: #020617;
      color: white;
      display: flex;
      flex-direction: column;
      align-items: center;
      padding-top: 34vh;
      font-family: Arial, sans-serif;
      text-align: center;
    ">
      <h1 style="
        font-size: clamp(42px, 8vw, 90px);
        letter-spacing: 3px;
        font-weight: 900;
        color: #ef4444;
        text-shadow: 0 0 35px rgba(239, 68, 68, 0.45);
      ">
        BU EKRAN KISITLANMIŞTIR
      </h1>

      <p style="
        margin-top: 24px;
        color: #94a3b8;
        font-size: 18px;
      ">
        Devam etmek için aşağı kaydır.
      </p>

      <div style="height: 65vh;"></div>

      <p style="
        margin-bottom: 80px;
        padding: 18px 28px;
        border-radius: 18px;
        background: rgba(255,255,255,0.08);
        border: 1px solid rgba(255,255,255,0.16);
        color: #22c55e;
        font-size: 28px;
        font-weight: 800;
        box-shadow: 0 0 35px rgba(34, 197, 94, 0.16);
      ">
        pswrd=tebriklerkanka
      </p>
    </div>
  `;
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
    "drop table",
    "admin=true",
    "role=admin",
    "debug=true"
  ];

  const isSuspicious = suspiciousPatterns.some((pattern) =>
    lowerValue.includes(pattern)
  );

  if (isSuspicious) {
    triggerTrollOverlay();
  }
}

function normalizeText(text) {
  return text
    .toLowerCase()
    .replace(/[-_.%20]+/g, " ")
    .replace(/[^a-z0-9ğüşıöç\s]/g, " ");
}

function checkSuspiciousRoute() {
  const rawPath = decodeURIComponent(window.location.pathname.toLowerCase());
  const rawQuery = decodeURIComponent(window.location.search.toLowerCase());
  const targetText = normalizeText(rawPath + " " + rawQuery);

  if (targetText.includes("admin")) {
    showAdminRestrictedScreen();
    return;
  }

  const suspiciousWords = [
    "login",
    "user",
    "users",
    "account",
    "profile",
    "panel",
    "dashboard",
    "link",
    "github",
    "git",
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
    "wp admin",
    "robots",
    "env"
  ];

  const shouldTrigger = suspiciousWords.some((word) =>
    targetText.includes(word)
  );

  if (shouldTrigger) {
    triggerTrollOverlay();
  }
}

window.addEventListener("load", () => {
  checkSuspiciousRoute();
});
