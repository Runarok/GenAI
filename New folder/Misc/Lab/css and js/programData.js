`

const programData = {
    subjects: {
        DSP: [
            {
                header: "DSP Program Placeholder",
                question: "DSP Program Question Placeholder",
                code: "% DSP Program Code Placeholder"
            },
            // Additional DSP programs can be added here
            /*
            {
                header: "Additional DSP Program Placeholder",
                question: "Additional DSP Program Question Placeholder",
                code: "% Additional DSP Program Code Placeholder"
            }
            */
        ],
        DC: [
            {
                header: "DC Program Placeholder",
                question: "DC Program Question Placeholder",
                code: "% DC Program Code Placeholder"
            },
            // Additional DC programs can be added here
            /*
            {
                header: "Additional DC Program Placeholder",
                question: "Additional DC Program Question Placeholder",
                code: "% Additional DC Program Code Placeholder"
            }
            */
        ],
        
        // Future placeholders for another subject set (commented out)
        /*
        AnotherSubject: [
            {
                header: "Another Subject Program Placeholder",
                question: "Another Subject Program Question Placeholder",
                code: "% Another Subject Program Code Placeholder"
            },
            // Additional programs for AnotherSubject can be added here
            {
                header: "Additional AnotherSubject Program Placeholder",
                question: "Additional AnotherSubject Program Question Placeholder",
                code: "% Additional AnotherSubject Program Code Placeholder"
            }
        ]
        */
    }
}

`
    
const programData = {
    subjects: {
        DSP: [
            {
                header: "DSP Program Placeholder",
                question: "Linearity property",
 code: 
                `
clc;
clear all;
close all;
x1=input('enter the first input sequence=');
x2=input('enter the second input sequence=');
a1=input('enter the constant a1=');
a2=input('enter the constant a2=');
l1=length(x1);
l2=length(x2);
N=max(l1,l2);
x1n=[x1,zeros(1,N-l1)];
x2n=[x2,zeros(1,N-l2)];
y=a1*x1n+a2*x2n;
yk=fft(y,N);
disp('output sequence y(k) is');
disp(yk);
x1k=fft(x1,N);
x2k=fft(x2,N);
yv=a1*x1k+a2*x2k;
if(yk==yv)
    disp('linearity property is satisfied');
    else
      disp('linearity property is not satisfied');  
end;
                
                `            },
            {
                header: "DSP Program Placeholder",
                question: "Circular time shift property",
 code: 
                `
 clc;
clear all;
close all;
x=input('enter the first input sequence=');
m=input('enter the number of shifts');
N=length(x);
Xs=circshift(x,[0,m]);
y=fft(Xs,N);
xk=fft(x,N);
for K=0:N-1
    w(K+1)=exp((-j*2*pi*K*m)/N);
end;
Yv=w.*xk;
disp(y);
disp(Yv);
if(floor(abs(y)))==(floor(abs(Yv)))
    disp('circular time shift property is satisfied');
    else
      disp('circular time shift property is not satisfied');  
end;
               
                `            },
            {
                header: "DSP Program Placeholder",
                question: "Circular frequency shift property",
 code: 
                `
clc;
clear all;
close all;
x=input('enter the first input sequence=');
l=input('enter the number of shifts');
N=length(x);
xk=fft(x,N);
yv=circshift(xk,[0,l]);
for n=0:N-1
    w(n+1)=exp((j*2*pi*n*l)/N);
end;
y=w.*x;
yk=fft(y);
disp(yk);
disp(yv);
if(floor(abs(yk)))==(floor(abs(yv)))
    disp('circular frequency shift property is satisfied');
    else
      disp('circular frequency shift property is not satisfied');  
end;
                
                `            },
            {
                header: "DSP Program Placeholder",
                question: "dit_radix2_fft",
 code: 
                `

% a)This part of the program is for creating “dit_radix2_fft” function 
%Note:student must type the following code and save as dit_radix2_fft

function X = dit_radix2_fft(x)
    % DIT Radix-2 FFT Implementation
    % Input:
    %   x - Input signal (must be a power of 2 in length)
    % Output:
    %   X - FFT of the input signal

    % Check if the length of x is a power of 2
    N = length(x);
    if mod(log2(N), 1) ~= 0
        error('Input length must be a power of 2');
    end

    % Bit-reverse the input
    x = bit_reverse(x);

    % Initialize the output
    X = x;

    % Number of stages
    stages = log2(N);

    % FFT computation
    for stage = 1:stages
        % Number of points in each FFT stage
        num_points = 2^stage;
        half_points = num_points / 2;

        % Twiddle factors
        W = exp(-2 * pi * 1i * (0:half_points-1) / num_points);

        for k = 0:N/num_points-1
            for j = 0:half_points-1
                % Indices for the butterfly operation
                idx1 = k * num_points + j + 1; % MATLAB is 1-indexed
                idx2 = idx1 + half_points;

                % Butterfly operation
                temp = X(idx2) * W(j + 1);
                X(idx2) = X(idx1) - temp;
                X(idx1) = X(idx1) + temp;
            end
        end
    end
end

function x_bitreversed = bit_reverse(x)
    % Bit-reverse the input array
    N = length(x);
    n = log2(N);
    x_bitreversed = zeros(size(x));

    for k = 0:N-1
        % Bit-reverse the index
        rev_idx = bin2dec(fliplr(dec2bin(k, n))) + 1; % MATLAB is 1-indexed
        x_bitreversed(rev_idx) = x(k + 1);
    end
end



% b): Example program to Develop decimation in time radix-2 FFT algorithm 

clc;
clear all;
close all;
N = 4; % Length of the input signal (must be a power of 2)
x = [1 2 3 4]; % Example input signal
X = dit_radix2_fft(x); % Compute FFT
disp('Input Signal:');
disp(x);
disp('FFT of the Input Signal:');
disp(X);
                
                `            },
            {
                header: "DSP Program Placeholder",
                question: "digital low pass FIR filter using Rectangular /Bartlett/Hamming/Hanning window",
 code: 
                `
  clc;
clear all;
close all;
rp=input('enter the passband ripple');
rs=input('enter the stopband ripple');
fp=input('enter the passbandfreq');
fs=input('enter the stopbandfreq');
f=input('enter the sampling freq');
wp=2*fp/f;
ws=2*fs/f;
num=-20*log10(sqrt(rp*rs))-13;
den=14.6*(fs-fp)/f;
n=ceil(num/den);
n1=n+1;
if(rem(n,2)~=0)
 n1=n;
 n=n-1;
end;
y=boxcar(n1); / y=bartlett(n1); / y=hanning(n1); / y=hamming(n1);
b=fir1(n,wp,'low',y);
[h,q]=freqz(b,1,256);
m=20*log10(abs(h));
subplot(2,2,1);
plot(q/pi,m);
xlabel('normalisedfreq');
ylabel('gain in dB');
title('low pass filter using rectangular window');
system output
enter the passband ripple=0.02
enter the stopband ripple=0.01
enter the passbandfreq=1200
enter the stopbandfreq=1700
enter the sampling freq=9000              
                `            },
            {
                header: "DSP Program Placeholder",
                question: "digital high pass FIR filter using Rectangular /Bartlett/Hamming/Hanning window",
 code: 
                `
clc;
clearall;
closeall;
rp=input('enter the passband ripple');
rs=input('enter the stopband ripple');
fp=input('enter the passbandfreq');
fs=input('enter the stopbandfreq');
f=input('enter the sampling freq');
wp=2*fp/f;
ws=2*fs/f;
num=-20*log10(sqrt(rp*rs))-13;
den=14.6*(fs-fp)/f;
n=ceil(num/den);
n1=n+1;
if(rem(n,2)~=0)
 n1=n;
 n=n-1;
end;
y=boxcar(n1); / y=bartlett(n1); / y=hanning(n1); / y=hamming(n1);
b=fir1(n,wp,'high',y);
[h,q]=freqz(b,1,256);
m=20*log10(abs(h));
subplot(2,2,2);
plot(q/pi,m);
xlabel('normalisedfreq');
ylabel('gain in dB');
title('high pass filter using rectangular window');
system output
enter the passband ripple=0.02
enter the stopband ripple=0.01
enter the passbandfreq=1200
enter the stopbandfreq=1700
enter the sampling freq=9000
                
                `            },
            {
                header: "DSP Program Placeholder",
                question: "digital IIR Butterworth low pass filter",
 code: 
                `
 clc;
clear all;
close all;
rp=input('enter the pass band ripple=');
rs=input('enter the stop band ripple=');
wp=input('enter the pass band frequency=');
ws=input('enter the stop band frequency=');
fs=input('enter the sampling frequency=');
w1=2*wp/fs;
 w2=2*ws/fs;
 [n,wn]=buttord(w1,w2,rp,rs);
 [b,a]=butter(n,wn,'low');
disp('the order of lpf');
disp(n);
disp('the cut off freq of lpf');
disp(wn);
w=0:0.01:pi;
[h]=freqz(b,a,w);
mag=20*log10(abs(h));
ang=angle(h);
subplot(2,1,1);
plot(w/pi,mag);
xlabel('normalized freq');
ylabel('magnitude');
subplot(2,1,2);
plot(w/pi,ang);
xlabel('normalised freq');
ylabel('angle');
output:
enter the pass band ripple=3
enter the stop band ripple=60
enter the pass band frequency=150
enter the stop band frequency=300
enter the sampling frequency=1500               
                `            },
            {
                header: "DSP Program Placeholder",
                question: "digital IIR Butterworth high pass filter",
 code: 
                `
clc;
clear all;
close all;
rp=input('enter the pass band ripple=');
rs=input('enter the stop band ripple=');
wp=input('enter the pass band frequency=');
ws=input('enter the stop band frequency=');
fs=input('enter the sampling frequency=');
 w1=2*wp/fs;
 w2=2*ws/fs;
 [n,wn]=buttord(w1,w2,rp,rs);
 [b,a]=butter(n,wn,'high');
disp('the order of hpf');
disp(n);
disp('the cut off freq of hpf');
disp(wn);
 w=0:0.01:pi;
 [h]=freqz(b,a,w);
mag=20*log10(abs(h));
ang=angle(h);
subplot(2,1,1);
plot(w/pi,mag);
xlabel('normalized freq');
ylabel('magnitude');
subplot(2,1,2);
plot(w/pi,ang);
xlabel('normalisedfreq');
ylabel('angle');
output:
enter the pass band ripple=3
enter the stop band ripple=60
enter the pass band frequency=150
enter the stop band frequency=300
enter the sampling frequency=1500                
                `            },
{
                header: "DSP Program Placeholder",
                question: "DFT and IDFT Linear  Convolution",
                code: 
                `
clc;
clear all;
close all;
x=input('enter the first input sequence=');
h=input('enter the second input sequence=');
l=length(x);
m=length(h);
N=max(l,m);
Xk=fft(x,N);
Hk=fft(h,N);
Yk=Xk.*Hk;
y=ifft(Yk,N);
disp('circuler convoluted output using DFT and IDFT method');
disp(y);
subplot(3,1,1);
stem(x);
title('the first sequence');
xlabel('time');
ylabel('amplitude');
subplot(3,1,2);
stem(h);
title('the second sequence');
xlabel('time');
ylabel('amplitude');
subplot(3,1,3);
stem(y);
title('the circuler convoluted sequence');
xlabel('time');
ylabel('amplitude');
                `
            },
            {
                header: "DSP Program Placeholder",
                question: "DFT and IDFT Circular Convolution",
 code: 
                `
clc;
clear all;
close all;
x=input('enter the first input sequence=');
h=input('enter the second input sequence=');
l=length(x);
m=length(h);
N=l+m-1;
Xk=fft(x,N);
Hk=fft(h,N);
Yk=Xk.*Hk;
y=ifft(Yk,N);
disp('linear convoluted output using DFT and IDFT method');
disp(y);
subplot(3,1,1);
stem(x);
title('the first sequence');
xlabel('time');
ylabel('amplitude');
subplot(3,1,2);
stem(h);
title('the second sequence');
xlabel('time');
ylabel('amplitude');
subplot(3,1,3);
stem(y);
title('the linear convoluted sequence');
xlabel('time');
ylabel('amplitude');
`
            },
            {
                header: "DSP Program Placeholder", 
                question: "Analyse causal system2",
 code: 
                `
% Define the transfer function H(z)

num = [1]; % Numerator coefficients (z)
den = [1 -0.9]; % Denominator coefficients (z - 0.9)

% Create the transfer function
H = tf(num, den, -1); % -1 indicates discrete time
disp('seros and poles Located at')
[zz,pp] = tf2zp(num,den)

% a) Pole-Zero Plot
figure;
pzmap(H);
title('Pole-Zero Plot of H(z)');
grid on;

% b) Frequency Response
omega = linspace(-pi, pi, 1024); % Frequency range
H_freq = freqz(num, den, omega); % Frequency response

% Magnitude and Phase
magnitude = abs(H_freq);
phase = angle(H_freq);

% Plot Magnitude Response
figure;
subplot(2, 1, 1);
plot(omega, magnitude);
title('Magnitude Response');
xlabel('frequency in radians');
ylabel('Magnitude');

% Plot Phase Response
subplot(2, 1, 2);
plot(omega, phase);
title('Phase Response');
xlabel('frequency in radians');
ylabel('Phase values');


% c) Impulse Response
n = 0:20; % Time index
h = (0.9).^n; % Impulse response for n >= 0
h(1) = 1; % h(0) = 1 for the impulse response
disp('Samples of impulse response')
disp(h);
figure;
stem(n, h);
title('Impulse Response h(n)');
xlabel('n');
ylabel('Amplitude');
           
`            },
            // Additional DSP programs can be added here
            /*
            {
                header: "Additional DSP Program Placeholder",
                question: "Additional DSP Program Question Placeholder",
                code: 
`% Additional DSP Program Code Placeholder`
            },
            */
        ],
        DC: [
            {
                header: "Additional DC Program Placeholder",
                question: "Convolution Code",
                code: 
`
clc;
clear all;
close all;
k=input('Number of shift register:');
g1=input('Enter the value to generator1:');
g2=input('Enter the value to generator2:');
m=input('Enter message bits:');
trel=poly2trellis(k,[g1 g2]);
encoded=convenc(m,trel);
disp('Encoded output:');
disp(encoded);
tblen=length(m);
decoded=vitdec(encoded,trel,tblen,'trunc','hard');
disp('Decoded output:');
disp(decoded);


`
            },
            {
                header: "Additional DC Program Placeholder",
                question: "Hamming code",
                code: 
`
clc;
clear all;
k=input('enter the length of the message word:');
n=input('enter the length of the codeword:');
p=input('enter the parity matrix:');
disp('generator matrix:');
G=[eye(k) p];
disp(G);
m=input('enter the message word:');
disp('codeword:');
C=encode(m,n,k, 'linear',G);
disp(C);
H=[p' eye(n-k)];
disp('h matrix:');
disp(H);
dtable=syndtable(H);
R=input('enter the recieved codeword: ');
Syndrome=rem(R*H', 2);
disp('syndrome:');
disp(Syndrome);
Syn_position=bi2de(Syndrome,'left-msb');
disp('syndrome position:');
disp(Syn_position);
if (Syndrome==0)
 disp('the recieved codeword is valid')
 else
 disp('the recieved codeword is invalid')
 E=dtable(Syn_position+1,:)
 disp('the corrected word is :')
 CC=rem(R+E, 2);
 disp(CC);
 msg=CC(1:k);
end
D=decode(C,n,k,'linear',G);
%[1 1 1 ;1 1 0 ;1 0 1 ;0 1 1 ]
%[0 0 1 1]
%[0 1 1 1 1 1 0]
`
            },
            {
                header: "Additional DC Program Placeholder",
                question: "Huffman Code",
                code: 
`
clc;
clear all;
close all;
x=input('Enter the Number of Symbols:');
N=1:x;
disp('Number of Symbols are:'); disp(N);
P=input('Enter the Probabilty:');
S=sort(P,'descend');
disp('Sorted Probabilty are:'); disp(S);
[dict,avglen]=huffmandict(N,S);
disp('Average length is:');
H=0;
for i=1:x
    H=H+(P(i)*log2(1/P(i)));
end;
disp('Entropy is:'); disp(H);
Efficiency=(H/avglen)*100;
disp('Efficiency is:'); disp(Efficiency);
Codeword=huffmanenco(N,dict);
disp('code word is:');
disp(Codeword);
disp('decoded symbol are:');
decode=huffmandeco(Codeword,dict);
disp(decode);

`
            },
            {
                header: "Additional DC Program Placeholder",
                question: "Gram Schmidt orthogonalisation",
                code: 
`
clc; close all; clear all;
% Define the set of input vectors 3x3 matrix where each column is a vector
V = [1 1 0; 1 0 1; 0 1 1]'; % Linearly Independent vectors
%V = rand(3, 3);
%V = [1 2 3; 1 5 2; 2 4 6]'; %Linearly Dependent
%V = [3 2 1;1 2 3;0 1 4];
% Number of vectors
n = size(V, 2);% no of columns(vectors)
% Initialize the matrix for orthogonal vectors
U = zeros(size(V));
% Gram-Schmidt Process
for i = 1:n
 % Start with the original vector
 U(:, i) = V(:, i);

 % Subtract projections of previous orthogonal vectors
 for j = 1:i-1
 U(:, i) = U(:, i) - (dot(U(:, j), V(:, i)) / dot(U(:, j), U(:, j))) * U(:, j);
 end
end
% Normalize the orthogonal vectors to make them orthonormal
E = zeros(size(U));
for i = 1:n
 E(:, i) = U(:, i) / norm(U(:, i));
end
% Display the results
disp('Original Vectors (V):');
disp(V);
disp('Orthogonal Vectors (U):');
disp(U);
disp('Orthonormal Vectors (E):');
disp(E);
% Plotting the original vectors
figure;
hold on;
grid on;
quiver3(0, 0, 0, V(1, 1), V(2, 1), V(3, 1), 'r', 'LineWidth', 2);
quiver3(0, 0, 0, V(1, 2), V(2, 2), V(3, 2), 'g', 'LineWidth', 2);
quiver3(0, 0, 0, V(1, 3), V(2, 3), V(3, 3), 'b', 'LineWidth', 2);
% Plotting the orthonormal vectors
quiver3(0, 0, 0, E(1, 1), E(2, 1), E(3, 1), 'r--', 'LineWidth', 2);
quiver3(0, 0, 0, E(1, 2), E(2, 2), E(3, 2), 'g--', 'LineWidth', 2);
quiver3(0, 0, 0, E(1, 3), E(2, 3), E(3, 3), 'b--', 'LineWidth', 2);
% Setting up the plot
xlabel('X');
ylabel('Y');
zlabel('Z');
title('Gram-Schmidt Orthonormalization');
legend({'V1', 'V2', 'V3', 'E1', 'E2', 'E3'}, 'Location', 'Best');
axis equal;
hold off;

`
            },
            {
                header: "Additional DC Program Placeholder",
                question: "QPSK modulation and Demodulation",
                code: 
`

clc;
clear all;
close all;
data=[0 1 0 1 1 1 0 0 1 1]; 
figure(1)
stem(data, 'linewidth',3), grid on;
title(' Information before Transmitting ');
axis([0 11 0 1.5]);
data_NZR=2*data-1; 
s_p_data=reshape(data_NZR,2,length(data)/2); 
br=10.^6; 
f=br; 
T=1/br; 
t=T/99:T/99:T; 
y=[];
y_in=[];
y_qd=[];
for(i=1:length(data)/2)
    y1=s_p_data(1,i)*cos(2*pi*f*t); 
    y2=s_p_data(2,i)*sin(2*pi*f*t); 
    y_in=[y_in y1];
    y_qd=[y_qd y2]; 
    y=[y y1+y2]; 
end
Tx_sig=y; 
tt=T/99:T/99:(T*length(data))/2;
figure(2)
subplot(3,1,1);
plot(tt,y_in, 'linewidth',3), grid on;
title('wave form for inphase component in QPSK modulation ');
xlabel('time(sec)'); ylabel(' amplitude(volt) ');
subplot(3,1,2);
plot(tt,y_qd, 'linewidth',3);
grid on;
title('wave form for Quadrature component in QPSK modulation ');
xlabel('time(sec)');
ylabel(' amplitude(volt) ');
subplot(3,1,3);
plot(tt,Tx_sig, 'r', 'linewidth',3), grid on;
title('QPSK modulated signal (sum of inphase and Quadrature phase signal)');
xlabel('time(sec)');
ylabel(' amplitude(volt) ');


Rx_data=[];
Rx_sig=Tx_sig; 
for(i=1:1:length(data)/2)
    
    Z_in=Rx_sig((i-1)*length(t)+1:i*length(t)).*cos(2*pi*f*t);
  
    
    Z_in_intg=(trapz(t,Z_in))*(2/T); 
    if(Z_in_intg>0) 
        Rx_in_data=1;
    else
        Rx_in_data=0;
    end
    

    Z_qd=Rx_sig((i-1)*length(t)+1:i*length(t)).*sin(2*pi*f*t);
    
    
    Z_qd_intg=(trapz(t,Z_qd))*(2/T); 
    if (Z_qd_intg>0) 
        Rx_qd_data=1;
    else
        Rx_qd_data=0;
    end
    
    Rx_data=[Rx_data Rx_in_data Rx_qd_data];
end
figure(3)
stem(Rx_data,'linewidth',3)
title('Information after Receiving');
axis([ 0 11 0 1.5]), grid on;

`
            },
            {
                header: "Additional DC Program Placeholder",
                question: "16 QAM modulation",
                code: 
`
clc;
clear all;
close all;

M = 16;               % Modulation order
k = log2(M);          % Number of bits per symbol
n = 30000;            % Number of symbols per frame
sps = 1;              % Number of samples per symbol

% Use default random number generator
rng default

% Generate vector of binary data
dataIn = randi([0 1],n*k,1);

% Plot random bits
figure;
stem(dataIn(1:40), 'filled');
title('Random Bits');
xlabel('Bit Index');
ylabel('Binary Value');

% Convert binary data to integer symbols
dataSymbolsIn = bi2de(reshape(dataIn, k, []).', 'left-msb');

% Plot random symbols
figure;
stem(dataSymbolsIn(1:10));
title('Random Symbols');
xlabel('Symbol Index');
ylabel('Integer Value');

% Binary-encoded QAM modulation
dataMod = qammod(dataSymbolsIn, M, 'bin');

% Gray-encoded QAM modulation
dataModG = qammod(dataSymbolsIn, M);

% Set Eb/No (in dB)
EbNo = 10;

% Convert Eb/No to SNR (dB)
snr = EbNo + 10*log10(k);  % Simple SNR conversion formula

% Add AWGN noise to the modulated signals
receivedSignal = awgn(dataMod, snr, 'measured');
receivedSignalG = awgn(dataModG, snr, 'measured');

% Plot the constellation diagrams for Binary and Gray-coded QAM
sPlotFig = scatterplot(receivedSignal, 1, 0, 'g.');
hold on
scatterplot(dataMod, 1, 0, 'k*', sPlotFig);
title('Constellation Diagram for Binary-Coded QAM');

% Binary-encoded QAM demodulation
dataSymbolsOut = qamdemod(receivedSignal, M, 'bin');

% Gray-coded QAM demodulation
dataSymbolsOutG = qamdemod(receivedSignalG, M);

% Convert integer symbols back to binary data
dataOut = de2bi(dataSymbolsOut, k, 'left-msb').';
dataOut = dataOut(:);  % Reshape into a column vector

dataOutG = de2bi(dataSymbolsOutG, k, 'left-msb').';
dataOutG = dataOutG(:);  % Reshape into a column vector

% Calculate bit error rate for binary-coded QAM
[numErrors, ber] = biterr(dataIn, dataOut);
fprintf('\nThe binary coding bit error rate is %5.2e, based on %d errors.\n', ber, numErrors);

% Calculate bit error rate for Gray-coded QAM
[numErrorsG, berG] = biterr(dataIn, dataOutG);
fprintf('\nThe Gray coding bit error rate is %5.2e, based on %d errors.\n', berG, numErrorsG);

% Modulation order
M = 16;

% Integer input (symbols from 0 to M-1)
x = 0:(M-1);

% 16-QAM output (binary-coded)
symbin = qammod(x, M, 'bin');

% 16-QAM output (Gray-coded)
symgray = qammod(x, M, 'gray');

% Plot constellation diagram for Gray-coded QAM
scatterplot(symgray, 1, 0, 'b*');

% Add labels to the constellation points
for k = 1:M
    text(real(symgray(k)) - 0.0, imag(symgray(k)) + 0.3, dec2base(x(k), 2, 4), 'Color', [0 1 0]);
    text(real(symgray(k)) - 0.5, imag(symgray(k)) + 0.3, num2str(x(k)), 'Color', [0 1 0]);
    text(real(symbin(k)) - 0.0, imag(symbin(k)) - 0.3, dec2base(x(k), 2, 4), 'Color', [1 0 0]);
    text(real(symbin(k)) - 0.5, imag(symbin(k)) - 0.3, num2str(x(k)), 'Color', [1 0 0]);
   end

% Set plot title and axis limits
title('16-QAM Symbol Mapping');
axis([-4 4 -4 4]);

`
            },
            {
                header: "Additional DC Program Placeholder",
                question: "Baseband using rectangular",
                code: 
`
N=1e6;
SNR_dB=0:2:20;
rect_pulse_duration=1;
pulse_amplitude=1;
bits=randi([0,1],1,N);
tx_signal=zeros(1,N*rect_pulse_duration);
for k=1:N
    if bits(k)==1
        tx_signal((k-1)*rect_pulse_duration+1:k*rect_pulse_duration)=pulse_amplitude;
    end
end
ber=zeros(1,length(SNR_dB));
for idx=1:length(SNR_dB)
    snr_linear=10^(SNR_dB(idx)/10);
    noise_power=pulse_amplitude^2/(2*snr_linear);
    noise=sqrt(noise_power)*randn(1,length(tx_signal));
    rx_signal=tx_signal+noise;
    received_bits=zeros(1,N);
    for k=1:N
        pulse_start=(k-1)*rect_pulse_duration+1;
        pulse_end=k*rect_pulse_duration;
        if sum(rx_signal(pulse_start:pulse_end))>0
            received_bits(k)=1;
        else
            received_bits(k)=0;
        end
    end
    errors=sum(bits~=received_bits);
    ber(idx)=errors/N;
end
figure;
semilogy(SNR_dB,ber,'o-','LineWidth',2);
xlabel('SNR (dB)');
ylabel('Bit vs SNR for Rectangular Pulse Shapng in AWGN Channel');
grid on;
`
            },
            {
                header: "Additional DC Program Placeholder",
                question: "Cyclic Redundancy check",
                code: 
`
#include <stdio.h>
#include <string.h>

char t[28], cs[28], g[] = "1101";    % without error - g[] = "101101"
int a, e, c;

#define N strlen(g)

main()
{
    printf("\nEnter the Data: ");
    scanf("%s", t);
    printf("\n\nThe Generator Polynomial is: %s\n", g);
    a = strlen(t);

    for (e = a; e < a + N - 1; e++)
        t[e] = '0';
    
    printf("\nThe modified data is: %s\n", t);
    crc();
    printf("\nChecksum is: %s\n", cs);

    for (e = a; e < a + N - 1; e++)
        t[e] = cs[e - a];
    
    printf("\nThe Final Codeword is: %s\n", t);
    printf("\nTest Error Detection 0(YES) 1(NO)? :");
    scanf("%d", &e);

    if (e == 0)
    {
        do
        {
            printf("\nEnter the position where Error is to be inserted: ");
            scanf("%d", &e);
        } while (e == 0 || e > a + N - 1);

        t[e - 1] = (t[e - 1] == '0') ? '1' : '0';
        printf("\nErroneous Data: %s\n", t);
    }

    crc();
    for (e = 0; (e < N - 1) && (cs[e] != '1'); e++);

    if (e < N - 1)
        printf("\nError Detected\n\n");
    else
        printf("\nNo Error Detected\n\n");

    return 0;
}

crc()
{
    for (e = 0; e < N; e++)
        cs[e] = t[e];

    do
    {
        if (cs[0] == '1')
            xor();

        for (c = 0; c < N - 1; c++)
            cs[c] = cs[c + 1];

        cs[c] = t[e++];
    } while (e <= a + N - 1);
}

xor()
{
    for (c = 1; c < N; c++)
        cs[c] = ((cs[c] == g[c]) ? '0' : '1');
}`
            }


            
            // Additional DC programs can be added here
            /*
            {
                header: "Additional DC Program Placeholder",
                question: "Additional DC Program Question Placeholder",
                code: 
`% Additional DC Program Code Placeholder`
            },
            */
        ],
        
        // Future placeholders for another subject set (commented out)
        /*
        AnotherSubject: [
            {
                header: "Another Subject Program Placeholder",
                question: "Another Subject Program Question Placeholder",
                code: 
`% Another Subject Program Code Placeholder`
            },
            // Additional programs for AnotherSubject can be added here
            {
                header: "Additional AnotherSubject Program Placeholder",
                question: "Additional AnotherSubject Program Question Placeholder",
                code: 
`% Additional AnotherSubject Program Code Placeholder`
            }
        ]
        */
    }
}
