import { BaseGameObject } from "./baseGameObject.js";
import { global } from "../modules/global.js";

class Player extends BaseGameObject {
    name = "Player";
    yVelocity = 0;
    useGravityForces = true;

    getBoxBounds = function () {
        let bounds = {
            left: this.x +10,
            right: this.x + this.width - 25,
            top: this.y + 20,
            bottom: this.y + this.height
        }
        return bounds;
    }

    update = function() {
            this.y += this.yVelocity * global.deltaTime;
            if (this.animationData.currentSpriteIndex === 15) {
                global.playerObject.switchCurrentSprites(0, 7);
            }
            // console.log(this.animationData.currentSpriteIndex)
    }

    animationData = {
        "animationSprites": [],
        "timePerSprite": 0.08,
        "currentSpriteElapsedTime": 0,
        "firstSpriteIndex": 0,
        "lastSpriteIndex": 7,
        "currentSpriteIndex": 0
    };

    constructor(x, y, width, height) {
        super(x, y, width, height);
        // this.loadImages(["./images/playery.png"]);
        this.loadImagesFromSpritesheet("./images/player.png", 4, 4);
    }
}

export {Player}