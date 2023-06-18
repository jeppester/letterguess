import Clickable from '../../engine/Clickable.js'
import theme from '../../consts/theme.js'

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

    this.size = Math.max(width * .3, 200)
  }

  setBoundingBoxPath(gameContext, boundingBox) {
    this.setOutline({ ...gameContext, ctx: boundingBox })
  }

  setOutline(gameContext) {
    const { ctx } = gameContext

    ctx.roundRect(-this.size / 2, -this.size / 2, this.size, this.size, 30);
  }

  getStyle() {
    return {
      ...theme.button,
      ...(this.isDown && theme[`button--normal--down`]),
    }
  }

  draw(gameContext) {
    super.draw(gameContext, () => {
      const { ctx } = gameContext
      ctx.beginPath()
      this.setOutline(gameContext)

      const style = this.getStyle()

      ctx.fillStyle = style.backgroundColor
      ctx.lineWidth = style.borderWidth;
      ctx.fill()

      ctx.strokeStyle = style.borderColor
      ctx.stroke();

      ctx.textAlign = 'center'
      ctx.textBaseline = "middle"
      ctx.fillStyle = style.textColor
      ;[
        ["G", -.21,-.2, .5],
        ["T", .21,-.2, .5],
        ["B", -.21,.25, .5],
        ["S", .21,.25, .5],
      ].forEach(([letter, offsetX, offsetY, sizeMultiplier]) => {
        ctx.font = `${this.size * sizeMultiplier}px Arial`;
        ctx.fillText(letter, offsetX * this.size, offsetY * this.size)
      })
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
