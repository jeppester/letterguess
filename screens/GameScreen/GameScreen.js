import ViewList from '../../engine/ViewList.js'
import LetterButton from './LetterButton.js'
import pickLetter from '../../utils/pickLetter.js'
import playAudio from '../../utils/playAudio.js'
import theme from '../../consts/theme.js'

export default class GameScreen extends ViewList {
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
    const { animator, width } = gameContext
    this.cancelLetterPlaybackTimer(gameContext)

    if (button.letter === this.correctLetter) {
      this.handleCorrectLetter(gameContext, button)
    }
    else {
      this.letterButtons.map((button) => button.disabled = true)
      animator.animate(this)
                          .tween({ originX: width * .005, originY: width * .005 }, 50)
                          .tween({ originX: -width * .005, originY: -width * .005 }, 50)
                          .tween({ originX: 0, originY: 0 }, 50)
                          .start(() => {
                            this.letterButtons.map((button) => button.disabled = false)
                            this.playCurrentLetter(gameContext)
                          })
    }
  }

  async handleCorrectLetter(gameContext, button) {
    const { animator, assetLoader, audioContext, width, height } = gameContext
    const emphasizeScale = 2

    this.letterButtons.map((button) => button.disabled = true)
    this.moveToFront(button)
    const boxScale = Math.max(width, height) / (emphasizeScale * (button.size - theme.button.borderWidth))
    button.renderDown = true

    await Promise.all([
      playAudio(audioContext, assetLoader.pick('audio', 'success')),
      animator.animate(button)
        .tween({
          x: 0,
          y: 0,
          scaleX: emphasizeScale,
          scaleY: emphasizeScale,
          boxScale
        }, 400, animator.easeOutCubic)
        .start()
    ]).then(() =>
      animator
        .animate(button)
        .wait(200)
        .tween({ opacity: 0, scaleX: 6, scaleY: 6 }, 300, animator.easeOutCubic)
        .wait(200)
        .start()
    )

    button.letter = pickLetter(this.letterButtons.map(({letter}) => letter))
    button.updateTextOffset(gameContext)
    button.scaleY = 1
    button.opacity = 1
    button.boxScale = 1
    button.renderDown = false

    // We recalculate all button positions,
    // the screen size might have changed during the animation
    this.resizeLetters(gameContext)

    await animator.animate(button)
      .tween({ scaleX: { from: 0, to: 1 }}, 300, animator.easeInOutCubic)
      .start()

    this.pickCorrectLetter(gameContext)
    this.letterButtons.map((button) => button.disabled = false)
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
    animator.cancel(this.letterPlaybackTimer)
  }

  resizeLetters(gameContext) {
    this.x = gameContext.width / 2
    this.y = gameContext.height / 2

    const isLandScape = gameContext.width > gameContext.height
    const maxTotalSize = 600

    if (isLandScape) {
      const maxSpace = Math.min(gameContext.width, maxTotalSize)
      const availableSpace = maxSpace - this.padding

      const positions = [-availableSpace / 3, 0, availableSpace / 3]
      const nextSize = availableSpace / 3 - this.padding

      this.letterButtons.forEach((button, index) => {
        button.y = 0
        button.x = positions[index]
        button.size = nextSize
        button.updateTextOffset(gameContext)
      })
    }
    else {
      const maxSpace = Math.min(gameContext.height, maxTotalSize)
      const availableSpace = maxSpace - this.padding

      const positions = [-availableSpace / 3, 0, availableSpace / 3]
      const nextSize = availableSpace / 3 - this.padding

      this.letterButtons.forEach((button, index) => {
        button.x = 0
        button.y = positions[index]
        button.size = nextSize
        button.updateTextOffset(gameContext)
      })
    }
  }
}
