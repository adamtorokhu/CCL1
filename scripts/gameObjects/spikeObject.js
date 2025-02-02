import { BaseGameObject } from "./baseGameObject.js";
import { global } from "../modules/global.js";

class SpikeObject extends BaseGameObject {

    reactToCollision = function (collidingObject) {
        if (global.collisionOff == false) {
            if (collidingObject.name === "Player") {
                global.moving = false;
                global.restart = true;
                this.x
                this.y
            }
        }
    };

    getBoxBounds = function () {
        let bounds = {
            left: this.x + 10,
            right: this.x + this.width - 10,
            top: this.y + 5,
            bottom: this.y + this.height
        }
        return bounds;
    };

    animationData = {
        "animationSprites": [],
        "timePerSprite": 0.1,
        "currentSpriteElapsedTime": 0,
        "firstSpriteIndex": 0,
        "lastSpriteIndex": 5,
        "currentSpriteIndex": 0
    };

    update = function () {
        if (global.moving) {
            this.storePositionOfPreviousFrame();
            this.x += this.xVelocity * global.deltaTime;
        }
    };

    constructor(x, y, width, height) {
        super(x, y, width, height);
        // this.loadImages(["./images/illuminati.png"]);
        this.loadImagesFromSpritesheet("./images/spike.png", 3, 2);
    }
}

export { SpikeObject };
