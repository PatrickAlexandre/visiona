// Variables globales
let playerProfile = {
    pseudo: "Joueur1",
    dob: "",
    weight: "",
    height: "",
    gender: "",
    activityLevel: "",
};

let playerScore = 0;
let leaderboard = [
import Contacts.csv
];

// Charger les données initiales
function loadProfile() {
    document.getElementById("pseudo").value = playerProfile.pseudo;
    document.getElementById("dob").value = playerProfile.dob;
    document.getElementById("weight").value = playerProfile.weight;
    document.getElementById("height").value = playerProfile.height;
    document.getElementById("gender").value = playerProfile.gender;
    document.getElementById("activity-level").value = playerProfile.activityLevel;
}

// Enregistrer les données
function saveProfile() {
    playerProfile.pseudo = document.getElementById("pseudo").value;
    playerProfile.dob = document.getElementById("dob").value;
    playerProfile.weight = document.getElementById("weight").value;
    playerProfile.height = document.getElementById("height").value;
    playerProfile.gender = document.getElementById("gender").value;
    playerProfile.activityLevel = document.getElementById("activity-level").value;

    alert("Votre profil a été mis à jour !");
}

// Mettre à jour le leaderboard
function updateLeaderboard() {
    leaderboard.push({ name: playerProfile.pseudo, score: playerScore });
    leaderboard.sort((a, b) => b.score - a.score);
    const leaderboardList = document.getElementById("leaderboard-list");
    leaderboardList.innerHTML = leaderboard
        .map((player, index) => `<tr><td>${index + 1}</td><td>${player.name}</td><td>${player.score}</td></tr>`)
        .join("");
}

// Jouer pour gagner des points
function playGame() {
    const points = Math.floor(Math.random() * 50) + 10;
    playerScore += points;
    alert(`Bravo ! Vous avez gagné ${points} points.`);
}

// Initialiser le graphique
function renderChart() {
    const options = {
        chart: { type: 'line', height: 200 },
        series: [{
            name: "Score",
            data: leaderboard.map(player => player.score),
        }],
        xaxis: { categories: leaderboard.map(player => player.name) },
        colors: ['#6c63ff']
    };
    const chart = new ApexCharts(document.querySelector("#chart"), options);
    chart.render();
}

// Navigation entre les sections
function showScreen(screenId) {
    document.querySelectorAll(".section").forEach((section) => section.classList.remove("active"));
    document.getElementById(screenId).classList.add("active");
}

function backToMenu() {
    document.querySelectorAll(".section").forEach((section) => section.classList.remove("active"));
}

// Initialisation
loadProfile();
updateLeaderboard();
renderChart();