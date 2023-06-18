import ViewList from '../../engine/ViewList.js'
import RandomModeScreen from '../RandomModeScreen/RandomModeScreen.js'
import AlphabeticalModeScreen from '../AlphabeticalModeScreen/AlphabeticalModeScreen.js'
import ProgressBar from './ProgressBar.js'
import StartButton from './StartButton.js'
import assets from './assets.js'

export default class LoadingScreen extends ViewList {
  constructor(gameContext) {
    super()

    this.loadAssets(gameContext)
    this.progressBar = new ProgressBar(this.onProgressBarFinished.bind(this, gameContext))
    this.push(this.progressBar)
  }

  async loadAssets(gameContext) {
    const { assetLoader } = gameContext

    await assetLoader.loadAssets(assets, this.onProgress.bind(this, gameContext))
  }

  onProgress(gameContext, loaded, total) {
    this.progressBar.updateProgress(gameContext, loaded / total * 100)
  }

  onProgressBarFinished(gameContext) {
    const { animator } = gameContext

    animator.animate(this.progressBar)
            .wait(400)
            .tween({ opacity: { to: 0 } }, 500)
            .wait(400)
            .start(this.handleLoaded.bind(this, gameContext))
  }

  handleLoaded(gameContext) {
    const { animator } = gameContext
    this.removeChild(this.progressBar)

    this.modeButtons = [
      new StartButton(this.handleStartGame.bind(this, gameContext, AlphabeticalModeScreen), 'ABCD'),
      new StartButton(this.handleStartGame.bind(this, gameContext, RandomModeScreen), 'GTBS')
    ]
    this.push(...this.modeButtons)

    this.resize(gameContext)

    this.modeButtons.forEach((button) => {
      animator
        .animate(button)
        .tween({ opacity: { from: 0, to: 1 }, originY: { from: -button.size * .1 }}, 300, animator.easeOutCubic)
        .start()
    })
  }

  handleStartGame(gameContext, GameClass, selectedButton) {
    const { animator } = gameContext

    const animations = this.modeButtons.map((button) => {
      const selectedMode = button === selectedButton

      return animator
        .animate(button)
        .tween({ scaleX: selectedMode ? 1.5 : 1, scaleY: selectedMode ? 1.5 : 1, opacity: 0 }, 400, animator.easeOutCubic)
        .wait(500)
        .start()
    })

    Promise.all(animations).then(() => {
      gameContext.mainViewList.removeChild(this)
      gameContext.mainViewList.push(new GameClass(gameContext))
    })
  }

  handleEvent({ gameContext, event }) {
    if (event.type == "resize") {
      this.resize(gameContext)
    }
    super.handleEvent({ gameContext, event })
  }

  resize({ width, height }) {
    const buttonSize = Math.min(200, Math.max(width * .3, 150))
    const buttonSpacing = 20

    this.modeButtons.forEach((button, index) => {
      button.size = buttonSize

      button.y = height / 2

      button.x = width / 2 + index * (buttonSize + buttonSpacing) - (buttonSize + buttonSpacing) / 2
    })
  }
}
