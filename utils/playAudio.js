export default function playAudio(context, audioBuffer) {
  const source = context.createBufferSource()
  source.buffer = audioBuffer
  source.connect(context.destination)
  source.start(0)
}
