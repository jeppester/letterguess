export default class AnimationBuilder {
  constructor(animator, target) {
    this.animator = animator
    this.target = target
    this.tweens = []
  }

  tween(values, duration = 200, ease) {
    this.tweens.push({
      object: this.target,
      values,
      duration,
      ease
    })

    return this
  }

  start(callback) {
    this.tweens.forEach((tween, index) => {
      if (index === this.tweens.length - 1) {
        tween.callback = callback
      }
      else {
        const nextTween = this.tweens[index + 1]
        tween.callback = () => {
          this.animator.push(nextTween)
        }
      }
    })

    this.animator.push(this.tweens[0])
  }
}
