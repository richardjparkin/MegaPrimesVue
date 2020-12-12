function IsPrime(number) {
    // Function to determine whether or not a number is a prime
    // Considered prime if no number from 2 up to the sqrt<number> is exactly divisible
    // The sqrt is used because it will be the highest number that can divide exactly

    if (number <= 1) {
        return false;
    } else if (number % 2 == 0) {
        return number == 2;
    }

    var root = Math.sqrt(number)

    for (var i = 3; i <= root; i+=2) {
        if (number % i == 0) {
            return false;
        }
    }

    return true;
}

exports.Fast = function (max) {
    // Function that retrieves all the megaprime numbers up to <max> by quickly identifying the numbers whos digits are all prime
    // If ANY digits of a number are NOT prime then instead of increasing the number by 1, increase the first digit that wasn't prime by 1

    // e.g.

    // If the current number is 422222222 then there is no point checking 422222223 - 499999999 because they will all fail because of the 4
    // Therefore we can safely increase the last digit by one to 522222222

    var megaPrimes = [];

    var i = 2;

    while (i <= max) {
        var number = i;
        var digit = 0;
        var index = 0;

        // Iterate through digits, least significant first

        while (number != 0) {
            digit = number % 10;

            if (digit != 2 && digit != 3 && digit != 5 && digit != 7) {
                break;
            }

            number = Math.floor(number / 10);
            index++;
        }

        if (number == 0) {
            // All digits ARE primes so check if the number is prime too

            if (IsPrime(i)) {
                megaPrimes.push(i);
            }

            // Check next number

            i++;
        }
        else {
            // All digits are NOT primes, increase the first digit that failed by 1

            i += Math.pow(10, index);
        }
    }

    return megaPrimes;
}