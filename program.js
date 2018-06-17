var NeuralNetwork = require('./nn')
var Matrix = require('./matrix')

const updatesPerSecond = 1
const interval = 1000 / updatesPerSecond
let loop = false

const brain = new NeuralNetwork(3, 4, 2)

function init() {
  let m = new Matrix(2, 3)
  m.randomize()
  m.print()
  m.transpose().print()
}

function update() {
  
}

init();
if (loop) setInterval(() => update(), interval);