export default class ViewList extends Array {
  constructor() {
    super()

    this.x = 0
    this.y = 0
    this.rotation = 0
    this.originX = 0
    this.originY = 0
    this.scaleX = 1
    this.scaleY = 1
  }

  handleEvent(event) {
    this.forEach((object) => {
      object.handleEvent?.call(object, event)
    })
  }

  update(gameContext) {
    this.forEach((child) => {
      child.update?.call(child, gameContext)
    })
  }

  draw({ ctx }) {
    ctx.save()

    ctx.translate(this.x, this.y)
    ctx.rotate(this.rotation / 180 * Math.PI)
    ctx.scale(this.scaleX, this.scaleY);
    ctx.translate(-this.originX, -this.originY)

    this.forEach((child) => {
      child.draw?.call(child, { ctx })
    })

    ctx.restore()
  }
}
