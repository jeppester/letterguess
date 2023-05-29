import ViewList from './ViewList.js'
import GameRoom from './GameRoom.js'

export default class LoaderRoom extends ViewList {
  constructor(gameContext) {
    super()

    this.loadAssets(gameContext).then(this.onLoaded.bind(this, gameContext))
  }

  async loadAssets(gameContext) {
    const { assetLoader } = gameContext

    await assetLoader.loadAssets({
      audio: {
        'letters.A': "/audio/letters/A.mp3",
        'letters.B': "/audio/letters/B.mp3",
        'letters.C': "/audio/letters/C.mp3",
        'letters.D': "/audio/letters/D.mp3",
        'letters.E': "/audio/letters/E.mp3",
        'letters.F': "/audio/letters/F.mp3",
        'letters.G': "/audio/letters/G.mp3",
        'letters.H': "/audio/letters/H.mp3",
        'letters.I': "/audio/letters/I.mp3",
        'letters.J': "/audio/letters/J.mp3",
        'letters.K': "/audio/letters/K.mp3",
        'letters.L': "/audio/letters/L.mp3",
        'letters.M': "/audio/letters/M.mp3",
        'letters.N': "/audio/letters/N.mp3",
        'letters.O': "/audio/letters/O.mp3",
        'letters.P': "/audio/letters/P.mp3",
        'letters.Q': "/audio/letters/Q.mp3",
        'letters.R': "/audio/letters/R.mp3",
        'letters.S': "/audio/letters/S.mp3",
        'letters.T': "/audio/letters/T.mp3",
        'letters.U': "/audio/letters/U.mp3",
        'letters.V': "/audio/letters/V.mp3",
        'letters.W': "/audio/letters/W.mp3",
        'letters.X': "/audio/letters/X.mp3",
        'letters.Y': "/audio/letters/Y.mp3",
        'letters.Z': "/audio/letters/Z.mp3",
        'letters.Æ': "/audio/letters/Æ.mp3",
        'letters.Ø': "/audio/letters/Ø.mp3",
        'letters.Å': "/audio/letters/Å.mp3",
      }
    }, (loaded, total) => console.log(`Loaded ${loaded}/${total}`))
  }

  onLoaded(gameContext) {
    gameContext.mainViewList.removeChild(this)
    gameContext.mainViewList.push(new GameRoom(gameContext))
  }
}
