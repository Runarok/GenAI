// Complex number constructor and operations
function Complex(real, imag) {
  this.real = real;
  this.imag = imag;
}

Complex.prototype.add = function(other) {
  return new Complex(this.real + other.real, this.imag + other.imag);
}

Complex.prototype.multiply = function(other) {
  return new Complex(
    this.real * other.real - this.imag * other.imag,
    this.real * other.imag + this.imag * other.real
  );
}

Complex.prototype.conjugate = function() {
  return new Complex(this.real, -this.imag);
}

Complex.prototype.toString = function() {
  let realPart = this.real.toFixed(2);
  let imagPart = this.imag.toFixed(2);

  if (this.imag >= 0) {
    imagPart = `+${imagPart}`; // Add a '+' for positive imaginary part
  }

  if (realPart.endsWith(".00")) realPart = realPart.slice(0, -3);
  if (imagPart.endsWith(".00")) imagPart = imagPart.slice(0, -3);

  if (this.imag === 0) {
    return `${realPart}`;  // If imaginary part is 0, show only real part
  }
  return `${realPart} ${imagPart}i`;  // Otherwise, show both real and imaginary parts
}

Complex.fromPolar = function(r, theta) {
  return new Complex(r * Math.cos(theta), r * Math.sin(theta));
}

// DFT computation
function computeDFT() {
  const input = document.getElementById('inputSequence').value;
  const sequence = input.split(',').map(Number);
  const n = sequence.length;
  
  // Step 1: Create the DFT matrix (using complex exponentials)
  let F = [];
  for (let i = 0; i < n; i++) {
    let row = [];
    for (let j = 0; j < n; j++) {
      let angle = -2 * Math.PI * i * j / n;
      row.push(Complex.fromPolar(1, angle));  // e^(-2πij/n)
    }
    F.push(row);
  }

  // Step 2: Perform matrix multiplication (F * x)
  let result = [];
  for (let i = 0; i < n; i++) {
    let sum = new Complex(0, 0); // Start with 0
    for (let j = 0; j < n; j++) {
      let prod = F[i][j].multiply(new Complex(sequence[j], 0));  // F(i,j) * x(j)
      sum = sum.add(prod);
    }
    result.push(sum);
  }

  // Display the DFT matrix
  let matrixHtml = '<h2>DFT Matrix:</h2><table>';
  for (let i = 0; i < n; i++) {
    matrixHtml += '<tr>';
    for (let j = 0; j < n; j++) {
      matrixHtml += `<td>${F[i][j].toString()}</td>`;
    }
    matrixHtml += '</tr>';
  }
  matrixHtml += '</table>';
  document.getElementById('dftMatrix').innerHTML = matrixHtml;

  // Display the result of the matrix multiplication (DFT result)
  let resultHtml = '<h2>DFT Result:</h2><p>';
  result.forEach((val, idx) => {
    resultHtml += `<span class="complex-number">X[${idx}] = ${val.toString()}</span><br>`;
  });
  resultHtml += '</p>';
  document.getElementById('dftResult').innerHTML = resultHtml;
}

// IDFT computation (Inverse DFT)
function computeIDFT() {
  const input = document.getElementById('inputSequence').value;
  const sequence = input.split(',').map(Number);
  const n = sequence.length;

  // Step 1: Create the DFT matrix (using complex exponentials)
  let F = [];
  for (let i = 0; i < n; i++) {
    let row = [];
    for (let j = 0; j < n; j++) {
      let angle = 2 * Math.PI * i * j / n; // Note: positive exponent for IDFT
      row.push(Complex.fromPolar(1, angle));  // e^(2πij/n)
    }
    F.push(row);
  }

  // Step 2: Perform matrix multiplication (F^T * X)
  let result = [];
  for (let i = 0; i < n; i++) {
    let sum = new Complex(0, 0); // Start with 0
    for (let j = 0; j < n; j++) {
      let prod = F[j][i].multiply(new Complex(sequence[j], 0));  // F(j,i) * X(j)
      sum = sum.add(prod);
    }
    // Scale by 1/n (IDFT normalization)
    result.push(new Complex(sum.real / n, sum.imag / n));
  }

  // Display the IDFT matrix
  let matrixHtml = '<h2>IDFT Matrix:</h2><table>';
  for (let i = 0; i < n; i++) {
    matrixHtml += '<tr>';
    for (let j = 0; j < n; j++) {
      matrixHtml += `<td>${F[i][j].toString()}</td>`;
    }
    matrixHtml += '</tr>';
  }
  matrixHtml += '</table>';
  document.getElementById('idftMatrix').innerHTML = matrixHtml;

  // Display the IDFT result (inverse matrix multiplication)
  let resultHtml = '<h2>IDFT Result:</h2><p>';
  result.forEach((val, idx) => {
    resultHtml += `<span class="complex-number">x[${idx}] = ${val.toString()}</span><br>`;
  });
  resultHtml += '</p>';
  document.getElementById('idftResult').innerHTML = resultHtml;
}
