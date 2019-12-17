function dropElements (arr, func) {
  // Drop them elements.
  return arr.reduce(({ flag, ret }, cur, ind, arr) => {
    if (flag) {
      return { flag, ret: ret.concat([cur]) }
    } else if (func(cur)) {
      return { flag: true, ret: ret.concat([cur]) }
    } else {
      return { flag, ret }
    }
  }, { flag: false, ret: [] }).ret
}

dropElements([1, 2, 3], function (n) { return n < 3 }) // ?

// console.assert(dropElements([1, 2, 3, 4], function (n) { return n >= 3 }) === [3, 4])
// console.assert(dropElements([0, 1, 0, 1], function (n) { return n === 1 }) === [1, 0, 1])
// console.assert(dropElements([1, 2, 3], function (n) { return n > 0 }) === [1, 2, 3])
// console.assert(dropElements([1, 2, 3, 4], function (n) { return n > 5 }) === [])
// console.assert(dropElements([1, 2, 3, 7, 4], function (n) { return n > 3 }) === [7, 4])
// console.assert(dropElements([1, 2, 3, 9, 2], function (n) { return n > 2 }) === [3, 9, 2])

/**
 * Given the array arr, iterate through and remove each element starting from the first element (the 0 index)
 * until the function func returns true when the iterated element is passed through it.
 * Then return the rest of the array once the condition is satisfied, otherwise, arr should be returned as an empty array
 */
