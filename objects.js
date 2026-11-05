export const GameWorld = document.getElementById("world");
export const dinoElement = document.getElementById("dino")
export const groundElement1 = document.getElementById("ground-1")
export const groundElement2 = document.getElementById("ground-2")

export const gravity = 1000; // the grvity will pull 500 pixels per second. 

export const dino = {
    x: 0,
    y: 0,
    width: dinoElement.offsetWidth,
    height: dinoElement.offsetHeight,
    stationary_src: dinoElement.src,
    movement_srcs: ["imgs/dino-run-0.png", "imgs/dino-run-1.png"],
    animation_frame: 0,
    animation_frame_counter: 0, 
    animation_rate_control: 0.1, //i.e 0.15 seconds per frame. used to control how fast the animation plays. represents seconds per frame. the lower the number, the faster the animation plays. the higher the number, the slower the animation plays.
    velocity_y: 0, 
    is_grounded: true,
    jumping: false,
    jump_height: 600, // the height the dino will jump in pixels. this is used to calculate the initial velocity needed to reach that height.
}

export const ground1 = {
    x: 0,
    y: 0,
    width: groundElement1.offsetWidth,
    height: groundElement1.offsetHeight,
    speed_x: 300, // this represents the speed at which the ground should move to the left (in pixels per second) the formula is d = s * t. this is the speed.
}
export const ground2 = {
    x: ground1.width, // start the second ground right after the first one
    y: 0,
    width: groundElement2.offsetWidth,
    height: groundElement2.offsetHeight,
    speed_x: 300, // this represents the speed at which the ground should move to the left (in pixels per second) the formula is d = s * t. this is the speed.
}

export const ground = { // this is a logic objects that represents the ground. it is not a DOM element. the ground1 and ground2 objects are for visuals only this ground object is for logic (collision detection, etc.)
    y: 0,
    height: 0,
}

export let keys = {
    space: false, // keys are stored as booleans. this is useful because keys can be held down and they regiser for as long as they are held down. this is useful for movement and jumping.
}

export class Cactus {
    constructor(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.speed_x = 300;

        // Create a DOM element for the cactus
        this.element = document.createElement("img");
        this.element.src = "imgs/cactus.png";
        this.element.alt = "cactus";
        this.element.style.position = "absolute";
        this.element.style.left = this.x + "px";
        this.element.style.top = this.y + "px";
        this.element.style.width = this.width + "px";
        this.element.style.height = this.height + "px";
        this.element.style.zIndex = "1"; // Ensure the cactus is behind the dino

        GameWorld.appendChild(this.element);
    }

    update(deltaTime) {
        if (this.x + this.width < GameWorld.offsetLeft) {
            // If the cactus has moved off the left side of the screen, reset its position to the right side
            this.x = GameWorld.offsetWidth;
        }
        this.x -= this.speed_x * deltaTime;
    }

    render() {
        this.element.style.left = this.x + "px";
        this.element.style.top = this.y + "px";
    }
}

export const cactuses = [
    new Cactus(GameWorld.offsetWidth, GameWorld.offsetHeight / 2 - 80, 50, 100),
];

export function init() {
    ground1.x = 0;
    ground1.y = GameWorld.offsetHeight / 2;
    groundElement1.style.left = ground1.x + "px";
    groundElement1.style.top = ground1.y + "px";

    ground2.x = ground1.width;
    ground2.y = GameWorld.offsetHeight / 2;
    groundElement2.style.left = ground2.x + "px";
    groundElement2.style.top = ground2.y + "px";

    ground.y = GameWorld.offsetHeight / 2; // logic ground object, y position is the same as the visual ground objects y position
    ground.height = 0;

    dino.x = 30;
    dino.y = ground1.y - dino.height + 20; // +20 because the ground is 20px thick, we want the dino to be on top of the ground, not inside it.
    dinoElement.style.left = dino.x + "px";
    dinoElement.style.top = dino.y + "px";
}