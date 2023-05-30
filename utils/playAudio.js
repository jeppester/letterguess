export default function playAudio(context, audioBuffer) {
  return new Promise((resolve) => {
    const source = context.createBufferSource()
    source.buffer = audioBuffer
    source.connect(context.destination)
    source.addEventListener('ended', resolve)
    source.start(0)
  })
}
