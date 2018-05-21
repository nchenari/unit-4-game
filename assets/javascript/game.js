$(document).ready(function() {
    // -------------------------- game variables ---------------------------
    

    // ----- state variables ---------
    var playerSelected = false; 
    var enemySelected = false;
    var attackPower = 1; // increments by 1 every attack

    var userPlayer;
    var enemyPlayer;

    // ---- players -------------------
    // player object constructor
    function Player(name, health, defendingDamage, attackDamage) {
        this.name = name;
        this.health = health;
        this.defendingDamage = defendingDamage;
        this.attackDamage = function() {
            return defendingDamage * attackPower;
        }
    }

    var obiWanKenobi = {
        name: "Obi-Wan Kenobi",
        health: 120,
        defendingDamage: 8,
        attackDamage: 8 
    };

    var lukeSkywalker = {
        name: "Luke Skywalker",
        health: 100,
        defendingDamage: 5,
        attackDamage: 5
    };

    var darthSidious = {
        name: "Darth Sidious",
        health: 150,
        defendingDamage: 20,
        attackDamage: 20 
    };

    var darthMaul = {
        name: "Darth Maul",
        health: 180,
        defendingDamage: 25,
        attackDamage: 25 
    };

    // ----- main logic -----
    console.log("game.js read");


    $("#attack-btn").on("click", function() {

    });

    $("#reset-btn").on("click", function() {
        // refresh/reload page to reset everyhting back to where they were
        location.reload();
    });

    // select player 
    $("#char-group").on("click", ".char", function() {
        console.log("selected player id: " + playerId);
        var playerId = $(this).attr('id');

        // check if no user player is already selected
        if (playerSelected == false) {

            // move selection to your-char-area
            $(this).appendTo("#your-char-area");
            // move other players to enemeies-to-attack
            $("#char-group").appendTo("#enemies-to-attack");

            // assign player to user
            userPlayer = matchFromId(playerId);

            // set user player selected flag to true
            playerSelected = true;
            console.log("user has selected a player to use");
        } else { // user player has already been selected

            // check if no enemy is selected
            if (enemySelected == false) {
                
                // move to defender-area to prepare for battle
                $(this).appendTo("#defender-area")

                // set enemy player selected flag to true
                enemySelected = true;
                console.log("user has selected an enemy to battle");
            } else { // enemy player has already been selected
                // do nothing
            }
        }

    });

    




    $("#char-group").on("click", "#obi-wan-kenobi", function() {
        // console.log("Obi-Wan Kenobi clicked");
        // // player selected
        // playerSelected = true;
        // console.log("player selected");

        // // move to your-char-area
        // $(this).appendTo("#your-char-area");
        // // move everyone else to enemies-to-attack
        // $("#char-group").appendTo("#enemies-to-attack");

    }).on("click", "#luke-skywalker", function() {
        if (playerSelected == true) {
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

    gameWon();

    // ------- functions ----------
    function matchFromId(id) {
        switch (id) {
            case "obi-wan-kenobi":
                return obiWanKenobi;
            case "luke-skywalker":
                return lukeSkywalker;
            case "darth-sidious":
                return darthSidious;
            case "darth-maul":
                return darthSidious;
            default: 
                console.log("player could not be matched")   
        }
    }

    function attack() {
        

        // increase attackPower for next attack
        attackPower++;
    }


    function enemyDefeated() {
        console.log("enemy defeated");

        // remove defeated enemy from defender area



        // allow user to select a new enemy
        enemySelected = false;
    }

    function gameWon() {
        console.log("game won");
        setGameInfo("You Won!!! GAME OVER!!!");
    }

    function gameLost() {
        console.log("game lost");
        
    }

    function matchWon() {
        console.log("match won");
        setGameInfo("You have defeated ______, you can choose to fight another enemy.");
    }


    function setGameInfo(str) {
        $("#game-info").text(str);
    }

});






