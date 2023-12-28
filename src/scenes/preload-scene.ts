import Phaser from "phaser";
import { SCENE_KEYS } from "./scene-keys";
import { CHARACTER_ASSET_KEYS, WORLD_ASSET_KEYS } from "~/assets/asset-keys";

export class PreloadScene extends Phaser.Scene {
  constructor() {
    super({
      key: SCENE_KEYS.PRELOAD_SCENE,
    });
  }

  preload() {
    console.log(`[${PreloadScene.name}:preload] invoked`);

    //load world assets
    this.load.image(
      WORLD_ASSET_KEYS.WORLD_BACKGROUND,
      "images/doperganger_background.png"
    );

    // load character images
    //Player
    this.load.spritesheet(
      CHARACTER_ASSET_KEYS.PLAYER,
      `/axulart/character/custom.png`,
      {
        frameWidth: 64,
        frameHeight: 88,
      }
    );
    //NPC
    // this.load.spritesheet(CHARACTER_ASSET_KEYS.NPC, ``, {
    //   frameWidth: 16,
    //   frameHeight: 16,
    // });
  }

  create() {
    console.log(`[${PreloadScene.name}:create] invoked`);
    this.scene.start(SCENE_KEYS.WORLD_SCENE);
  }
}
