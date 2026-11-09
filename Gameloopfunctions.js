import { GameWorld, gravity, dinoElement, groundElement1, groundElement2, dino, ground1, ground2, ground, keys, GameOversetter, cactuses, iscolliding, scoreUpdate} from "./objects.js";


export function update(deltaTime) {
    // PLAYER INPUT
    function handleInput() {
        if (keys["space"] && dino.is_grounded) {
            dino.velocity_y = -dino.jump_velocity; // negative because the y axis is inverted in the browser (0,0 is top left corner)
            dino.is_grounded = false;
            dino.jumping = true;
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
        }
        ground1.x -= ground1.speed_x * deltaTime; 
        ground2.x -= ground2.speed_x * deltaTime; // deltaTime is the time elapsed since the last frame in seconds; (formula is d = s * t).

        if (dino.is_grounded && !dino.jumping) {
            dino.animation_frame_counter += deltaTime; // increment the animation frame counter by the time elapsed since the last frame in seconds

            // Dino Animations and Movement - we change the dino's animation frame here but the rendering of the dino's animation happens in the render function
            if (dino.animation_frame_counter >= dino.animation_rate_control) {
                if (dino.animation_frame == 0) {
                    dino.animation_frame = 1;
                }
                else {
                    dino.animation_frame = 0;
                } 
                dino.animation_frame_counter -= dino.animation_rate_control; // for smother animation, better than setting it to 0.
            }
        }

        // GRAVITY FROM JUMPING (it's constantly pulling the dino down, the reason it shouldn't go below the ground is because we check for collision with the ground and set it's y to be equal to the ground's top)
        dino.velocity_y += gravity * deltaTime;
        dino.y += dino.velocity_y * deltaTime;

        // CACTUS MOVEMENT
        for (const cactus of cactuses) {
            cactus.update(deltaTime, cactuses);  
        }
        
    }

    function collisions() {
        // Collision with the ground 
        if (dino.y + dino.height >= ground.y + 20) { // +20 because the ground is 20px thick, we want the dino to be on top of the ground, not inside it.
            dino.y = ground.y - dino.height + 20; // reset dino's y position to be on top of the ground
            dino.is_grounded = true;
            dino.jumping = false;
            dino.velocity_y = 0;
        }

        // collision with cactus (not implemented yet) 
        for (const cactus of cactuses) {
            if (iscolliding(dino, cactus)) {
                GameOversetter(true); // set GameOver to true
                console.log("Game Over");
            }
        }

    }
    handleInput()
    updateMovement()
    collisions()
    }

export function render() {
    // Render ground
    groundElement1.style.left = ground1.x + "px";
    groundElement2.style.left = ground2.x + "px";

    // Render dino
    dinoElement.style.left = dino.x + "px";
    dinoElement.style.top = dino.y + "px";

    // Render dino animation
    dinoElement.src = dino.movement_srcs[dino.animation_frame];

    // Render cactuses
    for (const cactus of cactuses) {
        cactus.render();
    }
}

export function updateScore(deltaTime) {
    scoreUpdate(deltaTime);
}