export default class View {
  constructor() {
    this.x = 0
    this.y = 0
    this.rotation = 0
    this.opacity = 1
    this.offset = { x: 0, y: 0}
    this.scale = { x: 1, y: 1 }
  }

  draw(ctx, drawWithTransform) {
    ctx.save()

    ctx.translate(this.x, this.y)
    ctx.rotate(this.rotation / 180 * Math.PI)
    ctx.scale(this.scale.x, this.scale.y);
    ctx.translate(-this.offset.x, -this.offset.y)

    drawWithTransform(ctx)

    ctx.restore()
  }
}
