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
        'letters.B': "/audio/letters/A.mp3",
        'letters.C': "/audio/letters/A.mp3",
        'letters.D': "/audio/letters/A.mp3",
        'letters.E': "/audio/letters/A.mp3",
        'letters.F': "/audio/letters/A.mp3",
        'letters.G': "/audio/letters/A.mp3",
        'letters.H': "/audio/letters/A.mp3",
        'letters.I': "/audio/letters/A.mp3",
        'letters.J': "/audio/letters/A.mp3",
        'letters.K': "/audio/letters/A.mp3",
        'letters.L': "/audio/letters/A.mp3",
        'letters.M': "/audio/letters/A.mp3",
        'letters.N': "/audio/letters/A.mp3",
        'letters.O': "/audio/letters/A.mp3",
        'letters.P': "/audio/letters/A.mp3",
        'letters.Q': "/audio/letters/A.mp3",
        'letters.R': "/audio/letters/A.mp3",
        'letters.S': "/audio/letters/A.mp3",
        'letters.T': "/audio/letters/A.mp3",
        'letters.U': "/audio/letters/A.mp3",
        'letters.V': "/audio/letters/A.mp3",
        'letters.W': "/audio/letters/A.mp3",
        'letters.X': "/audio/letters/A.mp3",
        'letters.Y': "/audio/letters/A.mp3",
        'letters.Z': "/audio/letters/A.mp3",
        'letters.Æ': "/audio/letters/A.mp3",
        'letters.Ø': "/audio/letters/A.mp3",
        'letters.Å': "/audio/letters/A.mp3",
      }
    }, (loaded, total) => console.log(`Loaded ${loaded}/${total}`))
  }

  onLoaded(gameContext) {
    gameContext.mainViewList.removeChild(this)
    gameContext.mainViewList.push(new GameRoom(gameContext))
  }
}
