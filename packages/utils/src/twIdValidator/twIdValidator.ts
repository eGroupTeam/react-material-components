export const isTwIdFormatValid = (id: string) =>
  /^[A-Z][1,2,8,9]\d{8}$/.test(id);

export const isResidentPermitIdFormatValid = (id: string) =>
  /^[A-Z][A,B,C,D]\d{8}$/.test(id);

/**
 * 把對應的英文字母轉換成二位數字
 */
const parseLetterToNumber = (letter: string) => {
  const letters = 'ABCDEFGHJKLMNPQRSTUVXYWZIO';
  return letters.indexOf(letter) + 10;
};

/**
 * 取得第一個字母的加權值
 * @param {String} id
 */
const getFirstValue = (letter: string) => {
  // 第一碼英文字母轉換為二位數字碼
  const firstNumber = parseLetterToNumber(letter);
  // 轉換型態方便待會拆數字
  const firstNumberString = String(firstNumber);
  // 第一個字母的加權值
  return (
    Number(firstNumberString.charAt(0)) * 1 +
    Number(firstNumberString.charAt(1)) * 9
  );
};

/**
 * 取得後面 8 碼(扣除驗證碼)的加權值
 * @param {String} id
 */
const getSum = (others: string[]) => {
  let sum = 0;
  // 權重由 8 開始遞減至 1
  let weight = 8;
  for (let i = 0; i < others.length; i++) {
    const number = Number(others[i]);
    sum += number * weight;
    weight--;
  }
  return sum;
};

/**
 * 驗證檢查碼是否正確
 * 由模數減去餘數得檢查號碼，若餘數為 0 時，則設定其檢查碼為 0
 * @param {Number} remainder
 * @param {Number} checkNumber
 */
const checkNumberIsValid = (remainder: number, checkNumber: number) => {
  if (remainder === 0) {
    return checkNumber === 0;
  }
  return checkNumber === 10 - remainder;
};

/**
 * 身分證字號規則 http://web.fg.tp.edu.tw/~anny/idtest.htm
 * @param {String} id
 */
export const isTwId = (id: string) => {
  if (!isTwIdFormatValid(id)) return false;
  const firstValue = getFirstValue(id[0]);
  const idTailSum = getSum(Array.from(id.slice(1, 9)));
  const remainder = (firstValue + idTailSum) % 10;
  const checkNumber = Number(id.slice(-1));
  return checkNumberIsValid(remainder, checkNumber);
};

/**
 * 居留證號碼規則 http://web.fg.tp.edu.tw/~anny/idtest.htm
 * @param {String} id
 */
export const isResidentPermitId = (id: string) => {
  if (!isResidentPermitIdFormatValid(id)) return false;
  const firstValue = getFirstValue(id[0]);
  const secondNumberString = String(parseLetterToNumber(id[1]));
  const secondNumber = secondNumberString.charAt(1);
  const idTailSum = getSum([secondNumber, ...Array.from(id.slice(2, 9))]);
  const remainder = (firstValue + idTailSum) % 10;
  const checkNumber = Number(id.slice(-1));
  return checkNumberIsValid(remainder, checkNumber);
};
