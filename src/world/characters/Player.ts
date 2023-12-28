import { CHARACTER_ASSET_KEYS } from "~/assets/asset-keys";
import { Character } from "./character";

/**
 * @typedef {Omit<import('./character').CharacterConfig,'assetKey'>} PlayerConfig
 */
export class Player extends Character {
  /**
   * @param {PlayerConfig}config
   */
  constructor(config: any) {
    super({
      ...config,
      assetKey: CHARACTER_ASSET_KEYS.PLAYER,
      assetFrame: 7,
    });
  }
}
