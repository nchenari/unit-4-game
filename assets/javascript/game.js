$(document).ready(function() {
    // -------------------------- game variables ---------------------------
    
    // ---- players -------------------
    // player object constructor
    function Player(name, health, defendingDamage) {
        this.name = name;
        this.health = health;
        this.defendingDamage = defendingDamage;
        this.attackDamage = function() {
            return defendingDamage * attackPower;
        }
    }

    // players
    var obiWanKenobi = new Player("Obi-Wan Kenobi", 120, 8);
    var lukeSkywalker = new Player("Luke Skywalker", 100, 5);
    var darthSidious = new Player("Darth Sidious", 150, 20);
    var darthMaul = new Player("Darth Maul", 180, 25);

    // ----- state variables ---------
    var playerSelected = false; 
    var enemySelected = false;
    var attackPower = 1; // increments by 1 after every attack
    
    var enemiesLeft = 3;

    // reference to Player object
    var userPlayer;
    var enemyPlayer;

    // DOM to be manipulated in various locations by jQuery
    var userElem; 
    var enemyElem; 

    // ----- main logic -----

    $("#attack-btn").on("click", function() {
        // fight logic here
        if (playerSelected == true && enemySelected == true) {

                // attack takes place
                attack();

                if (userPlayer.health >= 0 && enemyPlayer.health >= 0) {
            
                    // battle still on, set game info based on battle stats
                    setGameInfo("You attacked " + enemyPlayer.name + " for " + userPlayer.attackDamage() + " damage." 
                        + "\n" + enemyPlayer.name + " attacked you back for " + enemyPlayer.defendingDamage + " damage.");

                } else if (userPlayer.health <= 0) { 

                    // game lost
                    gameLost();

                } else if (enemyPlayer.health <= 0) { 

                    // current enemy defeated
                    enemyDefeated();

                    if (enemiesLeft == 0) {
                        gameWon();
                    } else {
                        // inform user of enemy defeat
                        setGameInfo("You have defeated " + enemyPlayer.name + ", you can choose to fight another enemy.");
                    }

                }

                // increment attackPower for next attack 
                attackPower++;        
        } else if (playerSelected == true && enemySelected == false){

            // enemy not selected
            setGameInfo("No enemy here.");
        } else {

            // player not selected 
            setGameInfo("Please select a character!");
        }
    });

    $("#reset-btn").on("click", function() {
        // refresh/reload page to reset everything back to where they were and at default values
        location.reload();
    });

    // select player 
    $("#char-group").on("click", ".char", function() {

        // check if no user player is already selected
        if (playerSelected == false) {
            // store user player element reference
            userElem = $(this);
            console.log("selected user player id: " + userElem.attr('id'));
            // move selection to your-char-area
            userElem.appendTo("#your-char-area");
            // move other players to enemeies-to-attack
            $("#char-group").appendTo("#enemies-to-attack");

            // assign player to user
            userPlayer = matchFromId(userElem.attr('id'));

            // set user player selected flag to true
            playerSelected = true;
            console.log("user has selected a player to use");
        } else { // user player has already been selected

            // check if no enemy is selected
            if (enemySelected == false) {
                // store enemy player element reference
                enemyElem = $(this);
                console.log("selected enemy player id: " + enemyElem.attr('id'));
                // move to defender-area to prepare for battle
                enemyElem.appendTo("#defender-area");

                // assign player to enemy
                enemyPlayer = matchFromId(enemyElem.attr('id'));

                // set enemy player selected flag to true
                enemySelected = true;
                console.log("user has selected an enemy to battle");

                // clear game info
                setGameInfo("");
            } else { // enemy player has already been selected
                // do nothing
            }
        }

    });

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
                return darthMaul;
            default: 
                console.log("player could not be matched");   
        }
    }

    function attack() {
        // update user and enemy health based on attack and defending damage
        userPlayer.health -= enemyPlayer.defendingDamage;
        console.log("user player health: " + userPlayer.health + " after " + enemyPlayer.defendingDamage + " damage from enemy");
        enemyPlayer.health -= userPlayer.attackDamage();
        console.log("enemy player health: " + enemyPlayer.health + " after " + userPlayer.attackDamage() + " damage from user");

        // update character boxes
        userElem.find("health").text(userPlayer.health);


    }


    function enemyDefeated() {
        console.log("enemy defeated");

        // remove defeated enemy from defender area
        enemyElem.remove();

        // reduce # players left
        enemiesLeft--;
        console.log("number of enemies left: " + enemiesLeft);

        // allow user to select a new enemy
        enemySelected = false;
    }

    function gameWon() {
        console.log("game won");
        setGameInfo("You Won!!! GAME OVER!!!");
    }

    function gameLost() {
        console.log("game lost");
        setGameInfo("You have been defeated...GAME OVER!!!");
    }
    

    function setGameInfo(str) {
        $("#game-info").text(str);
    }

});






