console.log("Hello, World!");

document.addEventListener("DOMContentLoaded", function() {      
    const gameContainer = document.getElementById("world");
    const ground = document.getElementById("ground");
    
    // async function moveGround() {
    //     for(let i = 0; i < 10; i++) {
    //         ground.style.left = (i * 50) + "px";
    //         await sleep(1000);
    //         console.log("Ground moved to: " + ground.style.left);
    //     }
    // }
    
    // moveGround();
    let dx = 5;
    console.log("Ground initial position: " + getComputedStyle(ground).left);
    console.log("ground right edge: " + getComputedStyle(ground).right);
    // function groundMove() {
    //     ground.style.left = (parseInt(getComputedStyle(ground).left) - dx) + "px";
    //     setTimeout(groundMove, 60);
    // }
    function groundMove() {
        ground.style.left = (parseInt(ground.style.left || 0) - dx) + "px";
        // setTimeout(groundMove, 50);
    }

    groundMove()




    const dino = document.getElementById("dino");

    const run0 = document.createElement("img");
    run0.src = "imgs/dino-run-0.png";
    run0.alt = "dino running";
    run0.style.position = "absolute";
    run0.style.display = "none";
    const run1 = document.createElement("img");
    run1.src = "imgs/dino-run-1.png";
    run1.alt = "dino running";
    run1.style.position = "absolute";
    run1.style.display = "none";

    gameContainer.appendChild(run0);
    gameContainer.appendChild(run1);

    
    
    let frame = 0;
    function runanimation () {
        if (frame == 0) {
            dino.src = run0.src;
            frame = 1;
        }
        else {
            dino.src = run1.src;
            frame = 0;
        }
        console.log("ran")
        // setTimeout(runanimation, 70)
    }
    
    runanimation();


    
})