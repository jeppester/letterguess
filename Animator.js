import AnimationBuilder from './AnimationBuilder.js'

export default class Animator extends Array {
  constructor(startTime) {
    super()

    this.time = startTime
  }

  animate(target) {
    return new AnimationBuilder(this, target)
  }

  delay(duration, callback) {
    const animation = {
      duration,
      callback
    }
    this.push(animation)

    return animation
  }

  easeLinear(t) {
    return t
  }

  easeInOutSine(t) {
    return -(Math.cos(Math.PI * t) - 1) / 2;
  }

  easeInCubic(t) {
    return t * t * t;
  }

  easeOutCubic(t) {
    return 1 - Math.pow(1 - t, 3);
  }

  easeInOutCubic(t) {
    return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
  }

  push(...animations) {
    animations.forEach(animation => {
      animation.values ||= {}

      // Set start time, and start values for each animation
      animation.startTime = this.time
      Object.entries(animation.values).forEach(([name, options]) => {
        if (options.from === undefined) options.from = animation.object[name]
        if (options.to === undefined) options.to = options.from
      })

      // Set default easing function
      if (!animation.ease) animation.ease = this.easeLinear
    })

    super.push(...animations)
  }

  update({ dT }) {
    this.time += dT
    const dropAnimations = []

    this.forEach((animation) => {
      // Update all values
      const aDT = this.time - animation.startTime
      const t = Math.min(aDT / animation.duration, 1)
      const tEased = animation.ease(t)
      Object.entries(animation.values).forEach(([name, options]) => {
        const dv = options.to - options.from
        animation.object[name] = options.from + dv * tEased
      })

      if (t === 1) {
        dropAnimations.push(animation)
        animation.callback?.call()
      }
    })

    dropAnimations.forEach(animation => {
      const index = this.indexOf(animation)
      if (index !== -1) {
        this.splice(index, 1)
      }
    })
  }
}
