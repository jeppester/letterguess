export default class AssetLoader {
  constructor(audioContext) {
    this.audioContext = audioContext
    this.audio = {}
    this.images = {}
  }

  loadAssets({
    images = {},
    audio = {}
  } = {}, progressCallback) {
    const promises = []
    let loaded = 0
    let totalAssets = Object.keys(images).length + Object.keys(audio).length

    for (let [id, sourceUrl] of Object.entries(images)) {
      let promise = this.loadImage(id, sourceUrl).then(() => loaded += 1)

      if (progressCallback) {
        promise = promise.then(() => progressCallback(loaded, totalAssets))
      }
      promises.push(promise)
    }

    for (let [id, sourceUrl] of Object.entries(audio)) {
      let promise = this.loadAudio(id, sourceUrl).then(() => loaded += 1)

      if (progressCallback) {
        promise = promise.then(() => progressCallback(loaded, totalAssets))
      }
      promises.push(promise)
    }

    return Promise.all(promises)
  }
  async loadImage(id, sourceUrl) {
    const image = new Image()
    image.src = sourceUrl
    this.images[id] = image
    return new Promise((res, rej) => {
      image.onload = res
      image.onerror = rej
    })
  }

  async loadAudio(id, sourceUrl) {
    const response = await fetch(sourceUrl)
    const arrayBuffer = await response.arrayBuffer()
    const audioBuffer = await this.audioContext.decodeAudioData(arrayBuffer)
    this.audio[id] = audioBuffer
  }
}
