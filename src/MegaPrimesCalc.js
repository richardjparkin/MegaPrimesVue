function IsPrime(number) {
    // Function to determine whether or not a number is a prime
    // Considered prime if no number from 2 up to the sqrt<number> is exactly divisible
    // The sqrt is used because it will be the highest number that can divide exactly

    if (number <= 1) {
        return false;
    }

    var root = Math.sqrt(number)

    for (var i = 2; i <= root; i++) {
        if (number % i == 0) {
            return false;
        }
    }

    return true;
}

function AreAllDigitsPrime(number) {
    // Function to determine whether or not ALL digits of a number are prime

    while (number > 0) {
        var digit = number % 10;
        number = Math.floor(number / 10);

        if (digit != 2 && digit != 3 && digit != 5 && digit != 7) {
            return false;
        }
    }

    return true;
}

function SieveEratosthenesBasic(max) {
    // Function that retrieves all the prime numbers up to <max> using the sieve of Eratosthenes algorithm (https://en.wikipedia.org/wiki/Sieve_of_Eratosthenes)
    // Cannot be used as a solution on it own because of the memory requirements when <max> is very large
    // Is used to implement the segmented version of the sieve of Eratosthenes algorithm

    var primes = []
    var primesTmp = [max + 1]

    for (var i = 0; i <= max; i++) {
        primesTmp[i] = true;
    }

    for (i = 2; i <= max; i++) {
        if (primesTmp[i]) {
            primes.push(i);

            for (var j = i + i; j <= max; j += i) {
                primesTmp[j] = false;
            }
        }
    }

    return primes;
}  

exports.SieveEratosthenes = function (max) {
    // Function that retrieves all the megaprime numbers up to <max> using the segmented version of the sieve of Eratosthenes algorithm (https://en.wikipedia.org/wiki/Sieve_of_Eratosthenes)
    // It has to be the segmented rather than the simple version because of the memory requirements when <max> is very large

    var megaPrimes = [];

    // Start by generating all the prime numbers up to the sqrt<max>

    var maxSegSize = Math.floor(Math.sqrt(max));

    var primes = SieveEratosthenesBasic(maxSegSize);

    for (var i = 0; i < primes.length; i++) {
        var prime = primes[i];
        if (AreAllDigitsPrime(prime)) {
            megaPrimes.push(prime);
        }
    }

    // Then break the rest of the number sequence from sqrt<max> to <max> into segments of size sqrt<max>
    // Calculating the megaprimes in each segment

    var segStart = maxSegSize + 1;

    while (segStart <= max) {
        var segEnd = segStart + maxSegSize - 1;
        if (segEnd > max)
            segEnd = max;

        var segSize = segEnd - segStart + 1;
        var segPrimes = [segSize];

        for (i = 0; i < segSize; i++) {
            segPrimes[i] = true;
        }

        for (i = 0; i <= primes.length; i++) {
            prime = primes[i];
            var checkStart = Math.floor(segStart / prime) * prime;
            if (segStart % prime != 0) {
                checkStart += prime;
            }

            for (var j = checkStart; j <= segEnd; j += prime) {
                segPrimes[j - segStart] = false;
            }
        }

        for (j = 0; j < segSize; j++) {
            var number = j + segStart;

            if (segPrimes[j] && AreAllDigitsPrime(number)) {
                megaPrimes.push(number);
            }
        }

        segStart += maxSegSize;
    }

    return megaPrimes;
}

exports.TrialDivison = function (max) {
    // Function to determine all the megaprime numbers up to <max> using the simple trial by division method

    var megaPrimes = [];

    for (var i = 2; i <= max && i != 0; i++) {
        if (AreAllDigitsPrime(i) && IsPrime(i)) {
            megaPrimes.push(i);
        }
    }

    return megaPrimes;
}



