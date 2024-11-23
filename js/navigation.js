// Navigation entre les sections
function showScreen(screenId) {
    document.querySelectorAll(".section").forEach((section) => section.classList.remove("active"));
    document.getElementById(screenId).classList.add("active");
}

function backToMenu() {
    document.querySelectorAll(".section").forEach((section) => section.classList.remove("active"));
}