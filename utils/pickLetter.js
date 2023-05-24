export default function pickLetter(exclude = []) {
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZÆØÅ"

  let letter
  do {
    letter = letters.charAt(Math.floor(Math.random() * letters.length))
  }
  while(exclude.includes(letter))

  return letter
}
