import * as PIXI from "pixi.js";
import { ICharacterMovementAnimation } from "../interface";

const zoomLevel = 2;

/**
 *
 * @returns number
 */
const getZoomLevel = () => zoomLevel;

/**
 *
 * @returns string
 */
const getPlayerAssetPath = () => "assets/player.png";

/**
 *
 * @returns string
 */
const getMapAssetPath = () => "assets/map.png";

/**
 *
 * @param string: path
 * @returns character movement animation object
 *
 * Note: character sprite sheet is 4x4
 */
const getCharacterMovementAnimation = (path: string) => {
  const CHARACTER_SPITESHEET_IMAGE_COLUMN = 4;
  const CHARACTER_SPITESHEET_IMAGE_ROW = 4;

  const CHARACTER_HEIGHT =
    PIXI.Loader.shared.resources[path].texture!.height /
    CHARACTER_SPITESHEET_IMAGE_ROW;
  const CHARACTER_WIDTH =
    PIXI.Loader.shared.resources[path].texture!.width /
    CHARACTER_SPITESHEET_IMAGE_COLUMN;

  const characterMovementAnimation: ICharacterMovementAnimation = {
    down: Array.from({ length: CHARACTER_SPITESHEET_IMAGE_COLUMN }, (_, i) => {
      return new PIXI.Texture(
        PIXI.BaseTexture.from(path),
        new PIXI.Rectangle(
          i * CHARACTER_WIDTH,
          CHARACTER_HEIGHT * 0,
          CHARACTER_WIDTH,
          CHARACTER_HEIGHT
        )
      );
    }),
    up: Array.from({ length: CHARACTER_SPITESHEET_IMAGE_COLUMN }, (_, i) => {
      return new PIXI.Texture(
        PIXI.BaseTexture.from(path),
        new PIXI.Rectangle(
          i * CHARACTER_WIDTH,
          CHARACTER_HEIGHT * 1,
          CHARACTER_WIDTH,
          CHARACTER_HEIGHT
        )
      );
    }),
    left: Array.from({ length: CHARACTER_SPITESHEET_IMAGE_COLUMN }, (_, i) => {
      return new PIXI.Texture(
        PIXI.BaseTexture.from(path),
        new PIXI.Rectangle(
          i * CHARACTER_WIDTH,
          CHARACTER_HEIGHT * 2,
          CHARACTER_WIDTH,
          CHARACTER_HEIGHT
        )
      );
    }),
    right: Array.from({ length: CHARACTER_SPITESHEET_IMAGE_COLUMN }, (_, i) => {
      return new PIXI.Texture(
        PIXI.BaseTexture.from(path),
        new PIXI.Rectangle(
          i * CHARACTER_WIDTH,
          CHARACTER_HEIGHT * 3,
          CHARACTER_WIDTH,
          CHARACTER_HEIGHT
        )
      );
    }),
  };

  return characterMovementAnimation;
};

export {
  getZoomLevel,
  getPlayerAssetPath,
  getMapAssetPath,
  getCharacterMovementAnimation,
};
