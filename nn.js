var Matrix = require('./matrix')

const sigmoid = x => 1 / (1 + Math.exp(-x))

module.exports = class NeuralNetwork {
  constructor(input, hidden, output) {
    this.amountIn = input
    this.amountHidden = hidden
    this.amountOut = output

    this.weightsIH = new Matrix(this.amountHidden, this.amountIn)
    this.weightsHO = new Matrix(this.amountOut, this.amountHidden)
    this.weightsIH.randomize()
    this.weightsHO.randomize()

    this.biasHidden = new Matrix(this.amountHidden, 1)
    this.biasOut = new Matrix(this.amountOut, 1)
    this.biasHidden.randomize()
    this.biasOut.randomize()
  }

  feedforward(inputs) {
    if (!(inputs instanceof Matrix)) {
      if (inputs instanceof Array) inputs = Matrix.fromArray(inputs)
      else {
        console.error('FATAL: feedforward input should be an Array or a Matrix.')
        return undefined
      }
    } 

    // Generate hidden outputs
    let hidden = Matrix.product(this.weightsIH, inputs)
    hidden.add(this.biasHidden)
    hidden.map(sigmoid)

    // Generate outputs
    let output = Matrix.product(this.weightsHO, hidden)
    output.add(this.biasOut)
    output.map(sigmoid)

    return output
  }

  print() {
    console.log("Neural network: " + this.amountIn + " inputs, " + this.amountHidden + " hidden, " + this.amountOut + " outputs")
  }
}
