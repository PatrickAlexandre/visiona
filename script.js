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
    { name: "Alice", score: 200 },
    { name: "Bob", score: 150 },
    { name: "Charlie", score: 100 },
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

// Jouer pour gagner des points
function playGame() {
    const points = Math.floor(Math.random() * 50) + 10;
    playerScore += points;
    alert(`Bravo ! Vous avez gagné ${points} points.`);
    updateLeaderboard();
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

// Mettre à jour le classement
function updateLeaderboard() {
    // Trier les joueurs par score décroissant
    leaderboard.sort((a, b) => b.score - a.score);

    // Remplir le tableau
    const leaderboardList = document.getElementById("leaderboard-list");
    leaderboardList.innerHTML = ""; // Réinitialiser les lignes
    leaderboard.forEach((player, index) => {
        const row = `
            <tr>
                <td>${index + 1}</td>
                <td>${player.name}</td>
                <td>${player.score}</td>
            </tr>
        `;
        leaderboardList.innerHTML += row;
    });

    // Initialiser ou recharger DataTables
    if ($.fn.DataTable.isDataTable("#leaderboard-table")) {
        $('#leaderboard-table').DataTable().destroy();
    }
    $('#leaderboard-table').DataTable({
        pageLength: 5, // Nombre de lignes par page
        lengthMenu: [5, 10, 20], // Options pour les lignes par page
        order: [[2, 'desc']], // Trier par score décroissant
        language: {
            url: "//cdn.datatables.net/plug-ins/1.13.5/i18n/fr-FR.json" // Traduction en français
        }
    });
}

function playGame() {
    const points = Math.floor(Math.random() * 50) + 10;
    playerScore += points;

    alert(`Bravo ! Vous avez gagné ${points} points.`);

    // Ajouter ou mettre à jour le score du joueur
    const existingPlayer = leaderboard.find(player => player.name === playerProfile.pseudo);
    if (existingPlayer) {
        existingPlayer.score = playerScore;
    } else {
        leaderboard.push({ name: playerProfile.pseudo, score: playerScore });
    }

    updateLeaderboard();
}

// Initialisation
loadProfile();
updateLeaderboard();
renderChart();