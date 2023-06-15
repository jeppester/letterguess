import ViewList from '../../engine/ViewList.js'
import GameScreen from '../GameScreen/GameScreen.js'
import ProgressBar from './ProgressBar.js'
import StartButton from './StartButton.js'

export default class LoadingScreen extends ViewList {
  constructor(gameContext) {
    super()

    this.loadAssets(gameContext)
    this.progressBar = new ProgressBar(this.onProgressBarFinished.bind(this, gameContext))
    this.push(this.progressBar)
  }

  async loadAssets(gameContext) {
    const { assetLoader } = gameContext

    await assetLoader.loadAssets({
      audio: {
        "letters/A": "/audio/letters/A.mp3",
        "letters/B": "/audio/letters/B.mp3",
        "letters/C": "/audio/letters/C.mp3",
        "letters/D": "/audio/letters/D.mp3",
        "letters/E/E1": "/audio/letters/E/E1.mp3",
        "letters/E/E2": "/audio/letters/E/E2.mp3",
        "letters/F": "/audio/letters/F.mp3",
        "letters/G": "/audio/letters/G.mp3",
        "letters/H": "/audio/letters/H.mp3",
        "letters/I": "/audio/letters/I.mp3",
        "letters/J": "/audio/letters/J.mp3",
        "letters/K": "/audio/letters/K.mp3",
        "letters/L": "/audio/letters/L.mp3",
        "letters/M": "/audio/letters/M.mp3",
        "letters/N": "/audio/letters/N.mp3",
        "letters/O": "/audio/letters/O.mp3",
        "letters/P": "/audio/letters/P.mp3",
        "letters/Q": "/audio/letters/Q.mp3",
        "letters/R": "/audio/letters/R.mp3",
        "letters/S": "/audio/letters/S.mp3",
        "letters/T": "/audio/letters/T.mp3",
        "letters/U": "/audio/letters/U.mp3",
        "letters/V": "/audio/letters/V.mp3",
        "letters/W": "/audio/letters/W.mp3",
        "letters/X": "/audio/letters/X.mp3",
        "letters/Y": "/audio/letters/Y.mp3",
        "letters/Z": "/audio/letters/Z.mp3",
        "letters/Æ": "/audio/letters/AE.mp3",
        "letters/Ø": "/audio/letters/OE.mp3",
        "letters/Å": "/audio/letters/AA.mp3",
        "success/det-har-du-styr-paa": "/audio/success/det-har-du-styr-paa.mp3",
        "success/du-er-en-stjerne": "/audio/success/du-er-en-stjerne.mp3",
        "success/du-er-mega-sej": "/audio/success/du-er-mega-sej.mp3",
        "success/faenomenalt": "/audio/success/faenomenalt.mp3",
        "success/fan-tastisk": "/audio/success/fan-tastisk.mp3",
        "success/fedest": "/audio/success/fedest.mp3",
        "success/fedt-manner": "/audio/success/fedt-manner.mp3",
        "success/fremragende": "/audio/success/fremragende.mp3",
        "success/godt-gaettet": "/audio/success/godt-gaettet.mp3",
        "success/godt-gaaet": "/audio/success/godt-gaaet.mp3",
        "success/godt-klaret": "/audio/success/godt-klaret.mp3",
        "success/hammergodt": "/audio/success/hammergodt.mp3",
        "success/henrivende": "/audio/success/henrivende.mp3",
        "success/huh-ra": "/audio/success/huh-ra.mp3",
        "success/hurra": "/audio/success/hurra.mp3",
        "success/mega-fedt": "/audio/success/mega-fedt.mp3",
        "success/nu-vinder-du-en-pokal": "/audio/success/nu-vinder-du-en-pokal.mp3",
        "success/sejest": "/audio/success/sejest.mp3",
        "success/sejt-manner": "/audio/success/sejt-manner.mp3",
        "success/succes": "/audio/success/succes.mp3",
        "success/super-fedt": "/audio/success/super-fedt.mp3",
        "success/saadan": "/audio/success/saadan.mp3",
        "success/utroligt": "/audio/success/utroligt.mp3",
        "success/vildt-nok": "/audio/success/vildt-nok.mp3",
        "success/vildt-sejt": "/audio/success/vildt-sejt.mp3",
        "failure/before-correct/du-skal-finde1": "/audio/failure/before-correct/du-skal-finde1.mp3",
        "failure/before-correct/du-skal-finde": "/audio/failure/before-correct/du-skal-finde.mp3",
        "failure/before-correct/proev-at-finde": "/audio/failure/before-correct/proev-at-finde.mp3",
        "failure/before-correct/proev-at-find-et": "/audio/failure/before-correct/proev-at-find-et.mp3",
        "failure/before-correct/proev-igen-at-finde": "/audio/failure/before-correct/proev-igen-at-finde.mp3",
        "failure/before-correct/vi-leder-efter1": "/audio/failure/before-correct/vi-leder-efter1.mp3",
        "failure/before-correct/vi-leder-efter": "/audio/failure/before-correct/vi-leder-efter.mp3",
        "failure/before-incorrect/det-var-vist": "/audio/failure/before-incorrect/det-var-vist.mp3",
        "failure/before-incorrect/taet-paa-men-det-var": "/audio/failure/before-incorrect/taet-paa-men-det-var.mp3",
        "failure/before-incorrect/ups-det-var-et": "/audio/failure/before-incorrect/ups-det-var-et.mp3",
        "failure/before-incorrect/vups-det-var": "/audio/failure/before-incorrect/vups-det-var.mp3",
      }
    }, this.onProgress.bind(this, gameContext))
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
        gameContext.mainViewList.push(new GameScreen(gameContext))
      })
  }
}
