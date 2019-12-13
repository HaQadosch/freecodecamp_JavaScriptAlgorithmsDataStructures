function smallestCommons (arr) {
  const [min, max] = arr.sort((a, b) => a - b)
  const range_ = range(max, inc, min)
  const listPrimes_ = range_.map(x => [x, listPrimes(x)])
  const primeFactors_ = listPrimes_.map(([x, primes]) => primeFactors(x, primes)[1])
  console.log(range_, primeFactors_)

  return arr
}

smallestCommons([1, 5])
// console.assert(smallestCommons([5, 1]) === 60)
// console.assert(smallestCommons([2, 10]) === 2520)
// console.assert(smallestCommons([1, 13]) === 360360)
// console.assert(smallestCommons([23, 18]) === 6056820)

function primeFactors (val = 1, primes = []) {
  return primes.reduce(([rest, factors], currPrime) => {
    if (rest % currPrime === 0) {
      return exhaustCurrPrime(rest, currPrime, factors)
    }
    return [rest, factors]
  }, [val, []])

  // 24, 2, [] => [1, [2, 2, 2, 3]]
  function exhaustCurrPrime (rest, currPrime, factors) {
    let newRest = rest
    let newFactors = factors
    while (newRest % currPrime === 0) {
      newRest = newRest / currPrime
      newFactors = newFactors.concat([currPrime])
    }
    return [newRest, newFactors]
  }
}

console.log(primeFactors(12, [2, 3, 5, 7, 9, 11]))

function listPrimes (val) {
  return range(val, nextPrime)
}

function inc (_, x) {
  return x + 1
}

function nextPrime (primes = []) {
  const lastPrime = primes[primes.length - 1] || 1
  function _nextPrime (primes, candidate = lastPrime + 1) {
    if (primes.every(val => candidate % val !== 0)) {
      return candidate
    } else {
      return _nextPrime(primes, candidate + 1)
    }
  }
  return _nextPrime(primes)
}

function range (stop, step = (_, x) => x + 1, current = 1, list = []) {
  if ((list[list.length - 1] || 1) > stop) {
    const last = list[list.length - 1]
    if (last > stop) {
      list.pop()
    }
    return list
  } else {
    return range(stop, step, current + 1, list.concat([step(list, current)]))
  }
}
