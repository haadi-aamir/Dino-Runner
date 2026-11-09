import { keys, init, START, GameOver, startScreen, STARTsetter, resetCactuses, resetScore } from "./objects.js";
import { update, render, updateScore } from "./Gameloopfunctions.js";

document.addEventListener("DOMContentLoaded", function() {
    // INITIALIZING GAME 
    init()


    // KEYBOARD INPUT HANDELING, we don't need this in the game loop because we are using event listeners to handle input.
    document.addEventListener("keydown", function(event) {
        if (event.code === "Space") {
            keys["space"] = true;
        }
    });
    document.addEventListener("keyup", function(event) {
        if (event.code === "Space") {
            keys["space"] = false;
        }
    });

    // GAME LOOP
    let lastTime = null;
    let deltaTime = 0;
    function GameLoop(currentTime) {
        if (GameOver === true) {
            init(); // reset the game state
            resetCactuses(); // reset the cactuses
            resetScore(); // reset the score
            requestAnimationFrame(GameLoop); // restart the game loop
            return; // stop the game loop
        }

        if (START === false) {
            lastTime = currentTime; // reset lastTime to the current time so that deltaTime is 0 when the game starts
            if (keys["space"]) {
                STARTsetter(true);
                startScreen.style.display = "none"; // hide the start screen
            }
            requestAnimationFrame(GameLoop);
            return; // don't update or render the game if it hasn't started yet
        }

        if (lastTime != null) {
            deltaTime = (currentTime - lastTime) / 1000; // convert to seconds because currentTime is in milliseconds and we want deltaTime in seconds for our speed calculations
        }
        lastTime = currentTime;
        update(deltaTime);
        render(deltaTime);
        updateScore(deltaTime);
        requestAnimationFrame(GameLoop);
    }
    GameLoop();
})