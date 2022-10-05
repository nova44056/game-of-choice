import * as PIXI from "pixi.js";
import { Coordinate, Velocity } from "../interface";
import { getCharacterMovementAnimation } from "../utils";

//You can put export before the class template
export class Character {
  private app: PIXI.Application;
  private sprite: PIXI.AnimatedSprite | undefined;

  private ANIMATION_SPEED: number = 0.5;

  private velocity: Velocity = {
    x: 0,
    y: 0,
  };

  constructor(app: PIXI.Application) {
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

    //Ad the character to its conatiner
    characterContainer.addChild(character);

    //add the character container to the stage of the app.
    this.app.stage.addChild(characterContainer);

    //sets the sprite to the player
    this.sprite = character;
  }

  //returns the sprite
  public getSprite(): PIXI.AnimatedSprite {
    return this.sprite as PIXI.AnimatedSprite;
  }

  public setSpriteCoordinate(coordinate: Coordinate) {
    this.sprite!.x = coordinate.x;
    this.sprite!.y = coordinate.y;
  }

  public setSpriteTextures(textures: PIXI.Texture[]): void {
    this.sprite!.textures = textures;
  }

  public getVelocity(): Velocity {
    return this.velocity;
  }

  public setVelocity(velocity: Velocity): void {
    this.velocity = velocity;
  }
}
