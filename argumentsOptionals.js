/**
Create a function that sums two arguments together. If only one argument is provided, then return a function that expects one argument and returns the sum.
For example, addTogether(2, 3) should return 5, and addTogether(2) should return a function.
Calling this returned function with a single argument will then return the sum:
var sumTwoAnd = addTogether(2);
sumTwoAnd(3) returns 5.
If either argument isn't a valid number, return undefined.
 */
function addTogether (a = undefined, b) {
  if (parseInt(a, 10) !== a) {
    return undefined
  } else if (parseInt(b, 10) === b) {
    return a + b
  } else if (b === undefined) {
    return b => parseInt(b, 10) === b ? a + b : undefined
  } else {
    return undefined
  }
}

addTogether(2)(3) // ?

/**
addTogether(2, 3) should return 5.
addTogether(2)(3) should return 5.
addTogether("http://bit.ly/IqT6zt") should return undefined.
addTogether(2, "3") should return undefined.
addTogether(2)([3]) should return undefined.
 */
