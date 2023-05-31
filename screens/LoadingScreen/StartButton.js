import Clickable from '../../engine/Clickable.js'

export default class StartButton extends Clickable {
  constructor(gameContext, onClick) {
    super()

    this.onClick = onClick
    this.text = "▶"
    this.resize(gameContext)
  }

  handleEvent({ gameContext, event }) {
    if (event.type == "resize") {
      this.resize(gameContext)
    }
    super.handleEvent({ gameContext, event })
  }

  resize({ ctx, width, height }) {
    this.x = width / 2
    this.y = height / 2

    this.size = Math.max(width * .3, 200)

    this.updateTextOffset({ ctx })
  }

  setFont(ctx) {
    ctx.textAlign = 'center'
    ctx.lineWidth = this.size * .07
    ctx.font = `${this.size * .8}px Arial`;
}

  updateTextOffset({ ctx }) {
    ctx.save()
    this.setFont(ctx)
    const textMeasure = ctx.measureText(this.text);
    this.textYOffset = (textMeasure.actualBoundingBoxAscent - textMeasure.actualBoundingBoxDescent) / 2
    ctx.restore()
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

      this.setFont(ctx)
      ctx.strokeText(this.text, 0, this.textYOffset)
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
