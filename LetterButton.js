import Clickable from './Clickable.js'

export default class LetterButton extends Clickable {
  constructor({ letter, onClick }) {
    super()

    this.rotation = 0
    this.size = 0
    this.letter = letter
    this.onClick = onClick
  }

  setFont(ctx) {
    ctx.textAlign = 'center'
    ctx.font = `${this.size * .9}px Arial`;
  }

  updateTextOffset({ ctx }) {
    ctx.save()
    this.setFont(ctx)
    const textMeasure = ctx.measureText(this.letter);
    this.textYOffset = (textMeasure.actualBoundingBoxAscent - textMeasure.actualBoundingBoxDescent) / 2
    ctx.restore()
  }

  setBoundingBoxPath(_gameContext, boundingBox) {
    boundingBox.roundRect(-this.size / 2, -this.size / 2, this.size, this.size, 30);
  }

  draw(gameContext) {
    super.draw(gameContext, () => {
      const { ctx } = gameContext
      ctx.strokeStyle = this.isDown ? "#C4C" : "#000"
      ctx.fillStyle = this.isDown ? "#C4C" : "#000"

      ctx.beginPath();
      ctx.roundRect(-this.size / 2, -this.size / 2, this.size, this.size, this.size * .2);
      ctx.stroke();

      this.setFont(ctx)
      ctx.fillText(this.letter, 0, this.textYOffset)
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
