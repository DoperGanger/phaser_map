import Phaser from "../lib/phaser.js";
import { DATA_ASSET_KEYS } from "../src/assets/asset-keys";

export class DataUtils {
  static getAnimations(scene) {
    /** @type {import('../types/typedef.js').Animation[]} */
    const data = scene.cache.json.get(DATA_ASSET_KEYS.ANIMATIONS);
    console.log("Animations:", scene);

    return data;
  }
}
