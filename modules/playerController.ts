import { getCharacterMovementAnimation, getPlayerAssetPath } from "../utils";
import { Character } from "./character";
import * as PIXI from "pixi.js";
import { Map } from "./map";

type Direction = "up" | "down" | "left" | "right";

export class PlayerController {
  private player: Character;
  private velocity: number;

  private prevKeyPressed: string | null = null;
  private currentKeyPressed: string | null = null;

  private map: Map;

  constructor(player: Character, velocity: number = 1, map: Map) {
    this.player = player;
    this.velocity = velocity;
    this.map = map;
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
        this.player.getSprite().animationSpeed = 0.15;
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
      this.player.getSprite().animationSpeed = 0.5;

      this.player.getSprite().gotoAndStop(0);
      this.player.setVelocity({
        x: 0,
        y: 0,
      });
    });
  }

  private updateSpriteMovementAnimation(direction: Direction): void {
    if (this.currentKeyPressed !== this.prevKeyPressed) {
      this.player.setSpriteTextures(
        getCharacterMovementAnimation(getPlayerAssetPath())[direction]
      );
    }
    this.player.getSprite().play();
  }

  /**
   * Moves the character up
   *
   * @See: ./utils/index.ts
   */
  public moveUp(): void {
    this.updateSpriteMovementAnimation("up");
    this.player.setVelocity({
      x: 0,
      y: -this.velocity,
    });
  }

  public moveDown(): void {
    this.updateSpriteMovementAnimation("down");
    this.player.setVelocity({
      x: 0,
      y: this.velocity,
    });
  }

  public moveLeft(): void {
    this.updateSpriteMovementAnimation("left");
    this.player.setVelocity({
      x: -this.velocity,
      y: 0,
    });
  }

  public moveRight(): void {
    this.updateSpriteMovementAnimation("right");
    this.player.setVelocity({
      x: this.velocity,
      y: 0,
    });
  }
}
