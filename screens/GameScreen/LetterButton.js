import Clickable from '../../engine/Clickable.js'
import theme from '../../consts/theme.js'

export default class LetterButton extends Clickable {
  constructor({ letter, onClick }) {
    super()

    this.rotation = 0
    this.size = 0
    this.letter = letter
    this.onClick = onClick
    this.boxScale = 1
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
    boundingBox.roundRect(-this.size / 2, -this.size / 2, this.size, this.size, theme.button.borderRadius);
  }

  draw(gameContext) {
    super.draw(gameContext, () => {
      const isDown = this.isDown || this.renderDown

      const { ctx } = gameContext
      ctx.beginPath();
      ctx.roundRect(
        -this.size / 2 * this.boxScale,
        -this.size / 2 * this.boxScale,
        this.size * this.boxScale,
        this.size * this.boxScale,
        theme.button.borderRadius
      );

      ctx.fillStyle = isDown ? theme.button.down.backgroundColor : theme.button.backgroundColor
      ctx.lineWidth = theme.button.borderWidth;
      ctx.fill()

      ctx.strokeStyle = isDown ? theme.button.down.borderColor : theme.button.borderColor
      ctx.stroke();

      ctx.fillStyle = isDown ? theme.button.down.textColor : theme.button.textColor
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
