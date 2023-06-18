import ViewList from '../../engine/ViewList.js'
import LetterListItem from '../../shared/LetterListItem.js'

export default class LetterList extends ViewList {
  constructor(orderedLetters) {
    super()

    this.orderedLetters = orderedLetters
  }

  handleEvent({ gameContext, event }) {
    if (event.type == "resize") {
      this.resize(gameContext)
    }
    super.handleEvent({ gameContext, event })
  }

  add(gameContext, letter) {
    const offset = this.getLetterOffset(letter)
    const newLetter = new LetterListItem(letter)
    newLetter[this.isLandScape ? 'y' : 'x'] = 0
    newLetter[this.isLandScape ? 'x' : 'y'] = offset

    this.push(newLetter)

    gameContext
      .animator
      .animate(newLetter)
      .tween({
        opacity: { from: 0 },
        [this.isLandScape ? 'originY' : 'originX']: { from: 10 }
      })
      .start()

    this.children.sort((a, b) => a.letter.localeCompare(b.letter))
  }

  getLetterOffset(letter) {
    const index = this.orderedLetters.indexOf(letter)
    return index * this.spaceBetween  -(this.orderedLetters.length - 1) / 2 * this.spaceBetween
  }

  resize(gameContext) {
    this.isLandScape = gameContext.width > gameContext.height

    if (this.isLandScape) {
      this.spaceBetween = Math.max(25, (gameContext.width - 200) / 29)
      this.x = 0
      this.y = -gameContext.height / 2 + 20

      this.children.forEach((child) => {
        child.x = this.getLetterOffset(child.letter)
        child.y = 0
      })
    }
    else {
      this.spaceBetween = Math.max(25, (gameContext.height - 200) / 29)
      this.x = -gameContext.width / 2 + 20
      this.y = 0

      this.children.forEach((child) => {
        child.x = 0
        child.y = this.getLetterOffset(child.letter)
      })

    }
  }
}
