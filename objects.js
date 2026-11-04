export const GameWorld = document.getElementById("world");
export const dinoElement = document.getElementById("dino")
export const groundElement1 = document.getElementById("ground-1")
export const groundElement2 = document.getElementById("ground-2")

export const dino = {
    x: 0,
    y: 0,
    width: dinoElement.offsetWidth,
    height: dinoElement.offsetHeight,
    stationary_src: dinoElement.src,
    movement_srcs: ["imgs/dino-run-0.png", "imgs/dino-run-1.png"],
    animation_frame: 0,
    animation_frame_counter: 0, 
    animation_frame_control: 5, // used to control how fast the animation plays. the higher the number, the slower the animation.
}
export const ground1 = {
    x: 0,
    y: 0,
    width: groundElement1.offsetWidth,
    height: groundElement1.offsetHeight,
    speed_x: 260, // this represents the speed at which the ground should move to the left (in pixels per second) the formula is d = s * t. this is the speed.
}
export const ground2 = {
    x: ground1.width, // start the second ground right after the first one
    y: 0,
    width: groundElement2.offsetWidth,
    height: groundElement2.offsetHeight,
    speed_x: 260, // this represents the speed at which the ground should move to the left (in pixels per second) the formula is d = s * t. this is the speed.
}