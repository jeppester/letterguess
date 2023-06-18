import ViewList from '../../engine/ViewList.js'
import RandomModeScreen from '../RandomModeScreen/RandomModeScreen.js'
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

    this.startButton = new StartButton(gameContext, this.handleStartGame.bind(this, gameContext))
    this.push(this.startButton)

    animator
      .animate(this.startButton)
      .tween({ opacity: { from: 0, to: 1 }, originY: { from: -this.startButton.size * .1 }}, 300, animator.easeOutCubic)
      .start()
  }

  handleStartGame(gameContext) {
    const { animator } = gameContext
    animator
      .animate(this.startButton)
      .tween({ scaleX: { to: 1.5 }, scaleY: { to: 1.5 }, opacity: { to: 0 }}, 400, animator.easeOutCubic)
      .wait(500)
      .start(() => {
        gameContext.mainViewList.removeChild(this)
        gameContext.mainViewList.push(new RandomModeScreen(gameContext))
      })
  }
}
