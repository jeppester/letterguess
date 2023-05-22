import ViewList from '/ViewList.js'
import Room from '/Room.js'
import Animator from '/Animator.js'

let lastTime = performance.now()

const mainViewList = new ViewList()
const canvas = document.querySelector('#game')

const gameContext = {
  dT: 0,
  width: 0,
  height: 0,
  mainViewList,
  ctx: canvas.getContext('2d'),
  animator: new Animator(lastTime),
}

const resize = () => {
  canvas.width = gameContext.width = window.innerWidth;
  canvas.height = gameContext.height = window.innerHeight
}
window.addEventListener('resize', resize)
resize()

const mainLoop = (currentTime) => {
  gameContext.dT = currentTime - lastTime
  lastTime = currentTime

  mainViewList.update(gameContext)
  gameContext.animator.update(gameContext)

  gameContext.ctx.clearRect(0, 0, gameContext.width, gameContext.height)

  mainViewList.draw(gameContext)

  requestAnimationFrame(mainLoop)
}

const handleEvent = (event) => {
  mainViewList.handleEvent({ gameContext, event })
}

['click', 'resize'].forEach(name => {
  addEventListener(name, handleEvent)
})

requestAnimationFrame(mainLoop)

mainViewList.push(new Room(gameContext))
