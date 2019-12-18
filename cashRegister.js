/**
Design a cash register drawer function checkCashRegister() that accepts:
  - purchase price as the first argument (price),
  - payment as the second argument (cash),
  - and cash-in-drawer (cid) as the third argument.

cid is a 2D array listing available currency.
The checkCashRegister() function should always return an object with a status key and a change key.
Return {status: "INSUFFICIENT_FUNDS", change: []} if cash-in-drawer is less than the change due, or if you cannot return the exact change.
Return {status: "CLOSED", change: [...]} with cash-in-drawer as the value for the key change if it is equal to the change due.
Otherwise, return {status: "OPEN", change: [...]}, with the change due in coins and bills, sorted in highest to lowest order, as the value of the change key.

Currency Unit	Amount
Penny	$0.01 (PENNY)
Nickel	$0.05 (NICKEL)
Dime	$0.1 (DIME)
Quarter	$0.25 (QUARTER)
Dollar	$1 (DOLLAR)
Five Dollars	$5 (FIVE)
Ten Dollars	$10 (TEN)
Twenty Dollars	$20 (TWENTY)
One-hundred Dollars	$100 (ONE HUNDRED)
 */

function checkCashRegister (price, cash, cid) {
  const due = cash - price
  const totalInDrawer = cid
    .map(([_, sum]) => sum)
    .reduce((acc, cur) => parseFloat(Number.parseFloat(acc + cur).toFixed(2)), 0)

  if (due > totalInDrawer) {
    return { status: 'INSUFFICIENT_FUNDS', change: [] }
  } else if (due === totalInDrawer) {
    return { status: 'CLOSED', change: cid }
  }

  const validCur = cid
    .filter(([currency, sum]) => sum !== 0 & convert(currency) <= due)
    .reverse()

  if (validCur.length === 0 || validCur.reduce((acc, [curName, curSum]) => {
    return curSum + acc
  }, 0) < due) {
    return { status: 'INSUFFICIENT_FUNDS', change: [] }
  }

  const [_, change] = validCur.reduce(([toChange, changes], [curName, curTotal]) => {
    if (toChange <= 0) {
      return [toChange, changes]
    }
    const maxChange = parseFloat(Number.parseFloat(Math.min(curTotal, toChange)).toFixed(2))
    if (maxChange < convert(curName)) {
      console.log(maxChange, curName, convert(curName))
      return [toChange, changes]
    }
    console.log(maxChange, curName, convert(curName))
    const curChanges = Math.floor(maxChange / convert(curName))
    curTotal = curChanges * convert(curName)
    toChange -= curTotal
    return [toChange, changes.concat([[curName, curTotal]])]
  }, [due, []])

  // Here is your change, ma'am.
  return { status: 'OPEN', change }
}

function convert (currency) {
  let amount = 0
  try {
    amount = {
      PENNY: 0.01,
      NICKEL: 0.05,
      DIME: 0.1,
      QUARTER: 0.25,
      ONE: 1,
      FIVE: 5,
      TEN: 10,
      TWENTY: 20,
      'ONE HUNDRED': 100
    }[currency.toUpperCase()]
  } catch (error) {
    amount = 0
  }
  return amount
}

checkCashRegister(
  19.5,
  20,
  [['PENNY', 0.01], ['NICKEL', 0], ['DIME', 0], ['QUARTER', 0], ['ONE', 1], ['FIVE', 0], ['TEN', 0], ['TWENTY', 0], ['ONE HUNDRED', 0]]
)
// should return {status: "OPEN", change: [["TWENTY", 60], ["TEN", 20], ["FIVE", 15], ["ONE", 1], ["QUARTER", 0.5], ["DIME", 0.2], ["PENNY", 0.04]]}.

/*
checkCashRegister(
  19.5,
  20,
  [
    ["PENNY", 1.01],
    ["NICKEL", 2.05],
    ["DIME", 3.1],
    ["QUARTER", 4.25],
    ["ONE", 90],
    ["FIVE", 55],
    ["TEN", 20],
    ["TWENTY", 60],
    ["ONE HUNDRED", 100]
  ]
) should return {status: "OPEN", change: [["QUARTER", 0.5]]}.

checkCashRegister(
  3.26,
  100,
  [
    ["PENNY", 1.01],
    ["NICKEL", 2.05],
    ["DIME", 3.1],
    ["QUARTER", 4.25],
    ["ONE", 90],
    ["FIVE", 55],
    ["TEN", 20],
    ["TWENTY", 60],
    ["ONE HUNDRED", 100]
  ]
) should return {status: "OPEN", change: [["TWENTY", 60], ["TEN", 20], ["FIVE", 15], ["ONE", 1], ["QUARTER", 0.5], ["DIME", 0.2], ["PENNY", 0.04]]}.
checkCashRegister(19.5, 20, [["PENNY", 0.01], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 0], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]]) should return {status: "INSUFFICIENT_FUNDS", change: []}.
checkCashRegister(19.5, 20, [["PENNY", 0.01], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 1], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]]) should return {status: "INSUFFICIENT_FUNDS", change: []}.
checkCashRegister(19.5, 20, [["PENNY", 0.5], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 0], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]]) should return {status: "CLOSED", change: [["PENNY", 0.5], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 0], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]]}.
*/
