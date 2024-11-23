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