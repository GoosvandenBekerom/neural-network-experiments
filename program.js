var NeuralNetwork = require('./nn')
var Matrix = require('./matrix')

const updatesPerSecond = 1
const interval = 1000 / updatesPerSecond
const rnd = (min, max) => Math.floor(Math.random() * (max - min) + min)
let loop = false

const brain = new NeuralNetwork(2, 2, 1)

const training_data = [
  { inputs: [0, 0], targets: [0] },
  { inputs: [1, 1], targets: [0] },
  { inputs: [0, 1], targets: [1] },
  { inputs: [1, 0], targets: [1] }
]

function init() {
  for (let i = 0; i < 50000; i++) {
    for (data of training_data) {
      brain.train(data.inputs, data.targets)
    }
  }

  const o00 = brain.feedforward([0, 0]).print()
  const o11 = brain.feedforward([1, 1]).print()
  const o01 = brain.feedforward([0, 1]).print()
  const o10 = brain.feedforward([1, 0]).print()
}

function update() {
  
}

init();
if (loop) setInterval(() => update(), interval);