import { global } from "./global.js";

function move(event) {
    if (global.moving == true) {
        if (event.key == "w" || event.key == " " || event.key == "ArrowUp") {
            global.playerObject.setJumpForce(7);
            if (global.playerObject.physicsData.isGrounded == true){
                global.playerObject.switchCurrentSprites(8, 15)
            }
        }
    }

    //Godmode
    if (event.key == "g") {
        global.collisionOff = !global.collisionOff;
    }
}



document.addEventListener("keydown", move);