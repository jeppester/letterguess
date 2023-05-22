export default class ViewList extends Array {
  constructor() {
    super()

    this.x = 0
    this.y = 0
    this.rotation = 0
    this.offset = { x: 0, y: 0}
    this.scale = { x: 1, y: 1 }
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
    ctx.scale(this.scale.x, this.scale.y);
    ctx.translate(-this.offset.x, -this.offset.y)

    this.forEach((child) => {
      child.draw?.call(child, { ctx })
    })

    ctx.restore()
  }
}
