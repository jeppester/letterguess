import ViewList from './ViewList.js'
import LetterButton from './LetterButton.js'
import pickLetter from './utils/pickLetter.js'
import playAudio from './utils/playAudio.js'

export default class GameRoom extends ViewList {
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
          // Pick correct letter, but only once
          if (i === 0) this.pickCorrectLetter(gameContext)
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
    const { animator, width, assetLoader, audioContext } = gameContext
    this.cancelLetterPlaybackTimer(gameContext)

    if (button.letter === this.correctLetter) {
      playAudio(audioContext, assetLoader.pick('audio', 'success'))

      this.letterButtons.map((button) => button.disabled = true)
      animator.animate(button)
        .tween({ scaleX: { to: 1.5 }, scaleY: { to: 1.5 }, opacity: { to: 0 }}, 400, animator.easeOutCubic, () => {
          button.letter = pickLetter(this.letterButtons.map(({letter}) => letter))
          button.updateTextOffset(gameContext)
        })
        .wait(500, () => {
          button.scaleY = 1
          button.opacity = 1
        })
        .tween({ scaleX: { from: 0, to: 1 }}, 300, animator.easeInOutCubic)
        .start(() => {
          this.pickCorrectLetter(gameContext)
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
                            this.playCurrentLetter(gameContext)
                          })
    }
  }

  pickCorrectLetter(gameContext) {
    const currentLetters = this.letterButtons.map(({ letter }) => letter)
    this.correctLetter = currentLetters[Math.floor(Math.random() * currentLetters.length)]

    this.letterPlaybackTimer = gameContext.animator.delay(300, () => {
      this.playCurrentLetter(gameContext)
    })
  }

  playCurrentLetter(gameContext) {
    const { audioContext, animator, assetLoader } = gameContext
    playAudio(audioContext, assetLoader.audio[`letters.${this.correctLetter}`])

    this.cancelLetterPlaybackTimer(gameContext)
    this.letterPlaybackTimer = animator.delay(10000, () => {
      this.playCurrentLetter(gameContext)
    })
  }

  cancelLetterPlaybackTimer({ animator }) {
    const index = animator.indexOf(this.letterPlaybackTimer)
    if (index !== -1) {
      animator.splice(index, 1)
    }
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
