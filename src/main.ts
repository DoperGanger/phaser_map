import Phaser from "phaser";

import { SCENE_KEYS } from "./scenes/scene-keys";
import { WorldScene } from "./scenes/world-scene";
import { PreloadScene } from "./scenes/preload-scene";

new Phaser.Game({
  type: Phaser.CANVAS,
  pixelArt: false,
  scale: {
    parent: "game-container",
    width: 320,
    height: 320,
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
  backgroundColor: "#000000",
  scene: [PreloadScene, WorldScene],
});

// game.scene.add(SCENE_KEYS.PRELOAD_SCENE, PreloadScene);
// game.scene.add(SCENE_KEYS.WORLD_SCENE, WorldScene);
