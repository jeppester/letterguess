import Clickable from './Clickable.js'

export default class StartButton extends Clickable {
  constructor(gameContext, onClick) {
    super()

    this.onClick = onClick
    this.resize(gameContext)
  }

  handleEvent({ gameContext, event }) {
    if (event.type == "resize") {
      this.resize(gameContext)
    }
    super.handleEvent({ gameContext, event })
  }

  resize({ width, height }) {
    this.x = width / 2
    this.y = height / 2

    this.size = Math.max(width * .2, 200)
  }

  setBoundingBoxPath(gameContext, boundingBox) {
    this.setOutline({ ...gameContext, ctx: boundingBox })
  }

  setOutline(gameContext) {
    const { ctx } = gameContext

    ctx.roundRect(-this.size / 2, -this.size / 2, this.size, this.size, 30);
  }

  draw(gameContext) {
    super.draw(gameContext, () => {

      const { ctx } = gameContext
      ctx.strokeStyle = this.isDown ? "#C4C" : "#000"
      ctx.fillStyle = this.isDown ? "#C4C" : "#000"

      ctx.beginPath()
      this.setOutline(gameContext)
      ctx.stroke()

      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      ctx.font = `${this.size * .8}px Arial`;
      // ctx.lineJoin = "bevel"
      ctx.lineWidth = this.size * .07
      ctx.strokeText("▶", 0, 0)
    })
  }

  handleDownStateChange(gameContext) {
    const { animator } = gameContext
    animator.animate(this)
            .tween(
              { originY: { to: this.isDown ? -this.size * 0.02 : 0 } },
              50,
              gameContext.animator.easeInOutSine
            )
            .start()
  }

  handleClick() {
    this.onClick(this)
  }
}
