import { BaseGameObject } from "./baseGameObject.js";
import { global } from "../modules/global.js";
import { Player } from "./player.js";


class BlockObject extends BaseGameObject {
    blockGravityForces = true;

    getBoxBounds = function () {
        let bounds = {
            left: this.x,
            right: this.x + this.width,
            top: this.y,
            bottom: this.y + 15
        }
        return bounds;
    };


    reactToCollision = function (collidingObject)   {
        if (global.collisionOff == false) {
        if (collidingObject.name == "Player") {
            global.moving = false;
            global.restart = true;
            this.x;
        }
    }}


    update = function () {
            if (global.moving) {
                this.x += this.xVelocity * global.deltaTime;


                // this.storePositionOfPreviousFrame();
                // this.x -= 1000 * global.deltaTime;
    
                // Wrap
            // if (this.x + this.width < 0) {
            //         this.x = global.canvas.width;
            // };
        }
    }

    constructor (x, y, width, height) {
        super(x, y, width, height);
        // this.loadImages(["./images/wall.jpg"]);
        this.loadImages(["./images/platform.png"]);
    }
}

export {BlockObject};