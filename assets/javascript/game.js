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
    var jarJarBinks = new Player("Jar Jar Binks", 190, 28);

    // ----- state variables ---------
    var playerSelected = false; 
    var enemySelected = false;
    var attackPower = 1; // increments by 1 after every attack
    
    var enemiesLeft = 4;

    // reference to Player object
    var userPlayer;
    var enemyPlayer;

    // DOM to be manipulated in various locations by jQuery
    var userElem; 
    var enemyElem; 

    // ----- main logic -----
    // hide reset button on game start
    $("#reset-btn").hide();

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

            if (enemiesLeft > 0) {
                // enemy not selected
                setGameInfo("No enemy here.");
            }
    
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
            $("#your-char-area").append(userElem);
            // move other players to enemeies-to-attack
            var groupElem = $("#char-group");
            $("#enemies-to-attack").append(groupElem);
            // remove char-gallery at top of game
            $("#char-gallery").remove();

            // change look of enemies available to attack chacter boxes
            groupElem.find(".char").css({
                'background-color' : 'red',
                'border-color' : 'black'
            });

            // assign character to user
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
                // var defenderElem = $("#defender-area")
                $("#defender-area").append(enemyElem);

                // assign player to enemy
                enemyPlayer = matchFromId(enemyElem.attr('id'));

                // change look of character box
                enemyElem.css({
                    'background-color' : 'black',
                    'border-color' : 'green',
                    'color' : 'white'
                });

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
            case "jar-jar-binks":
                return jarJarBinks;    
            default: 
                console.log("player could not be matched");   
        }
    }

    function attack() {

        // update user and enemy health based on attack and defending damage
        enemyPlayer.health -= userPlayer.attackDamage();
        console.log("enemy player health: " + enemyPlayer.health + " after " + userPlayer.attackDamage() + " damage from user");
        
        // if enemy is not dead, commence with his attack
        if (enemyPlayer.health >= 0) {
            userPlayer.health -= enemyPlayer.defendingDamage;
            console.log("user player health: " + userPlayer.health + " after " + enemyPlayer.defendingDamage + " damage from enemy");
        }
        
        // update character boxes
        userElem.find(".health").text(userPlayer.health);
        enemyElem.find(".health").text(enemyPlayer.health);

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
        $("#attack-btn").hide();
        $("#reset-btn").show();
    }

    function gameLost() {

        console.log("game lost");
        setGameInfo("You have been defeated...GAME OVER!!!");
        $("#attack-btn").hide();
        $("#reset-btn").show();
    }
    

    function setGameInfo(str) {

        $("#game-info").text(str);
    }

});






