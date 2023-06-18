import ViewList from '../../engine/ViewList.js'
import ModeSelectionScreen from '../ModeSelectionScreen/ModeSelectionScreen.js'
import ProgressBar from './ProgressBar.js'
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
    gameContext.mainViewList.removeChild(this)
    gameContext.mainViewList.push(new ModeSelectionScreen(gameContext))
  }
}
