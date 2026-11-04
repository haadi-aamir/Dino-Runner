import { GameWorld, dinoElement, groundElement1, groundElement2, dino, ground1, ground2 } from "./objects.js";

document.addEventListener("DOMContentLoaded", function() {
    console.log("main.js")

    // INITIALIZING GAME 
    function init() {
        ground1.x = 0;
        ground1.y = GameWorld.offsetHeight / 2;
        groundElement1.style.left = ground1.x + "px";
        groundElement1.style.top = ground1.y + "px";

        ground2.x = ground1.width;
        ground2.y = GameWorld.offsetHeight / 2;
        groundElement2.style.left = ground2.x + "px";
        groundElement2.style.top = ground2.y + "px";

        dino.x = 30;
        dino.y = ground1.y - dino.height + 20;
        dinoElement.style.left = dino.x + "px";
        dinoElement.style.top = dino.y + "px";
    }
    init()

    let keys = {
        space: false, // keys are stored as booleans. this is useful because keys can be held down and they regiser for as long as they are held down. this is useful for movement and jumping.
    }
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

    let lastTime = null;
    let deltaTime = 0;
    function GameLoop(currentTime) {
        if (lastTime != null) {
            deltaTime = (currentTime - lastTime) / 1000; // convert to seconds because currentTime is in milliseconds and we want deltaTime in seconds for our speed calculations
        }
        lastTime = currentTime;
        update();
        render();
        requestAnimationFrame(GameLoop);
    }

    GameLoop()

    function update() {
        // PLAYER INPUT
        function handleInput() {
            if (keys["space"]) {
                console.log("space pressed")
            }
        }
        
        function updateMovement() {
            // Ground movement (it's continuous, so we just move it left)
            if (ground1.x <= -ground1.width) {
                ground1.x = ground2.x + ground2.width; // reset ground1 to the right of ground2
                console.log("Ground 1 reset to: " + ground1.x);
            }
            if (ground2.x <= -ground2.width) {
                ground2.x = ground1.x + ground1.width; // reset ground2 to the right of ground1
                console.log("Ground 2 reset to: " + ground2.x);
            }
            ground1.x -= ground1.speed_x * deltaTime; // deltaTime is the time elapsed since the last frame in seconds; (formula is d = s * t).
            ground2.x -= ground2.speed_x * deltaTime; // deltaTime is the time elapsed since the last frame in seconds; (formula is d = s * t).

            dino.animation_frame_counter += 1;

            // Dino Animations and Movement
            if (dino.animation_frame_counter >= dino.animation_frame_control) {
                if (dino.animation_frame == 0) {
                    dinoElement.src = dino.movement_srcs[0];
                    dino.animation_frame = 1;
                }
                else {
                    dinoElement.src = dino.movement_srcs[1];
                    dino.animation_frame = 0;
                } 
                dino.animation_frame_counter = 0;
            }
        }
        handleInput()
        updateMovement()
    }
    
    function render() {
        // Render ground
        groundElement1.style.left = ground1.x + "px";
        groundElement2.style.left = ground2.x + "px";
    }
})