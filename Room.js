import ViewList from '/ViewList.js'
import LetterButton from '/LetterButton.js'
import pickLetter from '/utils/pickLetter.js'

export default class Room extends ViewList {
  constructor(gameContext) {
    super()

    this.padding = 20

    this.letterButtons = []
    const usedLetters = []
    for (let i = 0; i < 3; i ++) {
      let letter = pickLetter(usedLetters)
      usedLetters.push(letter)
      this.letterButtons.push(new LetterButton({ letter, onClick: this.handleLetterClick.bind(this, gameContext) }))
    }
    this.pickCorrectLetter()

    this.push(...this.letterButtons)
    this.resizeLetters(gameContext)
  }

  handleEvent({ gameContext, event }) {
    if (event.type == "resize") {
      this.resizeLetters(gameContext)
    }
    super.handleEvent({ gameContext, event })
  }

  handleLetterClick(gameContext, button) {
    if (button.letter === this.correctLetter) {
      button.letter = pickLetter(this.letterButtons.map(({letter}) => letter))
      button.updateTextOffset(gameContext)
      this.pickCorrectLetter()
    }
    else {
      gameContext.animator.animate(this.offset)
                          .tween({ x: { to: 10 }, y: { to: 10 } }, 50)
                          .tween({ x: { to: -10 }, y: { to: -10 } }, 50)
                          .tween({ x: { to: 0 }, y: { to: 0 } }, 50)
                          .start(() => console.log('Animation ended!'))
    }
  }

  pickCorrectLetter() {
    const currentLetters = this.letterButtons.map(({ letter }) => letter)
    this.correctLetter = currentLetters[Math.floor(Math.random() * currentLetters.length)]
    console.log(this.correctLetter)
  }

  resizeLetters(gameContext) {
    this.x = gameContext.width / 2
    this.y = gameContext.height / 2

    const hSpace = gameContext.width - this.padding

    const xPositions = [-hSpace / 3, 0, hSpace / 3]
    const nextSize = hSpace / 3 - this.padding

    this.letterButtons.forEach((button, index) => {
      button.x = xPositions[index]
      button.size = nextSize
      button.updateTextOffset(gameContext)
    })
  }
}
