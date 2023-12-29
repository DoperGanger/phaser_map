import { DATA_ASSET_KEYS } from "../src/assets/asset-keys";

export class DataUtils {
  static getAnimations(scene) {
    const data = scene.cache.json.get(DATA_ASSET_KEYS.ANIMATIONS);
    return data;
  }
}
