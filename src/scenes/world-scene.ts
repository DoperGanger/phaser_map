import Phaser from "phaser";
import { SCENE_KEYS } from "./scene-keys";
import { WORLD_ASSET_KEYS } from "~/assets/asset-keys";
import { Player } from "~/world/characters/player";
import { TILE_SIZE } from "~/world/config";
import { Controls } from "../../utils/controls";
import { DIRECTION } from "../../common/direction";

const PLAYER_POSITION = Object.freeze({ x: 0 * TILE_SIZE, y: 0 * TILE_SIZE });

export class WorldScene extends Phaser.Scene {
  /** @type {Player} */
  protected player: any;

  /** @type {Control} */
  #controls: any;

  constructor() {
    super({ key: SCENE_KEYS.WORLD_SCENE });
  }
  create() {
    console.log(`[${WorldScene.name}:create] invoked`);

    // this.add.image(0, 0, WORLD_ASSET_KEYS.WORLD_BACKGROUND, 0).setOrigin(0);
    this.add.image(0, 0, WORLD_ASSET_KEYS.WORLD_BACKGROUND).setOrigin(0, 0);

    this.player = new Player({
      scene: this,
      position: PLAYER_POSITION,
      scale: 0.25,
      direction: DIRECTION.DOWN,
    });

    this.#controls = new Controls(this);
  }

  update() {
    const selectedDirection = this.#controls.getDirectionKeyJustPressed();
    if (selectedDirection !== DIRECTION.NONE) {
      this.player.moveCharacter(selectedDirection);
    }
  }
}
