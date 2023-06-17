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
        "letters/A1": "/audio/letters/A1.mp3",
        "letters/A2": "/audio/letters/A2.mp3",
        "letters/B1": "/audio/letters/B1.mp3",
        "letters/B2": "/audio/letters/B2.mp3",
        "letters/C1": "/audio/letters/C1.mp3",
        "letters/C2": "/audio/letters/C2.mp3",
        "letters/D1": "/audio/letters/D1.mp3",
        "letters/D2": "/audio/letters/D2.mp3",
        "letters/E1": "/audio/letters/E1.mp3",
        "letters/E2": "/audio/letters/E2.mp3",
        "letters/E3": "/audio/letters/E3.mp3",
        "letters/F1": "/audio/letters/F1.mp3",
        "letters/F2": "/audio/letters/F2.mp3",
        "letters/G1": "/audio/letters/G1.mp3",
        "letters/G2": "/audio/letters/G2.mp3",
        "letters/H1": "/audio/letters/H1.mp3",
        "letters/H2": "/audio/letters/H2.mp3",
        "letters/I1": "/audio/letters/I1.mp3",
        "letters/I2": "/audio/letters/I2.mp3",
        "letters/J1": "/audio/letters/J1.mp3",
        "letters/J2": "/audio/letters/J2.mp3",
        "letters/K1": "/audio/letters/K1.mp3",
        "letters/K2": "/audio/letters/K2.mp3",
        "letters/L1": "/audio/letters/L1.mp3",
        "letters/L2": "/audio/letters/L2.mp3",
        "letters/M1": "/audio/letters/M1.mp3",
        "letters/M2": "/audio/letters/M2.mp3",
        "letters/N1": "/audio/letters/N1.mp3",
        "letters/N2": "/audio/letters/N2.mp3",
        "letters/O1": "/audio/letters/O1.mp3",
        "letters/O2": "/audio/letters/O2.mp3",
        "letters/P1": "/audio/letters/P1.mp3",
        "letters/P2": "/audio/letters/P2.mp3",
        "letters/Q1": "/audio/letters/Q1.mp3",
        "letters/Q2": "/audio/letters/Q2.mp3",
        "letters/R1": "/audio/letters/R1.mp3",
        "letters/R2": "/audio/letters/R2.mp3",
        "letters/S1": "/audio/letters/S1.mp3",
        "letters/S2": "/audio/letters/S2.mp3",
        "letters/T1": "/audio/letters/T1.mp3",
        "letters/T2": "/audio/letters/T2.mp3",
        "letters/U1": "/audio/letters/U1.mp3",
        "letters/U2": "/audio/letters/U2.mp3",
        "letters/V1": "/audio/letters/V1.mp3",
        "letters/V2": "/audio/letters/V2.mp3",
        "letters/W1": "/audio/letters/W1.mp3",
        "letters/W2": "/audio/letters/W2.mp3",
        "letters/X1": "/audio/letters/X1.mp3",
        "letters/X2": "/audio/letters/X2.mp3",
        "letters/Y1": "/audio/letters/Y1.mp3",
        "letters/Y2": "/audio/letters/Y2.mp3",
        "letters/Z1": "/audio/letters/Z1.mp3",
        "letters/Z2": "/audio/letters/Z2.mp3",
        "letters/Æ1": "/audio/letters/AE1.mp3",
        "letters/Æ2": "/audio/letters/AE2.mp3",
        "letters/Ø1": "/audio/letters/OE1.mp3",
        "letters/Ø2": "/audio/letters/OE2.mp3",
        "letters/Å1": "/audio/letters/AA1.mp3",
        "letters/Å2": "/audio/letters/AA2.mp3",
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
        "success/aarh-fedt": "/audio/success/aarh-fedt.mp3",
        "success/aarh-hvor-du-god-det-var-rigtigt": "/audio/success/aarh-hvor-du-god-det-var-rigtigt.mp3",
        "success/det-her-det-har-du-styr-paa": "/audio/success/det-her-det-har-du-styr-paa.mp3",
        "success/det-var-rigtigt": "/audio/success/det-var-rigtigt.mp3",
        "success/du-ka-bar-det-der": "/audio/success/du-ka-bar-det-der.mp3",
        "success/du-kender-bare-de-bogstaver": "/audio/success/du-kender-bare-de-bogstaver.mp3",
        "success/fedt-du-oever-dig": "/audio/success/fedt-du-oever-dig.mp3",
        "success/for-viildt-man": "/audio/success/for-viildt-man.mp3",
        "success/godt-gaettet-2": "/audio/success/godt-gaettet-2.mp3",
        "success/hurraaaah": "/audio/success/hurraaaah.mp3",
        "success/mega-godt": "/audio/success/mega-godt.mp3",
        "success/mega-sejt": "/audio/success/mega-sejt.mp3",
        "success/oevelse-goer-mester": "/audio/success/oevelse-goer-mester.mp3",
        "success/saadan-2": "/audio/success/saadan-2.mp3",
        "success/wauw-du-en-stjerne": "/audio/success/wauw-du-en-stjerne.mp3",
        "success/wauw-se-dig-lige": "/audio/success/wauw-se-dig-lige.mp3",
        "success/wauw-sejt-man": "/audio/success/wauw-sejt-man.mp3",
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
