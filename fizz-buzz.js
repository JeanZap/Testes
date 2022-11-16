'use strict';

process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString = '';
let currentLine = 0;

process.stdin.on('data', function (inputStdin) {
    inputString += inputStdin;
});

process.stdin.on('end', function () {
    inputString = inputString.split('\n');

    main();
});

function readLine() {
    return inputString[currentLine++];
}



/*
 * Complete the 'fizzBuzz' function below.
 *
 * The function accepts INTEGER n as parameter.
 */

function fizzBuzz(n) {
    // Write your code here

    for (let i = 1; i <= n; i++) {
        const multiploTres = i % 3 === 0
        const multiploCinco = i % 5 === 0
        if (multiploCinco && multiploTres)
            console.log('FizzBuzz')
        else if (multiploCinco)
            console.log('Buzz')
        else if (multiploTres)
            console.log('Fizz')
        else
            console.log(i)
    }

}

function main() {
    const n = parseInt(readLine().trim(), 10);

    fizzBuzz(n);
}
