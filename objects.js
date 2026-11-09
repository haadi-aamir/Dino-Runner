export const GameWorld = document.getElementById("world");
export const startScreen = document.getElementById("start-screen");
export const scoreElement = document.getElementById("score");
export const dinoElement = document.getElementById("dino")
export const groundElement1 = document.getElementById("ground-1")
export const groundElement2 = document.getElementById("ground-2")
export const gravity = 1150; // the grvity will pull 1150 pixels per second. 
export let GameOver;
export let START;
export let score;
const GAME_SPEED = 350; // this should help keep the speed of the cacuts, ground and other moving objects consistent.


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
    speed_x: GAME_SPEED, // this represents the speed at which the ground should move to the left (in pixels per second) the formula is d = s * t. this is the speed.
}
export const ground2 = {
    x: ground1.width, // start the second ground right after the first one
    y: 0,
    width: groundElement2.offsetWidth,
    height: groundElement2.offsetHeight,
    speed_x: GAME_SPEED, // this represents the speed at which the ground should move to the left (in pixels per second) the formula is d = s * t. this is the speed.
}

export const ground = { // this is a logic objects that represents the ground. it is not a DOM element. the ground1 and ground2 objects are for visuals only this ground object is for logic (collision detection, etc.)
    y: 0,
    height: 0,
}

export let keys = {
    space: false, // keys are stored as booleans. this is useful because keys can be held down and they regiser for as long as they are held down. this is useful for movement and jumping.
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive
}

const MIN_CACTUS_GAP = 300; // minimum gap between cactuses in pixels
const MAX_CACTUS_GAP = 800; // maximum gap between cactuses in pixels
export class Cactus {
    constructor(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.speed_x = GAME_SPEED;

        // Create a DOM element for the cactus
        this.element = document.createElement("img");
        this.element.src = "imgs/cactus.png";
        this.element.alt = "cactus";
        this.element.classList.add("cactus");
        this.element.style.position = "absolute";
        this.element.style.left = this.x + "px";
        this.element.style.top = this.y + "px";
        this.element.style.width = this.width + "px";
        this.element.style.height = this.height + "px";
        this.element.style.zIndex = "1"; // Ensure the cactus is behind the dino

        GameWorld.appendChild(this.element);

    }

    rightMostCactus(cactuses) { 
        let rightMost = cactuses[0];
        for (let i = 1; i < cactuses.length; i++) {
            if (cactuses[i].x > rightMost.x) {
                rightMost = cactuses[i];
            }
        }
        return rightMost;
    }

    update(deltaTime, cactuses) {
        if (this.x + this.width < 0) {
            // When the cactus moves off the left we position it behind the cactus that's currently furthest to the right.
            let rightMost = this.rightMostCactus(cactuses);
            this.x = rightMost.x + rightMost.width + getRandomInt(MIN_CACTUS_GAP, MAX_CACTUS_GAP);
            this.width = getRandomInt(30, 50); // random width between 30 and 50 pixels
            this.height = getRandomInt(60, 100); // random height between 60 and 100 pixels
            this.y = GameWorld.offsetHeight / 2 - this.height + 20; // position the cactus on the ground (+20 because the ground is 20px thick)
            this.element.style.width = this.width + "px";
            this.element.style.height = this.height + "px";
        }
        this.x -= this.speed_x * deltaTime;
    }

    render() {
        this.element.style.left = this.x + "px";
        this.element.style.top = this.y + "px";
    }
}

export function resetCactuses() {
    cactuses.forEach(cactus => {
        GameWorld.removeChild(cactus.element); // remove the cactus element from the DOM
    });
    cactuses = [
        new Cactus(GameWorld.offsetWidth + getRandomInt(300, 500), GameWorld.offsetHeight / 2 - 60, 50, 80),
        new Cactus(GameWorld.offsetWidth + getRandomInt(800, 1200), GameWorld.offsetHeight / 2 - 70, 40, 90),
        new Cactus(GameWorld.offsetWidth + getRandomInt(1500, 2000), GameWorld.offsetHeight / 2 - 80, 30, 100),
    ]
}

export let cactuses = [
    new Cactus(GameWorld.offsetWidth + getRandomInt(300, 500), GameWorld.offsetHeight / 2 - 60, 50, 80),
    new Cactus(GameWorld.offsetWidth + getRandomInt(800, 1200), GameWorld.offsetHeight / 2 - 70, 40, 90),
    new Cactus(GameWorld.offsetWidth + getRandomInt(1500, 2000), GameWorld.offsetHeight / 2 - 80, 30, 100),
    ]
    
export function iscolliding(rect1, rect2) {
    return (
        rect1.x < rect2.x + rect2.width &&
        rect1.x + rect1.width > rect2.x &&
        rect1.y < rect2.y + rect2.height &&
        rect1.y + rect1.height > rect2.y
    );
}

export function GameOversetter(value) {
    GameOver = value;
}

export function STARTsetter(value) {
    START = value;
}
export function resetScore() {
    score = 0;
}

export function scoreUpdate(deltaTime) {
    score += deltaTime * 10; // increase the score by 10 points per second
    scoreElement.textContent = Math.floor(score); // update the score element with the new score
}
export function init() {
    GameOver = false;
    START = false;
    score = 0;
    startScreen.style.display = "block"; // show the start screen

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
    dino.velocity_y = 0;
    dino.is_grounded = true;
    dino.jumping = false;
    dino.animation_frame = 0;
    dino.animation_frame_counter = 0;
    dinoElement.style.left = dino.x + "px";
    dinoElement.style.top = dino.y + "px";
}
