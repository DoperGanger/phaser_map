import { DIRECTION } from "../../../common/direction";
import { getTargetPositionFromGameObjectPositionAndDirection } from "../../../utils/grid-utils";
import { exhaustiveGuard } from "../../../utils/guard";

export class Character {
  protected _scene: Phaser.Scene;
  protected _phaserGameObject: Phaser.GameObjects.Sprite;
  protected _direction: DIRECTION;
  protected _isMoving: boolean;
  protected _targetPosition;
  protected _previousTargetPosition;
  protected _spriteGridMovementFinishedCallback: (() => void) | undefined;
  protected _idleFrameConfig;
  protected _origin;
  protected _collisionLayer;

  constructor(config: any) {
    console.log(`[${Character.name}:create] invoked`);

    this._scene = config.scene;
    this._direction = config.direction;
    this._isMoving = false;
    this._targetPosition = { ...config.position };
    this._previousTargetPosition = { ...config.position };
    this._idleFrameConfig = config.idleFrameConfig;
    this._spriteGridMovementFinishedCallback =
      config.spriteGridMovementFinishedCallback;
    this._origin = config.origin ? { ...config.origin } : { x: 0, y: 0 };
    this._collisionLayer = config.collisionLayer;

    this._phaserGameObject = this._scene.add
      .sprite(
        config.position.x,
        config.position.y,
        config.assetKey,
        this._getIdleFrame()
      )
      .setOrigin(this._origin.x, this._origin.y)
      .setScale(config.scale || 1);
  }

  _getIdleFrame() {
    return this._idleFrameConfig[this._direction];
  }

  get sprite(): Phaser.GameObjects.Sprite {
    return this._phaserGameObject;
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
    const idleFrame =
      this._phaserGameObject.anims.currentAnim?.frames[1].frame.name;
    this.moveSprite(direction);
    if (!idleFrame) {
      return;
    }
  }

  update(time) {
    if (this._isMoving) {
      return;
    }
    // stop current animation and show idle frame
    const idleFrame =
      this._phaserGameObject.anims.currentAnim?.frames[1].frame.name;
    this._phaserGameObject.anims.stop();
    if (!idleFrame) {
      return;
    }
    switch (this._direction) {
      case DIRECTION.DOWN:
      case DIRECTION.LEFT:
      case DIRECTION.RIGHT:
      case DIRECTION.UP:
        this._phaserGameObject.setFrame(idleFrame);
        break;
      case DIRECTION.NONE:
        break;
      default:
        // We should never reach this default case
        exhaustiveGuard(this._direction as never);
    }
  }

  protected moveSprite(direction: DIRECTION): void {
    this._direction = direction;
    if (this.isBlockingTile()) {
      return;
    }
    this._isMoving = true;
    this.handleSpriteMovement();
  }

  protected isBlockingTile() {
    if (this._direction === DIRECTION.NONE) {
      return false;
    }

    // Implementation of tile blocking logic
    const targetPosition = { ...this._targetPosition };
    const updatedPosition = getTargetPositionFromGameObjectPositionAndDirection(
      targetPosition,
      this._direction
    );

    return this.doesPositionCollideWithCollisionLayer(updatedPosition);
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

  doesPositionCollideWithCollisionLayer(position) {
    if (!this._collisionLayer) {
      return false;
    }
    const { x, y } = position;
    const tile = this._collisionLayer.getTileAtWorldXY(x, y, true);

    return tile.index !== -1;
  }
}
