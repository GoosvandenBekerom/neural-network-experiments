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

  static fromArray(arr) {
    let m = new Matrix(arr.length, 1)
    for (let i = 0; i < m.rows; i++)
      m.data[i][0] = arr[i]
    return m
  }

  toArray() {
    let arr = new Array(this.rows * this.columns)
    let index = 0
    for (let row = 0; row < this.rows; row++)
      for (let col = 0; col < this.columns; col++)
        arr[index++] = this.data[row][col]
    return arr
  }

  randomize() {
    for (let row = 0; row < this.rows; row++)
      for (let col = 0; col < this.columns; col++)
        this.data[row][col] = Math.random()*2-1
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
        this.data[row][col] = operators[op](this.data[row][col], other.data[row][col])
  }
  
  static product(a, b) {
    if (a.columns !== b.rows) {
      console.error(`FATAL: Matrix product operation expects a\'s columns and b\'s rows to be of equal length. (actual a: ${a.columns} b: ${b.rows})`)
      return
    }

    let product = new Matrix(a.rows, b.columns)

    for (let row = 0; row < product.rows; row++)
      for (let col = 0; col < product.columns; col++)
        for (let current = 0; current < a.columns; current++)
          product.data[row][col] += a.data[row][current] * b.data[current][col]

    return product
  }

  print() {
    let output = 'Matrix:\n'
    for (let row = 0; row < this.rows; row++)
      output += `\t${this.data[row]}\n`
    console.log(output)
  }
}