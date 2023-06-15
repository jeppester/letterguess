export default function spliceRandom(array) {
  const index = Math.floor(Math.random() * array.length)
  const [value] = array.splice(index, 1)
  return value
}
