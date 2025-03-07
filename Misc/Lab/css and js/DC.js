// Code snippets as an object with keys matching button ids
const codeSnippets = {
    qpsk: `
<span class="comment">% QPSK</span>

<span class="comment">% Clear workspace and close all figures</span>
clc;
clear all;
close all;

<span class="comment">% Input data (binary sequence)</span>
data = [0 1 0 1 1 1 0 0 1 1]; 

<span class="comment">% Plot the original data before transmission</span>
figure(1)
stem(data, 'linewidth', 3);
grid on;
title('Information before Transmitting');
axis([0 11 0 1.5]);

<span class="comment">% QPSK Modulation:</span>
<span class="comment">% Step 1: Convert binary data (0, 1) to NZR (Non-Zero-Return) format, i.e., 0 -> -1, 1 -> 1</span>
data_NZR = 2 * data - 1; 

<span class="comment">% Step 2: Reshape data into two components for I (in-phase) and Q (quadrature)</span>
s_p_data = reshape(data_NZR, 2, length(data)/2);

<span class="comment">% Define transmission parameters</span>
br = 10^6;        <span class="comment">% Bit rate in bits per second (1 Mbps)</span>
f = br;           <span class="comment">% Carrier frequency (same as bit rate for simplicity)</span>
T = 1/br;         <span class="comment">% Bit duration (1/bit rate)</span>
t = T/99:T/99:T;  <span class="comment">% Time vector (for each bit period)</span>

<span class="comment">% Initialize arrays for the signals</span>
y = [];    <span class="comment">% Combined signal (I + Q)</span>
y_in = []; <span class="comment">% In-phase signal (I)</span>
y_qd = []; <span class="comment">% Quadrature-phase signal (Q)</span>

<span class="comment">% Step 3: Modulate each pair of bits using QPSK</span>
for i = 1:length(data)/2
    <span class="comment">% In-phase component (I) - modulated by cosine</span>
    y1 = s_p_data(1, i) * cos(2 * pi * f * t); 
    
    <span class="comment">% Quadrature-phase component (Q) - modulated by sine</span>
    y2 = s_p_data(2, i) * sin(2 * pi * f * t); 
    
    <span class="comment">% Append to the corresponding signals</span>
    y_in = [y_in y1];
    y_qd = [y_qd y2]; 
    
    <span class="comment">% Combined signal (I + Q)</span>
    y = [y y1 + y2]; 
end

<span class="comment">% Tx_sig is the transmitted signal (sum of I and Q)</span>
Tx_sig = y; 

<span class="comment">% Time vector for plotting the signals</span>
tt = T/99:T/99:(T * length(data))/2;

<span class="comment">% Plot the modulated signals</span>
figure(2)
subplot(3, 1, 1);
plot(tt, y_in, 'linewidth', 3), grid on;
title('In-phase Component of QPSK');
xlabel('Time (sec)');
ylabel('Amplitude (V)');

subplot(3, 1, 2);
plot(tt, y_qd, 'linewidth', 3), grid on;
title('Quadrature-phase Component of QPSK');
xlabel('Time (sec)');
ylabel('Amplitude (V)');

subplot(3, 1, 3);
plot(tt, Tx_sig, 'r', 'linewidth', 3), grid on;
title('Combined QPSK Modulated Signal');
xlabel('Time (sec)');
ylabel('Amplitude (V)');

<span class="comment">% QPSK Demodulation:</span>
<span class="comment">% Step 4: Initialize received data array</span>
Rx_data = []; 

<span class="comment">% Assume the received signal is the same as the transmitted signal (ideal channel)</span>
Rx_sig = Tx_sig; 

<span class="comment">% Step 5: Demodulate each pair of bits</span>
for i = 1:length(data)/2
    <span class="comment">% Extract the in-phase component (multiply by cosine)</span>
    Z_in = Rx_sig((i-1)*length(t) + 1 : i*length(t)) .* cos(2 * pi * f * t);
    
    <span class="comment">% Integrate over one bit period to get the decision value for the in-phase component</span>
    Z_in_intg = (trapz(t, Z_in)) * (2 / T); 
    
    <span class="comment">% Decision rule: if the integral is positive, bit is 1, else bit is 0</span>
    if Z_in_intg > 0
        Rx_in_data = 1;
    else
        Rx_in_data = 0;
    end

    <span class="comment">% Extract the quadrature-phase component (multiply by sine)</span>
    Z_qd = Rx_sig((i-1)*length(t) + 1 : i*length(t)) .* sin(2 * pi * f * t);
    
    <span class="comment">% Integrate over one bit period to get the decision value for the quadrature-phase component</span>
    Z_qd_intg = (trapz(t, Z_qd)) * (2 / T);
    
    <span class="comment">% Decision rule: if the integral is positive, bit is 1, else bit is 0</span>
    if Z_qd_intg > 0
        Rx_qd_data = 1;
    else
        Rx_qd_data = 0;
    end
    
    <span class="comment">% Append the decoded in-phase and quadrature-phase data</span>
    Rx_data = [Rx_data Rx_in_data Rx_qd_data];
end

<span class="comment">% Plot the received data after demodulation</span>
figure(3)
stem(Rx_data, 'linewidth', 3);
title('Information after Receiving');
axis([0 11 0 1.5]);
grid on;`,

    qam: `
<span class="comment">% QAM Modulation Example</span>

clc;
clear all;
close all;

<span class="comment">%% Parameters</span>
M = 16;               <span class="comment">% Modulation order (16-QAM)</span>
k = log2(M);          <span class="comment">% Number of bits per symbol</span>
n = 30000;            <span class="comment">% Number of symbols per frame (number of bits = n * k)</span>
sps = 1;              <span class="comment">% Samples per symbol (no oversampling)</span>

<span class="comment">% Set random number generator seed for reproducibility</span>
rng default

<span class="comment">%% Generate Random Binary Data</span>
<span class="comment">% Create a vector of random bits (0s and 1s)</span>
dataIn = randi([0 1], n * k, 1);

<span class="comment">% Plot the first 40 bits of data</span>
figure;
stem(dataIn(1:40), 'filled');
title('Random Binary Data');
xlabel('Bit Index');
ylabel('Binary Value');
grid on;

<span class="comment">%% Convert Binary Data to Integer Symbols</span>
<span class="comment">% Reshape the binary data into groups of 'k' bits and convert to integers</span>
dataSymbolsIn = bi2de(reshape(dataIn, k, []).', 'left-msb');

<span class="comment">% Plot the first 10 integer symbols</span>
figure;
stem(dataSymbolsIn(1:10));
title('Integer Symbols from Binary Data');
xlabel('Symbol Index');
ylabel('Integer Value');
grid on;

<span class="comment">%% QAM Modulation</span>
<span class="comment">% Binary-encoded QAM modulation (using binary Gray mapping)</span>
dataModBinary = qammod(dataSymbolsIn, M, 'bin');

<span class="comment">% Gray-encoded QAM modulation (using standard Gray mapping)</span>
dataModGray = qammod(dataSymbolsIn, M);

<span class="comment">%% Define Eb/No (Energy per bit to Noise power spectral density ratio)</span>
EbNo = 10;   <span class="comment">% Set Eb/No in dB</span>

<span class="comment">% Convert Eb/No to SNR (Signal-to-Noise Ratio in dB)</span>
snr = EbNo + 10 * log10(k);  <span class="comment">% SNR = Eb/No + 10*log10(k)</span>

<span class="comment">%% Add AWGN Noise</span>
<span class="comment">% Add noise to the modulated signals based on the calculated SNR</span>
receivedSignalBinary = awgn(dataModBinary, snr, 'measured');
receivedSignalGray = awgn(dataModGray, snr, 'measured');

<span class="comment">%% Plot Constellation Diagrams</span>
<span class="comment">% Plot the constellation of the received binary-encoded QAM</span>
figure;
scatterplot(receivedSignalBinary, 1, 0, 'g.');
hold on;
scatterplot(dataModBinary, 1, 0, 'k*');
title('Constellation Diagram for Binary-encoded 16-QAM');
xlabel('In-phase (I)');
ylabel('Quadrature (Q)');
grid on;

<span class="comment">% Plot the constellation of the received Gray-encoded QAM</span>
figure;
scatterplot(receivedSignalGray, 1, 0, 'g.');
hold on;
scatterplot(dataModGray, 1, 0, 'k*');
title('Constellation Diagram for Gray-encoded 16-QAM');
xlabel('In-phase (I)');
ylabel('Quadrature (Q)');
grid on;

<span class="comment">%% QAM Demodulation</span>
<span class="comment">% Perform demodulation for both binary and Gray-coded signals</span>
dataSymbolsOutBinary = qamdemod(receivedSignalBinary, M, 'bin');
dataSymbolsOutGray = qamdemod(receivedSignalGray, M);

<span class="comment">%% Convert Demodulated Symbols back to Binary Data</span>
<span class="comment">% Convert demodulated integer symbols back to binary data for both binary and Gray mapping</span>
dataOutBinary = de2bi(dataSymbolsOutBinary, k, 'left-msb').';
dataOutBinary = dataOutBinary(:);  <span class="comment">% Reshape into a column vector</span>

dataOutGray = de2bi(dataSymbolsOutGray, k, 'left-msb').';
dataOutGray = dataOutGray(:);  <span class="comment">% Reshape into a column vector</span>

<span class="comment">%% Calculate Bit Error Rate (BER)</span>
<span class="comment">% Calculate the bit error rate for both binary-encoded and Gray-encoded QAM</span>
[numErrorsBinary, berBinary] = biterr(dataIn, dataOutBinary);
fprintf('Binary-coded QAM BER: %5.2e, based on %d errors.\n', berBinary, numErrorsBinary);

[numErrorsGray, berGray] = biterr(dataIn, dataOutGray);
fprintf('Gray-coded QAM BER: %5.2e, based on %d errors.\n', berGray, numErrorsGray);

<span class="comment">%% 16-QAM Symbol Mapping and Constellation Diagrams</span>
<span class="comment">% Define the symbol set for 16-QAM (integer values from 0 to M-1)</span>
x = 0:(M-1);

<span class="comment">% Plot 16-QAM constellation using binary encoding</span>
symbin = qammod(x, M, 'bin');
symgray = qammod(x, M, 'gray');

<span class="comment">% Plot the 16-QAM constellation for Gray-coded mapping</span>
figure;
scatterplot(symgray, 1, 0, 'b*');
hold on;

<span class="comment">% Annotate the constellation points with binary and integer values</span>
for k = 1:M
    <span class="comment">% Display binary representation (4-bit) and integer value for each symbol</span>
    text(real(symgray(k)) - 0.0, imag(symgray(k)) + 0.3, dec2base(x(k), 2, 4), 'Color', [0 1 0]);
    text(real(symgray(k)) - 0.5, imag(symgray(k)) + 0.3, num2str(x(k)), 'Color', [0 1 0]);
    text(real(symbin(k)) - 0.0, imag(symbin(k)) - 0.3, dec2base(x(k), 2, 4), 'Color', [1 0 0]);
    text(real(symbin(k)) - 0.5, imag(symbin(k)) - 0.3, num2str(x(k)), 'Color', [1 0 0]);
end

<span class="comment">% Set plot title and axis limits</span>
title('16-QAM Symbol Mapping (Binary and Gray Coding)');
axis([-4 4 -4 4]);
xlabel('In-phase (I)');
ylabel('Quadrature (Q)');
grid on;`,

    rect_pulse_snr: `
<span class="comment">% Rectangular Pulse Shaping Example - BER vs SNR</span>

clc;
clear;
close all;

<span class="comment">%% Parameters</span>
N = 1e6;                  <span class="comment">% Number of bits to transmit</span>
SNR_dB = 0:2:20;          <span class="comment">% SNR range in dB (from 0 dB to 20 dB, step 2 dB)</span>
rect_pulse_duration = 1;   <span class="comment">% Duration of each rectangular pulse (in symbol periods)</span>
pulse_amplitude = 1;       <span class="comment">% Amplitude of the rectangular pulse</span>

<span class="comment">%% Generate Random Binary Data (0s and 1s)</span>
bits = randi([0, 1], 1, N);   <span class="comment">% Random binary sequence of N bits</span>

<span class="comment">%% Transmit Signal (Pulse Shaping)</span>
tx_signal = zeros(1, N * rect_pulse_duration);  <span class="comment">% Initialize the transmitted signal</span>

<span class="comment">% Map the bits to rectangular pulses</span>
for k = 1:N
    if bits(k) == 1
        <span class="comment">% For bit = 1, transmit a pulse with amplitude equal to pulse_amplitude</span>
        tx_signal((k-1)*rect_pulse_duration+1:k*rect_pulse_duration) = pulse_amplitude;
    end
end

<span class="comment">%% BER Calculation for Different SNR Values</span>
ber = zeros(1, length(SNR_dB));  <span class="comment">% Initialize BER vector</span>

for idx = 1:length(SNR_dB)
    snr_linear = 10^(SNR_dB(idx)/10);  <span class="comment">% Convert SNR from dB to linear scale</span>
    
    <span class="comment">% Calculate noise power based on the SNR</span>
    noise_power = pulse_amplitude^2 / (2 * snr_linear);
    
    <span class="comment">% Generate Gaussian noise</span>
    noise = sqrt(noise_power) * randn(1, length(tx_signal));
    
    <span class="comment">% Add noise to the transmitted signal</span>
    rx_signal = tx_signal + noise;
    
    <span class="comment">% Initialize received bits vector</span>
    received_bits = zeros(1, N);
    
    <span class="comment">% Demodulate the received signal (pulse detection)</span>
    for k = 1:N
        pulse_start = (k-1)*rect_pulse_duration + 1;  <span class="comment">% Start index of pulse</span>
        pulse_end = k * rect_pulse_duration;          <span class="comment">% End index of pulse</span>
        
        <span class="comment">% If the sum of the received signal within the pulse duration is positive,</span>
        <span class="comment">% decide that the transmitted bit was a 1, else it was a 0.</span>
        if sum(rx_signal(pulse_start:pulse_end)) > 0
            received_bits(k) = 1;
        else
            received_bits(k) = 0;
        end
    end
    
    <span class="comment">% Calculate the number of bit errors</span>
    errors = sum(bits ~= received_bits);
    
    <span class="comment">% Calculate Bit Error Rate (BER) for this SNR value</span>
    ber(idx) = errors / N;
end

<span class="comment">%% Plot BER vs. SNR</span>
figure;
semilogy(SNR_dB, ber, 'o-', 'LineWidth', 2);  <span class="comment">% Plot BER on a logarithmic scale</span>
xlabel('SNR (dB)');
ylabel('Bit Error Rate (BER)');
title('Bit Error Rate vs. SNR for Rectangular Pulse Shaping in AWGN Channel');
grid on;`,

    gram_schmidt: `
<span class="comment">clc; close all; clear all;</span>

<span class="comment">% Define the set of input vectors (3x3 matrix where each column is a vector)</span>
V = [1 1 0; 1 0 1; 0 1 1]'; <span class="comment">% Linearly Independent vectors</span>
<span class="comment">%V = rand(3, 3);              % Random vectors</span>
<span class="comment">%V = [1 2 3; 1 5 2; 2 4 6]'; % Linearly Dependent</span>
<span class="comment">%V = [3 2 1; 1 2 3; 0 1 4];  % Another set of vectors (potentially linearly dependent)</span>

<span class="comment">% Number of vectors (columns in V)</span>
n = size(V, 2); <span class="comment">% This is the number of columns (i.e., number of vectors)</span>

<span class="comment">% Initialize the matrix for orthogonal vectors</span>
U = zeros(size(V)); <span class="comment">% Matrix to store the orthogonalized vectors</span>

<span class="comment">% Gram-Schmidt Process to orthogonalize the vectors</span>
for i = 1:n
    <span class="comment">% Start with the original vector</span>
    U(:, i) = V(:, i);

    <span class="comment">% Subtract projections of previous orthogonal vectors</span>
    for j = 1:i-1
        <span class="comment">% Projection formula: proj(Uj, Vi) = (dot(Uj, Vi) / dot(Uj, Uj)) * Uj</span>
        U(:, i) = U(:, i) - (dot(U(:, j), V(:, i)) / dot(U(:, j), U(:, j))) * U(:, j);
    end
end

<span class="comment">% Normalize the orthogonal vectors to make them orthonormal</span>
E = zeros(size(U)); <span class="comment">% Matrix to store the orthonormal vectors</span>
for i = 1:n
    E(:, i) = U(:, i) / norm(U(:, i)); <span class="comment">% Normalize each orthogonal vector</span>
end

<span class="comment">% Display the results</span>
disp('Original Vectors (V):');
disp(V); <span class="comment">% Display the original vectors</span>
disp('Orthogonal Vectors (U):');
disp(U); <span class="comment">% Display the orthogonalized vectors</span>
disp('Orthonormal Vectors (E):');
disp(E); <span class="comment">% Display the orthonormalized vectors</span>

<span class="comment">% Plotting the original vectors</span>
figure;
hold on;
grid on;

<span class="comment">% Plot the original vectors in 3D</span>
quiver3(0, 0, 0, V(1, 1), V(2, 1), V(3, 1), 'r', 'LineWidth', 2);
quiver3(0, 0, 0, V(1, 2), V(2, 2), V(3, 2), 'g', 'LineWidth', 2);
quiver3(0, 0, 0, V(1, 3), V(2, 3), V(3, 3), 'b', 'LineWidth', 2);

<span class="comment">% Plot the orthonormal vectors in 3D</span>
quiver3(0, 0, 0, E(1, 1), E(2, 1), E(3, 1), 'r--', 'LineWidth', 2);
quiver3(0, 0, 0, E(1, 2), E(2, 2), E(3, 2), 'g--', 'LineWidth', 2);
quiver3(0, 0, 0, E(1, 3), E(2, 3), E(3, 3), 'b--', 'LineWidth', 2);

<span class="comment">% Setting up the plot</span>
xlabel('X');
ylabel('Y');
zlabel('Z');
title('Gram-Schmidt Orthonormalization');
legend({'V1', 'V2', 'V3', 'E1', 'E2', 'E3'}, 'Location', 'Best');
axis equal; <span class="comment">% Make sure the axis is scaled equally for X, Y, and Z</span>
hold off;`,

    crc_code: `
    <span class="comment">// Global variables</span>
    char t[28], cs[28], g[] = "1101";  <span class="comment">// t[] = data, cs[] = checksum, g[] = generator polynomial (e.g., CRC-4)</span>
    <span class="comment">// You can change the generator polynomial g[] to other CRC values (e.g., g[] = "101101" for CRC-6)</span>
    int a, e, c;

    #define N strlen(g)  <span class="comment">// N is the length of the generator polynomial</span>

    <span class="comment">// Main function where the CRC encoding and error detection occurs</span>
    int main() {
        <span class="comment">// Prompt user to enter the data (message to encode)</span>
        printf("Enter the Data: ");
        scanf("%s", t);  <span class="comment">// Read the message into the variable t[]</span>
        printf("\nThe Generator Polynomial is: %s\n", g);  <span class="comment">// Show the generator polynomial g[]</span>

        a = strlen(t);  <span class="comment">// Get the length of the input message t[]</span>

        <span class="comment">// Append zeros to the original data to prepare it for CRC encoding (appending length of generator - 1 zeros)</span>
        for (e = a; e < a + N - 1; e++) {
            t[e] = '0';  <span class="comment">// Appending '0' for CRC processing</span>
        }
        
        printf("\nThe modified data is: %s\n", t);  <span class="comment">// Display the modified data after appending zeros</span>
        
        crc();  <span class="comment">// Perform CRC calculation</span>
        printf("\nChecksum is: %s\n", cs);  <span class="comment">// Display the calculated checksum</span>

        <span class="comment">// Append the checksum to the original message to create the final codeword</span>
        for (e = a; e < a + N - 1; e++) {
            t[e] = cs[e - a];  <span class="comment">// Add the checksum at the end of the original data</span>
        }
        
        printf("\nThe Final Codeword is: %s\n", t);  <span class="comment">// Display the final codeword after appending the checksum</span>

        <span class="comment">// Ask the user if they want to simulate error detection</span>
        printf("\nTest Error Detection 0(YES) 1(NO)? :");
        scanf("%d", &e);  <span class="comment">// Read whether the user wants to insert an error</span>

        if (e == 0) {
            <span class="comment">// If the user chooses to insert an error</span>
            do {
                printf("\nEnter the position where Error is to be inserted: ");
                scanf("%d", &e);  <span class="comment">// Get the error position from the user</span>
            } while (e == 0 || e > a + N - 1);  <span class="comment">// Ensure the error position is valid</span>
            
            <span class="comment">// Flip the bit at the error position (i.e., introduce an error)</span>
            t[e - 1] = (t[e - 1] == '0') ? '1' : '0';  <span class="comment">// Toggle the bit at the error position</span>
            printf("\nErroneous Data: %s\n", t);  <span class="comment">// Display the erroneous data</span>
        }

        crc();  <span class="comment">// Perform CRC again on the potentially erroneous data</span>
        <span class="comment">// Check if the checksum indicates any error (i.e., if the remainder is not zero)</span>
        for (e = 0; (e < N - 1) && (cs[e] != '1'); e++);
        
        <span class="comment">// If any non-zero remainder is found, an error is detected</span>
        if (e < N - 1)
            printf("\nError Detected\n");  <span class="comment">// Error detected</span>
        else
            printf("\nNo Error Detected\n");  <span class="comment">// No error detected</span>

        return 0;  <span class="comment">// End the program</span>
    }

    <span class="comment">// Function to calculate CRC for the given data and generator polynomial</span>
    void crc() {
        <span class="comment">// Initialize the checksum (cs) to be the same as the original data (t)</span>
        for (e = 0; e < N; e++) {
            cs[e] = t[e];  <span class="comment">// Copy the original data into the checksum array</span>
        }

        <span class="comment">// Perform the division process for CRC calculation</span>
        do {
            if (cs[0] == '1')  <span class="comment">// If the first bit of checksum is 1, we perform XOR with the generator polynomial</span>
                xor();  <span class="comment">// Perform XOR operation</span>

            <span class="comment">// Shift the checksum left by 1 bit (i.e., drop the first bit and move all remaining bits left)</span>
            for (c = 0; c < N - 1; c++) {
                cs[c] = cs[c + 1];  <span class="comment">// Move each bit left</span>
            }

            <span class="comment">// Add the next data bit to the checksum from the original message</span>
            cs[c] = t[e++];  <span class="comment">// Append the next bit of the original data to the checksum</span>
        } while (e <= a + N - 1);  <span class="comment">// Continue until the end of the original data + the appended zeros</span>
    }

    <span class="comment">// XOR function to perform the division step of CRC</span>
    void xor() {
        <span class="comment">// XOR operation between the checksum (cs) and the generator polynomial (g)</span>
        for (c = 1; c < N; c++) {
            cs[c] = ((cs[c] == g[c]) ? '0' : '1');  <span class="comment">// Perform XOR between corresponding bits</span>
        }
    }`,

    convolutional_encoder: `<span class="comment">clc;</span>
<span class="comment">clear all;</span>
<span class="comment">close all;</span>

<span class="comment">% Take user input for parameters</span>
k = input('Number of shift registers: ');  <span class="comment">% Number of shift registers (constraint length)</span>
g1=input('Enter the value to generator1:');  <span class="comment">% Generator polynomial 1 (Decimal input)</span>
g2=input('Enter the value to generator2:');  <span class="comment">% Generator polynomial 2 (Decimal input)</span>
m = input('Enter message bits: ');  <span class="comment">% Input message bits (binary)</span>

<span class="comment">% Create a trellis structure for the convolutional encoder</span>
trel = poly2trellis(k, [g1 g2]);

<span class="comment">% Perform convolutional encoding</span>
encoded = convenc(m, trel);

<span class="comment">% Display the encoded output</span>
disp('Encoded output:');
disp(encoded);

<span class="comment">% Decoding the encoded message using Viterbi algorithm</span>
tblen = length(m);  <span class="comment">% Define the traceback length (equal to the length of the input message)</span>
decoded = vitdec(encoded, trel, tblen, 'trunc', 'hard');

<span class="comment">% Display the decoded output</span>
disp('Decoded output:');
disp(decoded);`,

    huffman_code: `
<span class="comment">clc;</span>
<span class="comment">clear all;</span>
<span class="comment">close all;</span>

<span class="comment">% Step 1: Input the number of symbols</span>
x = input('Enter the Number of Symbols: ');  
N = 1:x;  <span class="comment">% Symbol set</span>
disp('Number of Symbols are:');
disp(N);

<span class="comment">% Step 2: Input the probabilities for each symbol</span>
P = input('Enter the Probability: ');

<span class="comment">% Step 3: Sort the probabilities in descending order</span>
S = sort(P, 'descend');
disp('Sorted Probability are:');
disp(S);

<span class="comment">% Step 4: Generate Huffman dictionary</span>
[dict, avglen] = huffmandict(N, S);
disp('Average length is:');
disp(avglen);

<span class="comment">% Step 5: Calculate the entropy of the source</span>
H = 0;
for i = 1:x
    H = H + (P(i) * log2(1 / P(i)));  <span class="comment">% Entropy formula: H = - Σ P(i) * log2(P(i))</span>
end;
disp('Entropy is:');
disp(H);

<span class="comment">% Step 6: Calculate the efficiency of the Huffman coding</span>
Efficiency = (H / avglen) * 100;
disp('Efficiency is:');
disp(Efficiency);

<span class="comment">% Step 7: Encode the symbols using Huffman coding</span>
Codeword = huffmanenco(N, dict);
disp('Codeword is:');
disp(Codeword);

<span class="comment">% Step 8: Decode the Huffman encoded symbols</span>
disp('Decoded symbols are:');
decode = huffmandeco(Codeword, dict);
disp(decode);`,

    hamming_code: `
<span class="comment">clc;</span>
<span class="comment">clear all;</span>

<span class="comment">% Step 1: Input parameters</span>
k = input('Enter the length of the message word: ');  <span class="comment">% Length of the message word</span>
n = input('Enter the length of the codeword: ');     <span class="comment">% Length of the codeword</span>
p = input('Enter the parity matrix: ');              <span class="comment">% Parity matrix</span>

<span class="comment">% Step 2: Construct the generator matrix G</span>
disp('Generator matrix:');
G = [eye(k) p];  <span class="comment">% G = [I_k | P], where I_k is the identity matrix of size k</span>
disp(G);

<span class="comment">% Step 5: Construct the parity check matrix H</span>
H = [p' eye(n - k)];  <span class="comment">% H = [P' | I_(n-k)]</span>
disp('H matrix:');
disp(H);
    
<span class="comment">% Step 3: Input the message word</span>
m = input('Enter the message word: ');

<span class="comment">% Step 4: Encode the message</span>
disp('Codeword:');
C = encode(m, n, k, 'linear', G);  <span class="comment">% Encoding using the generator matrix G</span>
disp(C);

<span class="comment">% Step 11: Decode the encoded message</span>
D = decode(C, n, k, 'linear', G);  <span class="comment">% Decoding using the generator matrix G</span>
disp('Decoded Output:');
disp(D);
    
<span class="comment">% Step 6: Generate the syndrome table for error correction</span>
dtable = syndtable(H);

<span class="comment">% Step 7: Input the received codeword</span>
R = input('Enter the received codeword: ');

<span class="comment">% Step 8: Compute the syndrome</span>
Syndrome = rem(R * H', 2);  <span class="comment">% Syndrome = R * H' (mod 2)</span>
disp('Syndrome:');
disp(Syndrome);

<span class="comment">% Step 9: Convert the syndrome to a decimal position</span>
Syn_position = bi2de(Syndrome, 'left-msb');
disp('Syndrome position:');
disp(Syn_position);

<span class="comment">% Step 10: Error detection and correction</span>
if (Syndrome == 0)
    disp('The received codeword is valid.');
else
    disp('The received codeword is invalid.');
    E = dtable(Syn_position + 1, :);  <span class="comment">% Find the error vector from the syndrome table</span>
    disp('The corrected word is:');
    CC = rem(R + E, 2);  <span class="comment">% Correct the received codeword by adding the error vector</span>
    disp(CC);
    <span class="comment">% Extract the original message from the corrected codeword</span>
    msg = CC(1:k);
end`
};

function showCode(codeType) {
    const codeContent = document.getElementById('code-content');
    codeContent.innerHTML = `<pre>${codeSnippets[codeType]}</pre>`;  // Inject the selected code

    const buttons = document.querySelectorAll('.nav-bar button');
    buttons.forEach(button => button.classList.remove('active'));

    const activeButton = document.querySelector(`button[onclick="showCode('${codeType}')"]`);
    activeButton.classList.add('active');

    const newUrl = `${window.location.origin}${window.location.pathname}?code=${codeType}`;
    history.replaceState(null, '', newUrl);  // Update URL without refreshing
}

function loadCodeFromQuery() {
    const urlParams = new URLSearchParams(window.location.search);
    const codeType = urlParams.get('code') || 'qpsk';  // Default to QPSK
    showCode(codeType);
}

window.onload = loadCodeFromQuery;
