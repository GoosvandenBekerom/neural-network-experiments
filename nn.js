module.exports = class NeuralNetwork {
  constructor(input, hidden, output) {
    this.amountIn = input
    this.amountHidden = hidden
    this.amountOut = output
  }

  print() {
    console.log("Neural network: " + this.amountIn + " inputs, " + this.amountHidden + " hidden, " + this.amountOut + " outputs")
  }
}
