import { getCharacterMovementAnimation, getPlayerAssetPath } from "../utils";
import { Character } from "./character";
import * as PIXI from "pixi.js";

type Direction = "up" | "down" | "left" | "right";

export class CharacterController {
  private character: Character;
  private velocity: number;

  private prevKeyPressed: string | null = null;
  private currentKeyPressed: string | null = null;

  constructor(character: Character, velocity: number = 1) {
    this.character = character;
    this.velocity = velocity;
  }

  /**
   * Event listener method for player movement keydown events
   */

  public addKeyboardListeners(): void {
    window.addEventListener("keydown", (event) => {
      if (this.prevKeyPressed === null && this.currentKeyPressed === null) {
        this.currentKeyPressed = event.key;
      } else {
        this.prevKeyPressed = this.currentKeyPressed;
        this.currentKeyPressed = event.key;
      }

      setTimeout(() => {
        this.character.getSprite().animationSpeed = 0.15;
      }, 50);

      switch (event.key) {
        case "ArrowUp":
          // case "w":
          this.moveUp();
          break;
        case "ArrowDown":
          // case "s":
          this.moveDown();
          break;
        case "ArrowLeft":
          // case "a":
          this.moveLeft();
          break;
        case "ArrowRight":
          // case "d":
          this.moveRight();
          break;
      }
    });

    window.addEventListener("keyup", (event) => {
      this.character.getSprite().animationSpeed = 0.5;

      console.log(this.character.getSprite().animationSpeed);

      this.character.getSprite().gotoAndStop(0);
      this.character.setVelocity({
        x: 0,
        y: 0,
      });
    });
  }

  private updateSpriteMovementAnimation(direction: Direction): void {
    if (this.currentKeyPressed !== this.prevKeyPressed) {
      this.character.setSpriteTextures(
        getCharacterMovementAnimation(getPlayerAssetPath())[direction]
      );
    }
    this.character.getSprite().play();
  }

  /**
   * Moves the character up
   *
   * @See: ./utils/index.ts
   */
  public moveUp(): void {
    this.updateSpriteMovementAnimation("up");
    this.character.setVelocity({
      x: 0,
      y: -this.velocity,
    });
  }

  public moveDown(): void {
    this.updateSpriteMovementAnimation("down");
    this.character.setVelocity({
      x: 0,
      y: this.velocity,
    });
  }

  public moveLeft(): void {
    this.updateSpriteMovementAnimation("left");
    this.character.setVelocity({
      x: -this.velocity,
      y: 0,
    });
  }

  public moveRight(): void {
    this.updateSpriteMovementAnimation("right");
    this.character.setVelocity({
      x: this.velocity,
      y: 0,
    });
  }
}
