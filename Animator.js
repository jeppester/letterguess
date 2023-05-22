export default class Animator extends Array {
  constructor(startTime) {
    super()

    this.time = startTime
  }

  easeLinear(t) {
    return t
  }

  easeInOutSine(t) {
    return -(Math.cos(Math.PI * t) - 1) / 2;
  }

  push(...animations) {
    animations.forEach(animation => {
      // Set start time, and start values for each animation
      animation.startTime = this.time
      Object.entries(animation.values).forEach(([name, options]) => {
        options.from = animation.object[name]
      })

      // Set default easing function
      if (!animation.ease) animation.ease = this.easeLinear
    })

    super.push(...animations)
  }

  update({ dT }) {
    this.time += dT
    const dropIndexes = []

    this.forEach((animation, index) => {
      // Update all values
      const aDT = this.time - animation.startTime
      const t = Math.min(aDT / animation.duration, 1)
      const tEased = animation.ease(t)
      Object.entries(animation.values).forEach(([name, options]) => {
        const dv = options.to - options.from
        animation.object[name] = options.from + dv * tEased
      })

      if (t === 1) {
        dropIndexes.push(index)
        animation.callback?.call()
      }
    })

    dropIndexes.reverse().forEach(index => this.splice(index, 1))
  }
}
