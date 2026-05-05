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

    document.getElementById("githubContact").classList.remove("hidden");
    document.getElementById("adminNotice").classList.remove("hidden");

    clearInputs();

    document.getElementById("contact").scrollIntoView({
      behavior: "smooth"
    });
  } else {
    triggerTrollOverlay("login");
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

    if (searchValue === "" || text.includes(searchValue)) {
      item.style.display = "";
    } else {
      item.style.display = "none";
    }
  });
}

function handleInputCheck(inputElement) {
  checkSuspiciousInput(inputElement.value);
}

function triggerTrollOverlay(reason) {
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

  let timeLeft = 5;
  countdownText.textContent = timeLeft;

  const timer = setInterval(() => {
    timeLeft--;
    countdownText.textContent = timeLeft;

    if (timeLeft <= 0) {
      clearInterval(timer);
      overlay.classList.remove("active");
      clearInputs();

      if (reason === "path" || reason === "query" || reason === "404") {
        window.location.href = "index.html";
      }
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
    "alert(",
    "prompt",
    "confirm",
    "javascript:",
    "document.cookie",
    "document.location",
    "window.location",
    "localstorage",
    "sessionstorage",
    "innerhtml",
    "fetch(",
    "eval(",
    "settimeout(",
    "setinterval(",
    "select *",
    "drop table",
    "union select",
    "insert into",
    "delete from",
    "or 1=1",
    "' or '1'='1",
    "\" or \"1\"=\"1",
    "../",
    "..\\",
    "/etc/passwd",
    "admin=true",
    "role=admin",
    "debug=true"
  ];

  const isSuspicious = suspiciousPatterns.some((pattern) =>
    lowerValue.includes(pattern)
  );

  if (isSuspicious) {
    triggerTrollOverlay("input");
  }
}

function checkSuspiciousPath() {
  const path = window.location.pathname.toLowerCase();
  const query = window.location.search.toLowerCase();

  const suspiciousPaths = [
    "/admin",
    "/login",
    "/dashboard",
    "/panel",
    "/secret",
    "/hidden",
    "/private",
    "/backup",
    "/config",
    "/api",
    "/debug",
    "/console",
    "/root",
    "/flag",
    "/ctf",
    "/hack",
    "/phpmyadmin",
    "/wp-admin",
    "/robots.txt",
    "/.env",
    "/.git"
  ];

  const suspiciousQueries = [
    "admin=true",
    "role=admin",
    "debug=true",
    "token=",
    "password=",
    "id=1'",
    "or '1'='1",
    "../",
    "etc/passwd",
    "union",
    "select",
    "script",
    "alert",
    "javascript:",
    "document.cookie"
  ];

  const allowedPaths = ["/", "/index.html"];

  const isSuspiciousPath = suspiciousPaths.some((item) => path.includes(item));
  const isSuspiciousQuery = suspiciousQueries.some((item) => query.includes(item));
  const isKnownPath = allowedPaths.includes(path);

  if (isSuspiciousPath) {
    triggerTrollOverlay("path");
    return;
  }

  if (isSuspiciousQuery) {
    triggerTrollOverlay("query");
    return;
  }

  if (!isKnownPath && path !== "") {
    triggerTrollOverlay("404");
  }
}

window.addEventListener("load", () => {
  checkSuspiciousPath();
});