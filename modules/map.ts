import * as PIXI from "pixi.js";
import { getZoomLevel } from "../utils";
import { Sprite } from "./sprite";

export class Map extends Sprite {
  private app: PIXI.Application;

  constructor(app: PIXI.Application) {
    super();
    this.app = app;
  }

  public construct(): void {
    const gameMap = new PIXI.Sprite(
      PIXI.Loader.shared.resources["assets/map.png"].texture
    );

    gameMap.width = gameMap.width * getZoomLevel();
    gameMap.height = gameMap.height * getZoomLevel();

    this.setSprite(gameMap);
    this.app.stage.addChild(gameMap);
  }
}
