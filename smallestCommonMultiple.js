function range (stop, step = x => x + 1, current = 1, list = []) {
  if ((list[list.length - 1] || 1) > stop) {
    const last = list[list.length - 1]
    if (last > stop) {
      list.pop()
    }
    return list
  } else {
    return range(stop, step, current + 1, list.concat(step(list, current)))
  }
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

console.log({ prime: nextPrime([]) })
console.log({ range: range(20, nextPrime) })

function listPrimes (val) {
  return []
}

function smallestCommons (arr) {
  console.log({ arr, primes: listPrimes(23) })
  return arr
}

smallestCommons([1, 5])

// console.assert(smallestCommons([5, 1]) === 60)
// console.assert(smallestCommons([2, 10]) === 2520)
// console.assert(smallestCommons([1, 13]) === 360360)
// console.assert(smallestCommons([23, 18]) === 6056820)
