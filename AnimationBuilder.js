function joinCallbacks(...callbacks) {
  return () => {
    return callbacks.reduce((chain, callback) => {
      return callback ? chain.then(callback) : chain
    }, Promise.resolve())
  }
}

export default class AnimationBuilder {
  constructor(animator, target) {
    this.animator = animator
    this.target = target
    this.tweens = []
  }

  tween(values, duration = 200, ease, callback) {
    this.tweens.push({
      target: this.target,
      values,
      duration,
      ease,
      callback
    })

    return this
  }

  wait(duration, callback) {
    this.tweens.push({
      duration,
      callback
    })

    return this
  }

  start(callback) {
    this.tweens.forEach((tween, index) => {
      if (index === this.tweens.length - 1) {
        tween.callback = joinCallbacks(tween.callback, callback)
      }
      else {
        const nextTween = this.tweens[index + 1]
        tween.callback = joinCallbacks(tween.callback, () => {
          this.animator.push(nextTween)
        })
      }
    })

    this.animator.push(this.tweens[0])
  }
}
