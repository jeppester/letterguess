import theme from '../../consts/theme.js'
import View from '../../engine/View.js'

export default class LetterListItem extends View {
  constructor(letter) {
    super()

    this.letter = letter
    this.opacity = theme.letterListItem.opacity
  }

  draw(gameContext) {
    super.draw(gameContext, () => {
      const { ctx } = gameContext
      const style = theme.letterListItem

      ctx.fillStyle = style.textColor
      ctx.textBaseline = 'middle'
      ctx.textAlign = 'center'
      ctx.font = `bold 20px Arial`;
      ctx.fillText(this.letter, 0, 0)
    })
  }
}
