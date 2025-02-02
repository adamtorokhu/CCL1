import { BaseGameObject } from "./baseGameObject.js";
import { global } from "../modules/global.js";


class Floor extends BaseGameObject {
    name = "Floor";
    blockGravityForces = true;
        

    update = function (){
        if(!global.gg){
        this.storePositionOfPreviousFrame();
        this.x += this.xVelocity * global.deltaTime;
        if (this.x + this.width < 1) {
                this.x += this.width * 2;
            };
        };
    };
    
    reactToCollision = function (collidingObject)   {
        if (collidingObject.name == "Player") {
            collidingObject.x = collidingObject.previousX;
            collidingObject.y = collidingObject.previousY;
        }
    }
    
    constructor (x, y, width, height) {
        super(x, y, width, height);
        this.loadImages(["./images/floor.png"]);
    }
}

export {Floor};