// Mettre à jour le leaderboard
function updateLeaderboard() {
    leaderboard.push({ name: playerProfile.pseudo, score: playerScore });
    leaderboard.sort((a, b) => b.score - a.score);
    const leaderboardList = document.getElementById("leaderboard-list");
    leaderboardList.innerHTML = leaderboard
        .map((player, index) => `<tr><td>${index + 1}</td><td>${player.name}</td><td>${player.score}</td></tr>`)
        .join("");
}