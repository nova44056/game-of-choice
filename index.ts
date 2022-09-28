import { Game } from "./modules/game";
import * as PIXI from "pixi.js";

window.onload = () => {
  const game = new Game();
  game.start();
};
