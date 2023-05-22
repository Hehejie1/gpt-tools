/**
 * 获取区间随机值
 * @param max 最大值
 * @param min 最小值 默认0
 * @returns
 */
export const random = (max: number, min?: number): number => {
  // eslint-disable-next-line no-nested-ternary
  const realMin = min ? (min > max ? max : min) : 0
  const realMax = max > realMin ? max : realMin

  return Math.floor(Math.random() * (realMax - realMin + 1)) + realMin
}

// const pasList = [
//   'a',
//   'b',
//   'c',
//   'd',
//   'e',
//   'f',
//   'g',
//   'h',
//   'i',
//   'j',
//   'k',
//   'l',
//   'm',
//   'n',
//   'o',
//   'p',
//   'q',
//   'r',
//   's',
//   't',
//   'u',
//   'v',
//   'w',
//   'x',
//   'y',
//   'z',
//   'A',
//   'B',
//   'C',
//   'D',
//   'E',
//   'F',
//   'G',
//   'H',
//   'I',
//   'J',
//   'K',
//   'L',
//   'M',
//   'N',
//   'O',
//   'P',
//   'Q',
//   'R',
//   'S',
//   'T',
//   'U',
//   'V',
//   'W',
//   'X',
//   'Y',
//   'Z',
//   '0',
//   '1',
//   '2',
//   '3',
//   '4',
//   '5',
//   '6',
//   '7',
//   '8',
//   '9',
//   '_',
//   '-',
//   '$',
//   '%',
//   '&',
//   '@',
//   '+',
//   '!',
// ]

// export const randomKey = (len?: number) => {
//   const pasArrLen = pasList.length
//   return new Array(len || 16)
//     .fill(1)
//     .map(() => pasList[Math.floor(Math.random() * pasArrLen)])
//     .join('')
// }
