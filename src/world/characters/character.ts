import { DIRECTION } from "../../../common/direction";
import { getTargetPositionFromGameObjectPositionAndDirection } from "../../../utils/grid-utils";

export class Character {
  private _scene: Phaser.Scene;
  private _phaserGameObject: Phaser.GameObjects.Sprite;
  private _direction: DIRECTION;
  private _isMoving: boolean;
  private _targetPosition;
  private _previousTargetPosition;
  private _spriteGridMovementFinishedCallback: (() => void) | undefined;

  constructor(config: any) {
    console.log(`[${Character.name}:create] invoked`);

    this._scene = config.scene;
    this._direction = config.direction;
    this._isMoving = false;
    this._targetPosition = { ...config.position };
    this._previousTargetPosition = { ...config.position };
    this._spriteGridMovementFinishedCallback =
      config.spriteGridMovementFinishedCallback;

    this._phaserGameObject = this._scene.add
      .sprite(config.position.x, config.position.y, config.assetKey)
      .setOrigin(config.origin?.x || 0, config.origin?.y || 0)
      .setScale(config.scale || 1);
  }

  get isMoving(): boolean {
    return this._isMoving;
  }

  get direction(): DIRECTION {
    return this._direction;
  }

  moveCharacter(direction: DIRECTION): void {
    if (this._isMoving) {
      return;
    }
    this._moveSprite(direction);
  }

  private _moveSprite(direction: DIRECTION): void {
    this._direction = direction;
    if (this._isBlockingTile()) {
      return;
    }
    this._isMoving = true;
    this.handleSpriteMovement();
  }

  private _isBlockingTile(): boolean {
    // Implementation of tile blocking logic
    return false;
  }

  handleSpriteMovement(): void {
    if (this._direction === DIRECTION.NONE) {
      return;
    }

    const updatedPosition = getTargetPositionFromGameObjectPositionAndDirection(
      this._targetPosition,
      this._direction
    );
    this._previousTargetPosition = { ...this._targetPosition };
    this._targetPosition = updatedPosition;

    this._scene.add.tween({
      delay: 0,
      duration: 600,
      y: { from: this._phaserGameObject.y, to: updatedPosition.y },
      x: { from: this._phaserGameObject.x, to: updatedPosition.x },
      targets: this._phaserGameObject,
      onComplete: () => {
        this._isMoving = false;
        if (this._spriteGridMovementFinishedCallback) {
          this._spriteGridMovementFinishedCallback();
        }
      },
    });
  }
}
