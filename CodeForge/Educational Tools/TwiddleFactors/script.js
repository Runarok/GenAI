function calculateTwiddleFactors() {
  // Get the value of N and whether to use 'i' instead of 'j'
  const N = parseInt(document.getElementById('N').value);
  const useI = document.getElementById('useI').checked; // Check the checkbox

  if (N < 2) {
    alert("Please enter an FFT size greater than 1.");
    return;
  }

  const positivesContainer = document.getElementById('positives');
  const negativesContainer = document.getElementById('negatives');

  positivesContainer.innerHTML = "";  // Clear previous results
  negativesContainer.innerHTML = "";  // Clear previous results

  for (let k = 0; k < N; k++) {
    // Calculate positive twiddle factor (W_N^k)
    const posReal = Math.cos(2 * Math.PI * k / N);
    const posImag = Math.sin(2 * Math.PI * k / N);
    const positive = formatTwiddleFactor(posReal, posImag, k, useI);

    // Display positive twiddle factor in the first column
    positivesContainer.innerHTML += `
      <div class="twiddle-factor">
        <span class="exponent">W<sub>${N}</sub><sup>${k}</sup>:</span>
        <span class="real">${positive.real}</span>
        <span class="imaginary">${positive.imaginary}</span>
      </div>
    `;

    // Calculate negative twiddle factor (W_N^-k)
    const negReal = Math.cos(2 * Math.PI * k / N);
    const negImag = -Math.sin(2 * Math.PI * k / N);
    const negative = formatTwiddleFactor(negReal, negImag, -k, useI);

    // Display negative twiddle factor in the second column
    negativesContainer.innerHTML += `
      <div class="twiddle-factor">
        <span class="exponent">W<sub>${N}</sub><sup>-${k}</sup>:</span>
        <span class="real">${negative.real}</span>
        <span class="imaginary">${negative.imaginary}</span>
      </div>
    `;
  }
}

function formatTwiddleFactor(real, imaginary, k, useI) {
  // Format the real and imaginary parts
  const realPart = real.toFixed(3);
  const imagPart = imaginary.toFixed(3);
  const imagUnit = useI ? "i" : "j";  // Use 'i' or 'j' based on the checkbox

  return { 
    real: realPart, 
    imaginary: `${imagPart}${imagUnit}` 
  };
}
