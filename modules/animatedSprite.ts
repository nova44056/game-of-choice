import * as PIXI from "pixi.js";

export class AnimatedSprite {
  private sprite: PIXI.AnimatedSprite | null = null;

  constructor() {}

  getSprite(): PIXI.AnimatedSprite {
    return this.sprite as PIXI.AnimatedSprite;
  }

  setSprite(sprite: PIXI.AnimatedSprite) {
    this.sprite = sprite;
  }
}
