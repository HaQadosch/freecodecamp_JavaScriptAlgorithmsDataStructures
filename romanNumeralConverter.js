/**
Convert the given number into a roman numeral.
All roman numerals answers should be provided in upper-case.
 */

function convertToRoman (num) {
  const conv = {
    I: 0,
    V: 0,
    X: 0,
    L: 0,
    C: 0,
    D: 0,
    M: 0
  }
  const values = [
    [1000, 'M'],
    [500, 'D'],
    [100, 'C'],
    [50, 'L'],
    [10, 'X'],
    [5, 'V'],
    [1, 'I']
  ]

  const [spread] = values.reduce(([conv, num], [val, cur]) => {
    let rest = num // ?
    if (num >= val) {
      const mod = Math.floor(num / val)
      conv[cur] = mod
      rest = num - (mod * val)
    }
    return [conv, rest]
  }, [conv, num])

  const romanIVX = rulesIVX(['I', spread['I']], ['V', spread['V']], ['X', spread['X']])
  const romanXLC = rulesIVX(['X', spread['X']], ['L', spread['L']], ['C', spread['C']])
  const romanCDM = rulesIVX(['C', spread['C']], ['D', spread['D']], ['M', spread['M']])
  const romanM = rulesM(spread['M'])

  return `${romanM}${romanCDM}${romanXLC}${romanIVX}`

  function rulesM (m) {
    return m === 0 ? '' : `M${rulesM(m - 1)}`
  }

  function rulesIVX ([il, id], [vl, vd], [xl, _]) {
    const num = id + (5 * vd) // ?
    return {
      0: '',
      1: il,
      2: il + il,
      3: il + il + il,
      4: il + vl,
      5: vl,
      6: vl + il,
      7: vl + il + il,
      8: vl + il + il + il,
      9: il + xl
    }[num]
  }
}

convertToRoman(3999) // ?

/**
convertToRoman(2) should return "II".
convertToRoman(3) should return "III".
convertToRoman(4) should return "IV".
convertToRoman(5) should return "V".
convertToRoman(9) should return "IX".
convertToRoman(12) should return "XII".
convertToRoman(16) should return "XVI".
convertToRoman(29) should return "XXIX".
convertToRoman(44) should return "XLIV".
convertToRoman(45) should return "XLV"
convertToRoman(68) should return "LXVIII"
convertToRoman(83) should return "LXXXIII"
convertToRoman(97) should return "XCVII"
convertToRoman(99) should return "XCIX"
convertToRoman(400) should return "CD"
convertToRoman(500) should return "D"
convertToRoman(501) should return "DI"
convertToRoman(649) should return "DCXLIX"
convertToRoman(798) should return "DCCXCVIII"
convertToRoman(891) should return "DCCCXCI"
convertToRoman(1000) should return "M"
convertToRoman(1004) should return "MIV"
convertToRoman(1006) should return "MVI"
convertToRoman(1023) should return "MXXIII"
convertToRoman(2014) should return "MMXIV"
convertToRoman(3999) should return "MMMCMXCIX"
 */
