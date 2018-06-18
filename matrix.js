const operators = {
  '+': (a, b) => a + b,
  '-': (a, b) => a - b,
  '/': (a, b) => a / b,
  '*': (a, b) => a * b
}

module.exports = class Matrix {
  constructor(rows, columns) {
    if (!rows || !columns) {
      console.error("FATAL: Cannot initialize matrix, make sure to specify amount of rows and columns.")
    }
    this.rows = rows
    this.columns = columns
    this.data = new Array(this.rows)

    for (let row = 0; row < this.rows; row++) {
      this.data[row] = new Array(this.columns)
      for (let col = 0; col < this.columns; col++)
        this.data[row][col] = 0
    }
  }

  randomize() {
    for (let row = 0; row < this.rows; row++)
      for (let col = 0; col < this.columns; col++)
        this.data[row][col] = Math.floor(Math.random()*10)
  }

  add(value) {
    this._operation('+', value)
  }

  subtract(value) {
    this._operation('-', value)
  }

  divide(value) {
    this._operation('/', value)
  }

  multiply(value) {
    this._operation('*', value)
  }

  transpose() {
    const result = new Matrix(this.columns, this.rows)
    for (let row = 0; row < this.rows; row++)
      for (let col = 0; col < this.columns; col++)
        result.data[col][row] = this.data[row][col]
    
    return result
  }

  map(fn) {
    for (let row = 0; row < this.rows; row++)
      for (let col = 0; col < this.columns; col++)
        this.data[row][col] = fn(this.data[row][col])
  }

  _operation(operator, value) {
    if (value instanceof Matrix) this._elementWiseOperation(operator, value)
    else this._scalarOperation(operator, value)
  }

  _scalarOperation(op, n) {
    for (let row = 0; row < this.rows; row++)
      for (let col = 0; col < this.columns; col++)
        this.data[row][col] = operators[op](this.data[row][col], n)
  }

  _elementWiseOperation(op, other) {
    if (this.rows !== other.rows || this.columns !== other.columns) {
      console.error('FATAL: Elementwise matrix operations are only allowed on matrices of equal size.')
      return
    }

    for (let row = 0; row < this.rows; row++)
      for (let col = 0; col < this.columns; col++)
        this.data[row][col] = operators[op](this.data[row][col], other.matrix[row][col])
  }
  
  static product(a, b) {
    if (a.rows !== b.columns || a.columns !== b.rows) {
      console.error('FATAL: Matrix product operation is only allowed on matrices where a.rows == b.columns and a.columns == b.rows (e.g. [2,3] && [3,2]).')
      return
    }

    let product = new Matrix(a.rows, b.columns)

    for (let row = 0; row < product.rows; row++)
      for (let col = 0; col < product.columns; col++)
        for (let current = 0; current < a.columns; current++)
          product.data[row][col] += a.matrix[row][current] * b.matrix[current][col]

    return product
  }

  print() {
    let output = 'Matrix:\n'
    for (let row = 0; row < this.rows; row++)
      output += `\t${this.data[row]}\n`
    console.log(output)
  }
}