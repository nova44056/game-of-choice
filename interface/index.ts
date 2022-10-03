import * as PIXI from "pixi.js";

interface ICharacterMovementAnimation {
  down: PIXI.Texture[];
  up: PIXI.Texture[];
  left: PIXI.Texture[];
  right: PIXI.Texture[];
}

interface ICharacterAnimatedSprite {
  down: PIXI.AnimatedSprite;
  up: PIXI.AnimatedSprite;
  left: PIXI.AnimatedSprite;
  right: PIXI.AnimatedSprite;
}

interface Velocity {
  x: number;
  y: number;
}

interface Coordinate {
  x: number;
  y: number;
}

interface Grid {
  row: number;
  column: number;
}

export {
  ICharacterMovementAnimation,
  Velocity,
  Coordinate,
  Grid,
  ICharacterAnimatedSprite,
};
