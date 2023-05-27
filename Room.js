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

    const { animator } = gameContext
    const delays = [0, 200, 100]
    this.letterButtons.map((button, i) => {
      button.scaleX = 0
      button.disabled = true

      animator.animate(button)
        .wait(delays[i])
        .tween({ scaleX: { to: 1 }}, 300, animator.easeOutCubic)
        .start(() => {
          button.disabled = false
        })
    })

  }

  handleEvent({ gameContext, event }) {
    if (event.type == "resize") {
      this.resizeLetters(gameContext)
    }
    super.handleEvent({ gameContext, event })
  }

  handleLetterClick(gameContext, button) {
    const { animator, width } = gameContext

    if (button.letter === this.correctLetter) {
      this.letterButtons.map((button) => button.disabled = true)
      animator.animate(button)
        .tween({ scaleX: { to: 1.5 }, scaleY: { to: 1.5 }, opacity: { to: 0 }}, 400, animator.easeOutCubic, () => {
          button.letter = pickLetter(this.letterButtons.map(({letter}) => letter))
          button.updateTextOffset(gameContext)
          this.pickCorrectLetter()
        })
        .wait(500)
        .tween({ scaleX: { from: 0, to: 1 }, scaleY: { from: 1 }, opacity: { from: 1 }}, 300, animator.easeInOutCubic)
        .start(() => {
          this.letterButtons.map((button) => button.disabled = false)
        })
    }
    else {

      this.letterButtons.map((button) => button.disabled = true)
      animator.animate(this)
                          .tween({ originX: { to: width * .005 }, originY: { to: width * .005 } }, 50)
                          .tween({ originX: { to: -width * .005 }, originY: { to: -width * .005 } }, 50)
                          .tween({ originX: { to: 0 }, originY: { to: 0 } }, 50)
                          .start(() => {
                            this.letterButtons.map((button) => button.disabled = false)
                          })
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
