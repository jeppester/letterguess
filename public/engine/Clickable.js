import View from './View.js'

export default class Clickable extends View {
  constructor() {
    super()

    this.clickInProgress = false
    this.isDown = false
    this.pointerId = null
  }

  handleEvent({ gameContext, event }) {
    switch (event.type) {
      case "pointerdown":
        this.handlePointerDown(gameContext, event);
        break;

      case "pointermove":
        this.handlePointerMove(gameContext, event);
        break

      case "pointerup":
        this.handlePointerUp(gameContext, event);
        break;

      case "pointerout":
        this.handlePointerUp(gameContext, event);
        break
    }
  }

  handlePointerDown(gameContext, event) {
    if (this.clickInProgress || this.disabled) return

    const { ctx } = gameContext
    const boundingBox = new Path2D()

    ctx.setTransform(this.currentTransform)
    this.setBoundingBoxPath(gameContext, boundingBox)

    if (ctx.isPointInPath(boundingBox, event.x, event.y)) {
      this.clickInProgress = true
      this.isDown = true
      this.pointerId = event.pointerId
      this.handleDownStateChange?.call(this, gameContext, event)
    }
    ctx.resetTransform()
  }

  handlePointerMove(gameContext, event) {
    if (!this.clickInProgress) return
    if (event.pointerId !== this.pointerId) return

    const { ctx } = gameContext
    const boundingBox = new Path2D()

    ctx.setTransform(this.currentTransform)
    this.setBoundingBoxPath(gameContext, boundingBox)

    const wasHit = ctx.isPointInPath(boundingBox, event.x, event.y)
    if (wasHit !== this.isDown) {
      this.isDown = wasHit
      this.handleDownStateChange?.call(this, gameContext, event)
    }
    ctx.resetTransform()
  }

  handlePointerUp(gameContext, event) {
    if (!this.disabled) return
    if (!this.clickInProgress) return
    if (event.pointerId !== this.pointerId) return

    const { ctx } = gameContext
    this.clickInProgress = false
    this.isDown = false
    this.pointerId = null

    const boundingBox = new Path2D()

    ctx.setTransform(this.currentTransform)
    this.setBoundingBoxPath(gameContext, boundingBox)

    const wasClicked = ctx.isPointInPath(boundingBox, event.x, event.y)
    ctx.resetTransform()

    this.handleDownStateChange?.call(this, gameContext, event)
    if (wasClicked) {
      this.handleClick(gameContext, event)
    }
  }

  handlePointerOut(_gameContext, event) {
    if (!this.clickInProgress) return
    if (event.pointerId !== this.pointerId) return

    this.clickInProgress = false
    this.isDown = false
    this.pointerId = null
  }

  handleClick(gameContext, event) {
    throw new Error("handleClick was not implemented")
  }

  setBoundingBoxPath(gameContext, boundingBox) {
    throw new Error("setBoundingBoxPath gameContext, was not implemented")
  }
}
