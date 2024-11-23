// Fichier : script.js

const playerProfile = {
    pseudo: "Joueur1",
    dob: "",
    weight: "",
    height: "",
    gender: "",
    activityLevel: "",
};

let playerScore = 0;
const leaderboard = [
    { name: "Alice", score: 200, age: "Inconnu", gender: "Non spécifié", city: "Non spécifiée", tier: "Bronze" },
    { name: "Bob", score: 150, age: "Inconnu", gender: "Non spécifié", city: "Non spécifiée", tier: "Bronze" },
    { name: "Charlie", score: 100, age: "Inconnu", gender: "Non spécifié", city: "Non spécifiée", tier: "Bronze" },
];

function loadProfile() {
    const fields = ["pseudo", "dob", "weight", "height", "gender", "activity-level"];
    fields.forEach(field => {
        const element = document.getElementById(field);
        if (element) element.value = playerProfile[field.replace("-", "")] || "";
    });
}

function saveProfile() {
    const fields = ["pseudo", "dob", "weight", "height", "gender", "activity-level"];
    fields.forEach(field => {
        const element = document.getElementById(field);
        if (element) playerProfile[field.replace("-", "")] = element.value;
    });
    alert("Votre profil a été mis à jour !");
}

function playGame() {
    const points = Math.floor(Math.random() * 50) + 10;
    playerScore += points;
    alert(`Bravo ! Vous avez gagné ${points} points.`);

    const existingPlayer = leaderboard.find(player => player.name === playerProfile.pseudo);
    if (existingPlayer) {
        existingPlayer.score = playerScore;
    } else {
        leaderboard.push({ name: playerProfile.pseudo, score: playerScore, age: "Inconnu", gender: "Non spécifié", city: "Non spécifiée", tier: "Bronze" });
    }

    updateLeaderboard();
}

function calculateAge(dob) {
    if (!dob) return null;
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    if (today.getMonth() < birthDate.getMonth() || (today.getMonth() === birthDate.getMonth() && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
}

function importPlayers() {
    const fileInput = document.getElementById('csvFileInput');
    const file = fileInput.files[0];

    if (!file) {
        alert("Veuillez sélectionner un fichier CSV.");
        return;
    }

    Papa.parse(file, {
        header: true,
        skipEmptyLines: true,
        complete: function (results) {
            const data = results.data;
            data.forEach(row => {
                const fullName = `${row['First Name'] || ''} ${row['Middle Name'] || ''} ${row['Last Name'] || ''}`.trim();
                const dob = row['Event 1 - Value'] || '';
                const gender = row['Gender'] || 'Non spécifié';
                const city = row['City'] || 'Non spécifiée';

                if (!fullName) return;

                const age = calculateAge(dob) || 'Inconnu';
                leaderboard.push({ name: fullName, score: 0, age, gender, city, tier: "Bronze" });
            });

            alert("Les joueurs ont été importés avec succès !");
            updateLeaderboard();
        },
        error: function (error) {
            alert(`Erreur lors de l'importation du fichier CSV : ${error.message}`);
        }
    });
}

function updateLeaderboard() {
    const uniqueLeaderboard = Array.from(new Map(leaderboard.map(player => [player.name, player])).values());
    uniqueLeaderboard.sort((a, b) => b.score - a.score);

    const leaderboardList = document.getElementById("leaderboard-list");
    leaderboardList.innerHTML = "";

    uniqueLeaderboard.forEach((player, index) => {
        leaderboardList.innerHTML += `
            <tr>
                <td>${index + 1}</td>
                <td>${player.name}</td>
                <td>${player.tier}</td>
                <td>${player.score}</td>
                <td>${player.age}</td>
                <td>${player.gender}</td>
                <td>${player.city}</td>
            </tr>
        `;
    });

    if ($.fn.DataTable.isDataTable("#leaderboard-table")) {
        $('#leaderboard-table').DataTable().destroy();
    }
    $('#leaderboard-table').DataTable({
        pageLength: 5,
        lengthMenu: [5, 10, 20],
        order: [[3, 'desc']],
        columns: [
            { title: "#" },
            { title: "Pseudo" },
            { title: "Tier" },
            { title: "Score" },
            { title: "Âge" },
            { title: "Sexe" },
            { title: "Ville" }
        ],
        language: {
            url: "//cdn.datatables.net/plug-ins/1.13.5/i18n/fr-FR.json"
        }
    });
}

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

function showScreen(screenId) {
    document.querySelectorAll(".section").forEach(section => section.classList.remove("active"));
    const screen = document.getElementById(screenId);
    if (screen) screen.classList.add("active");
}

function backToMenu() {
    document.querySelectorAll(".section").forEach(section => section.classList.remove("active"));
}

document.addEventListener("DOMContentLoaded", () => {
    loadProfile();
    updateLeaderboard();
    renderChart();
});
