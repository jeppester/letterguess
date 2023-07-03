import ViewList from '../../engine/ViewList.js'
import ImageView from '../../engine/ImageView.js'
import spliceRandom from '../utils/spliceRandom.js'

export default class Trophy extends ViewList {
  constructor(gameContext, letterCount) {
    super()

    const { assetLoader, animator } = gameContext

    this.letterCount = letterCount
    const lettersPerAward = letterCount / 5
    this.awardLetterCounts = []
    for (let i = 1; i <= 5; i++) {
      this.awardLetterCounts.push(Math.round(i * lettersPerAward))
    }
    this.progress = 0

    this.resize(gameContext)
    Object.assign(this, this.getMinifiedProps(gameContext))

    window.trophy = this
    window.gameContext = gameContext

    this.background = new ImageView(assetLoader.images[`trophy-silhouette`], { width: this.size })
    this.background.originXFraction = .5
    this.background.originYFraction = .5

    this.pieces = [...new Array(5)].map((_value, index) => {
      const pieceImage = assetLoader.images[`trophy${index + 1}`]
      const view = new ImageView(pieceImage, { width: this.size })
      view.originXFraction = .5
      view.originYFraction = .5
      view.opacity = 0

      return view
    })

    this.push(this.background,...this.pieces)

    this.inactivePieces = this.pieces.slice()
    this.activePieces = []

    animator
      .animate(this.background)
      .tween({
        opacity: { from: 0, to: 1},
        [this.isLandscape ? 'originY' : 'originX']: { from: -this.size * .5 },
      }, 500, animator.easeOutCubic)
      .start()
  }

  async advance(gameContext) {
    this.progress ++

    const finished = this.progress === this.letterCount
    if (this.awardLetterCounts.includes(this.progress)) {
      await this.animateIn(gameContext)
      await this.awardPiece(gameContext)

      if (!finished) {
        await this.animateOut(gameContext)
      }
    }

    return finished
  }

  async celebrate(gameContext) {
    const { animator } = gameContext

    const distX = this.size * .06
    const distY = this.size * .04
    let wiggleInT = 0

    await Promise.all([
      animator
        .animate(this)
        .tween(t => {
          wiggleInT = Math.max(t, wiggleInT)

          const rotationX = t * Math.PI * 2
          const rotationY = Math.PI / 4 + t * Math.PI * 4
          const rotation = Math.sin(t * Math.PI * 2) * 10

          return {
            originX: Math.cos(rotationX) * distX * wiggleInT,
            originY: Math.sin(rotationY) * distY * wiggleInT,
            rotation: rotation * wiggleInT,
          }
        }, 4000)
        .loop()
    ])
  }

  async awardPiece(gameContext) {
    const { animator } = gameContext

    const newPiece = spliceRandom(this.inactivePieces)
    this.activePieces.push(newPiece)
    newPiece.opacity = 1
    const angle = this.getPieceAngle(this.pieces.indexOf(newPiece))
    const distance = this.size * .3
    const bounceDist = this.size * .02
    const duration = 200

    await animator
      .animate(newPiece)
      .tween({
        x: { from: Math.cos(angle) * distance, to: 0 },
        y: { from: Math.sin(angle) * distance, to: 0 },
        opacity: { from: 0, to: 1 },
      }, duration, animator.easeInCubic)
      .start()
    await animator
      .animate(this)
      .tween({ originX: Math.cos(angle) * bounceDist, originY: Math.sin(angle) * bounceDist }, 120, animator.easeOutCubic)
      .tween({ originX: 0, originY: 0 }, 120, animator.easeInCubic)
      .wait(500)
      .start()
  }

  getPieceAngle(index) {
    const angleIncrement = Math.PI * 2 / this.pieces.length
    const angleOffset = Math.PI * 0.5

    return angleOffset + angleIncrement * index
  }

  getMinifiedProps(gameContext) {
    if (this.isLandscape) {
      return {
        x: 0,
        y: gameContext.height / 2 - this.minifiedSize * 0.6 - 10,
        scaleX: this.minifiedScale,
        scaleY: this.minifiedScale,
      }
    }
    else {
      return {
        x: gameContext.width / 2 - this.minifiedSize * 0.6 - 10,
        y: 0,
        scaleX: this.minifiedScale,
        scaleY: this.minifiedScale,
      }
    }
  }

  async animateIn(gameContext) {
    const { animator } = gameContext

    const duration = 600

    await animator
      .animate(this)
      .tween({
        scaleX: 1,
        scaleY: 1,
        x: 0,
        y: 0,
      }, duration, animator.easeInOutCubic)
      .start(),
    await animator.delay(600)
  }

  async animateOut(gameContext) {
    const { animator } = gameContext

    const duration = 600

    await animator
    .animate(this)
    .tween(this.getMinifiedProps(gameContext), duration, animator.easeInOutCubic)
    .start(),

    await animator.delay(200)
  }

  handleEvent({ gameContext, event }) {
    if (event.type == "resize") {
      this.resize(gameContext)
    }
    super.handleEvent({ gameContext, event })
  }

  resize({ width, height }) {
    this.size = Math.min(width, height) * .5
    this.isLandscape = width > height
    this.minifiedScale = .05
    this.minifiedSize = this.size * this.minifiedScale
  }
}
