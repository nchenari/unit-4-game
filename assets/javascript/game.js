$(document).ready(function() {
    // -------------------------- game variables ---------------------------
    // ---- players -------------------
    var obiWanKenobi = {
        name: "Obi-Wain Kenobi",
        health: 120,
        defendingDamage: 8
    };

    var lukeSkywalker = {
        name: "Luke Skywalker",
        health: 100,
        defendingDamage: 5
    };

    var darthSidious = {
        name: "Darth Sidious",
        health: 150,
        defendingDamage: 20 
    };

    var darthMaul = {
        name: "Darth Maul",
        health: 180,
        defendingDamage: 25
    };

    // ----- state variables ---------
    var charSelected = false; 
    var enemySelected = false;


    console.log("game.js read");


    $("#attack-btn").on("click", function() {

    });

    $("#reset-btn").on("click", function() {
        // refresh/reload page to reset everyhting back to where they were
        location.reload();
    });

    // select character 
    $("#char-group").on("click", "#obi-wan-kenobi", function() {
        console.log("Obi-Wan Kenobi clicked");
        // character selected
        charSelected = true;
        console.log("character selected");

        // move to your-char-area
        $(this).appendTo("#your-char-area");
        // move everyone else to enemies-to-attack
        $("#char-group").appendTo("#enemies-to-attack");

    }).on("click", "#luke-skywalker", function() {
        if (charSelected = true) {
            // enemy selected
            enemySelected = true;
            console.log("enemy selected");
            // Luke Skywalker is in Enemies Avaliable To Attack
            // move to defender-area
            $(this).appendTo("#defender-area");
        }

    }).on("click", "#darth-sidious", function() {

    }).on("click", "#darth-maul", function() {

    });

    // 
});






