import { keys, init, dino } from "./objects.js";
import { update, render } from "./Gameloopfunctions.js";

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
        if (lastTime != null) {
            deltaTime = (currentTime - lastTime) / 1000; // convert to seconds because currentTime is in milliseconds and we want deltaTime in seconds for our speed calculations
        }
        lastTime = currentTime;
        update(deltaTime);
        render(deltaTime);
        requestAnimationFrame(GameLoop);
    }

    GameLoop()
    
})