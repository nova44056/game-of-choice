import * as PIXI from "pixi.js";
export class Game {
    constructor() {
        this.app = new PIXI.Application({
            width: window.innerWidth,
            height: window.innerHeight,
        });
        document.body.appendChild(this.app.view);
    }
}
