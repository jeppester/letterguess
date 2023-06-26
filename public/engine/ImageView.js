import View from './View.js'

export default class ImageView extends View {
  constructor(image, { width, height, aspectRatio}) {
    super()

    if ([this._hasWidth, this._hasHeight].filter(v => v).length > 0) {
      throw new Error('Width or height is required')
    }

    this.image = image
    this.aspectRatio = aspectRatio !== undefined ? aspectRatio : image.width / image.height

    this.width = width
    this.height = height

    this.originXFraction = 0
    this.originYFraction = 0
  }

  getDimensions() {
    const hasWidth = this.width !== undefined
    const hasHeight = this.height !== undefined


    if (hasWidth && hasHeight) {
      return { width: this.width, height: this.height }
    }
    else if (hasWidth) {
      return { width: this.width, height: this.width / this.aspectRatio }
    }
    else  {
      return { width: this.aspectRatio * this.height, height: this.height }
    }
  }

  draw(gameContext) {
    super.draw(gameContext, () => {
      const { ctx } = gameContext
      const { width, height } = this.getDimensions()

      ctx.translate(-this.originXFraction * width, -this.originYFraction * height)
      this.currentTransform = ctx.getTransform();

      if (this.opacity !== 0) {
        ctx.drawImage(this.image, 0, 0, width, height)
      }
    })
  }
}
