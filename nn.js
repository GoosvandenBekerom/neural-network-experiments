var Matrix = require('./matrix')

const sigmoid = x => 1 / (1 + Math.exp(-x))
const dsigmoid = y => y * (1 - y)

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
    this.learning_rate = .1
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

  train(inputs, targets) {
    if (!(inputs instanceof Matrix)) {
      if (inputs instanceof Array) inputs = Matrix.fromArray(inputs)
      else {
        console.error('FATAL: training inputs should be an Array or a Matrix.')
        return undefined
      }
    }
    if (!(targets instanceof Matrix)) {
      if (targets instanceof Array) targets = Matrix.fromArray(targets)
      else {
        console.error('FATAL: training targets should be an Array or a Matrix.')
        return undefined
      }
    } 

    // Generate hidden outputs
    let hidden = Matrix.product(this.weightsIH, inputs)
    hidden.add(this.biasHidden)
    hidden.map(sigmoid)

    // Generate outputs
    let outputs = Matrix.product(this.weightsHO, hidden)
    outputs.add(this.biasOut)
    outputs.map(sigmoid)

    const output_errors = Matrix.subtract(targets, outputs)

    // Calculate output gradients
    const gradients = Matrix.map(outputs, dsigmoid)
    gradients.multiply(output_errors)
    gradients.multiply(this.learning_rate)

    // Calculate output deltas
    const hidden_T = hidden.transpose()
    const weightsHO_deltas = Matrix.product(gradients, hidden_T)

    // Adjust output weights and bias
    this.weightsHO.add(weightsHO_deltas)
    this.biasOut.add(gradients)
    
    // Calculate hidden layer errors
    const weightsHO_T = this.weightsHO.transpose()
    const hidden_errors = Matrix.product(weightsHO_T, output_errors)

    // Calculate hidden gradients
    const hidden_gradients = Matrix.map(hidden, dsigmoid)
    hidden_gradients.multiply(hidden_errors)
    hidden_gradients.multiply(this.learning_rate)

    // Calculate hidden deltas
    const inputs_T = inputs.transpose()
    const weightsIH_deltas = Matrix.product(hidden_gradients, inputs_T)

    // Adjust output weights and bias
    this.weightsIH.add(weightsIH_deltas)
    this.biasHidden.add(hidden_gradients)
  }

  print() {
    console.log("Neural network: " + this.amountIn + " inputs, " + this.amountHidden + " hidden, " + this.amountOut + " outputs")
  }
}
