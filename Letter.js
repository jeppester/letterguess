import View from './View.js'

export default class Letter extends View {
  constructor(letter) {
    super()

    this.rotation = 0
    this.size = 0
    this.letter = letter
  }

  setFont(ctx) {
    ctx.textAlign = 'center'
    ctx.font = `${this.size}px Arial`;
  }

  updateTextOffset({ ctx }) {
    ctx.save()
    this.setFont(ctx)
    const textMeasure = ctx.measureText(this.letter);
    this.textYOffset = (textMeasure.actualBoundingBoxAscent - textMeasure.actualBoundingBoxDescent) / 2
    ctx.restore()
  }

  draw({ ctx }) {
    super.draw(ctx, () => {
      ctx.beginPath();
      ctx.roundRect(-this.size / 2, -this.size / 2, this.size, this.size, 30);

      ctx.stroke();

      this.setFont(ctx)
      ctx.fillText(this.letter, 0, this.textYOffset)
    })
  }
}
