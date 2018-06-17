const width = 400, height = 400

function rnd(min, max) {
  return Math.random() * (max - min) + min
}

function sign(x) {
  if (x >= 0) return 1
  else return -1
}

class Perceptron {
  constructor(amountOfWeights) {
    this.weights = []
    this.lr = 0.1
    let min = -1
    let max = 1
    for (let i = 0; i < amountOfWeights; i++) {
      this.weights[i] = rnd(min, max)
    }
  }

  guess(inputs) {
    let sum = 0
    for (let i = 0; i < this.weights.length; i++) {
      sum += inputs[i]*this.weights[i]
    }
    return sign(sum)
  }

  train(inputs, target) {
    let guess = this.guess(inputs)
    let error = target - guess

    for (let i = 0; i < this.weights.length; i++) {
      this.weights[i] += error * inputs[i] * this.lr
    }

    return [guess, error]
  }
}

class Point {
  constructor(x, y) {
    this.x = x
    this.y = y
    this.bias = 1
    this.classification = y <= height/2 ? -1 : 1
  }

  print(brainData) {
    console.log('X: ' + this.x + ', Y: ' + this.y + ' exp: ' + this.classification + (brainData[0] ? ' guess: ' + brainData[0] : '') + (brainData[1] ? ' error: ' + brainData[1] : ''))
  }
}

const brain = new Perceptron(3)
let points = []

// Create 100 random points
for (let i = 0; i < 500; i++) {
  points[i] = new Point(Math.floor(rnd(0, width-1)), Math.floor(rnd(0, height-1)))
}

for (let i = 0; i < 100; i++) {
  console.log('======================================')
  console.log('START ITERATION ' + i)
  let loss = 0
  points.forEach(p => {
    let brainData = brain.train([p.x, p.y, p.bias], p.classification)
    //p.print(brainData)
    loss += brainData[1] || 0
  })
  console.log('weights: ' + brain.weights)
  console.log('Total loss: ' + loss)
  console.log('END ITERATION ' + i)
  console.log('======================================')
}