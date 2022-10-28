import * as PIXI from "pixi.js";
import { Map } from "./map";
import { Character } from "./character";
import { PlayerController } from "./playerController";
import { getPlayerAssetPath } from "../utils";

/**
 * Contains application setup methods & Loads assets
 *
 * @See: Pixi.Application
 */
export class Game {
  private app: PIXI.Application;
  private player: Character | null = null;
  private map: Map | null = null;

  private PLAYER_WALKING_SPEED: number = 2.5;

  //The map doesn't size to the full width on edge, however the app itself does here?
  constructor() {
    this.app = new PIXI.Application({
      width: window.innerWidth,
      height: window.innerHeight,
      resizeTo: window,
      resolution: window.devicePixelRatio || 1,
      autoDensity: true,
    });
    PIXI.settings.GC_MAX_IDLE = 1;
    document.body.appendChild(this.app.view);
  }

  /**
   * run the game
   *
   *
   */
  public play(): void {
    PIXI.Loader.shared
      .add("assets/map.png")
      .add("assets/player.png")
      .load(this.setup.bind(this));
  }

  /**
   * Loads assets
   *
   * @See: loadAssets() method of this class
   */
  private start(delta: number): void {
    this.player?.setSpriteCoordinate({
      x: this.player.getSprite()!.x + this.player.getVelocity().x,
      y: this.player.getSprite()!.y + this.player.getVelocity().y,
    });

    let screenCenter: PIXI.Point = new PIXI.Point(
      this.app.screen.width * 0.5,
      this.app.screen.height * 0.5
    );

    //the maps are anchored to the top left
    //so minus playerCenter would put the playerCenter in the top left of screen + half the screen width / height to focues the playerCenter in the center of the screen
    let newMapPos: PIXI.Point = new PIXI.Point(
      -this.player!.getSprite()!.x + screenCenter.x,
      -this.player!.getSprite()!.y + screenCenter.y
    );

    //this is a quick check to make sure the final map positions don't reveal the edge of the map
    //it just checks the calculated map positions witht he screen boundary
    if (newMapPos.x < -this.map!.getSprite().width + this.app.screen.width) {
      newMapPos.x = -this.map!.getSprite().width + this.app.screen.width;
    }
    if (newMapPos.x > 0) {
      newMapPos.x = 0;
    }
    if (newMapPos.y < -this.map!.getSprite().height + this.app.screen.height) {
      newMapPos.y = -this.map!.getSprite().height + this.app.screen.height;
    }
    if (newMapPos.y > 0) {
      newMapPos.y = 0;
    }
  }

  /**
   * Creates new map and character object and loads them
   *  @See: map.ts & character.ts
   *
   */
  private setup(): void {
    const map = new Map(this.app);
    map.construct();

    //Character class in another module, passess application to the character instance
    const player = new Character(this.app);
    player.construct(getPlayerAssetPath());

    this.player = player;
    this.map = map;

    const playerController = new PlayerController(
      this.player,
      this.PLAYER_WALKING_SPEED,
      this.map
    );

    playerController.addKeyboardListeners();

    this.app.ticker.add((delta: number) => this.start(delta));
  }
}
