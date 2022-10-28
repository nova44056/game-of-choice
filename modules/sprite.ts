import * as PIXI from "pixi.js";
import data from "./test.json";

export class Sprite {
  private sprite: PIXI.Sprite | null = null;

  constructor() {
    console.log(data);
  }

  getSprite(): PIXI.Sprite {
    return this.sprite as PIXI.Sprite;
  }

  setSprite(sprite: PIXI.Sprite) {
    this.sprite = sprite;
  }
}
