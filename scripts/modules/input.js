// import { global } from "./global.js";

// function move(event) {
//     if (global.moving == true) {
//         if (event.key == "w" || event.key == " " || event.key == "ArrowUp") {
//             global.playerObject.setJumpForce(7);
//             if (global.playerObject.physicsData.isGrounded == true){
//                 global.playerObject.switchCurrentSprites(8, 15)
//             }
//         }
//     }

//     //Godmode
//     if (event.key == "g") {
//         global.collisionOff = !global.collisionOff;
//     }
// }



// document.addEventListener("keydown", move);
import { global } from "./global.js";

// Function to handle jumping
function jump() {
    if (global.moving) {
        global.playerObject.setJumpForce(7);
        if (global.playerObject.physicsData.isGrounded == true){
            global.playerObject.switchCurrentSprites(8, 15)
        }
    }
}

// Event handler for keyboard input
function move(event) {
    if (event.key === "w" || event.key === " " || event.key === "ArrowUp") {
        jump();
    }

    if (event.key === "g") {
        global.collisionOff = !global.collisionOff; // Toggle Godmode for desktop
    }
}

// Variable to track whether the touch/click is active
let isTouching = false;

// Add full-screen touch event for mobile and click for desktop
document.addEventListener("DOMContentLoaded", function () {
    // Prevent default actions (e.g., scrolling or zooming on mobile)
    document.body.addEventListener("touchstart", function (event) {
        event.preventDefault(); // Prevent default touch behavior
        isTouching = true; // Mark that the screen is being touched
    }, { passive: false });

    document.body.addEventListener("touchend", function () {
        isTouching = false; // Mark that the touch has ended
    });

    // Listen for clicks on the whole screen (for desktop)
    document.body.addEventListener("mousedown", function () {
        isTouching = true; // Mark that the mouse is clicked
    });

    document.body.addEventListener("mouseup", function () {
        isTouching = false; // Mark that the mouse has been released
    });

    // Continuously jump as long as the screen is being touched or clicked
    function continuousJump() {
        if (isTouching) {
            jump(); // Trigger jump action
        }
        requestAnimationFrame(continuousJump); // Call the function again to keep checking
    }

    // Start the continuous jump check
    continuousJump();
});

document.addEventListener("keydown", move);