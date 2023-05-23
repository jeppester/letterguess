import ViewList from '/ViewList.js'
import Letter from '/Letter.js'

export default class Room extends ViewList {
  constructor(gameContext) {
    super()

    this.padding = 20

    this.letter1 = new Letter('A')
    this.letter2 = new Letter('g')
    this.letter3 = new Letter('C')

    this.push(this.letter1, this.letter2, this.letter3)

    this.resizeLetters(gameContext)
  }

  handleEvent({ gameContext, event }) {
    if (event.type == "resize") {
      this.resizeLetters(gameContext)
    }
    super.handleEvent({ gameContext, event })
  }

  resizeLetters(gameContext) {
    this.x = gameContext.width / 2
    this.y = gameContext.height / 2

    const hSpace = gameContext.width - this.padding

    this.letter1.size = hSpace / 3 - this.padding
    this.letter2.size = hSpace / 3 - this.padding
    this.letter3.size = hSpace / 3 - this.padding

    this.letter1.x = -hSpace / 3
    this.letter2.x = 0
    this.letter3.x = hSpace / 3

    this.letter1.updateTextOffset(gameContext)
    this.letter2.updateTextOffset(gameContext)
    this.letter3.updateTextOffset(gameContext)
  }
}
