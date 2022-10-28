import * as PIXI from "pixi.js";
import { Coordinate, Velocity } from "../interface";
import { getCharacterMovementAnimation } from "../utils";
import { AnimatedSprite } from "./animatedSprite";

//You can put export before the class template
export class Character extends AnimatedSprite {
  private app: PIXI.Application;

  private ANIMATION_SPEED: number = 0.5;

  private velocity: Velocity = {
    x: 0,
    y: 0,
  };

  constructor(app: PIXI.Application) {
    super();
    this.app = app;
  }

  //loads the character
  public construct(assetPath: string): void {
    //animated sprite object in pixi.
    const character = new PIXI.AnimatedSprite(
      getCharacterMovementAnimation(assetPath).down
    );

    //creates a container for the character
    const characterContainer = new PIXI.Container();

    character.loop = true;
    character.animationSpeed = this.ANIMATION_SPEED;

    //add the character container to the stage of the app.
    this.app.stage.addChild(character);

    //sets the sprite to the player
    this.setSprite(character);
  }

  public setSpriteCoordinate(coordinate: Coordinate) {
    this.getSprite().x = coordinate.x;
    this.getSprite().y = coordinate.y;
  }

  public setSpriteTextures(textures: PIXI.Texture[]): void {
    this.getSprite().textures = textures;
  }

  public getVelocity(): Velocity {
    return this.velocity;
  }

  public setVelocity(velocity: Velocity): void {
    this.velocity = velocity;
  }
}
