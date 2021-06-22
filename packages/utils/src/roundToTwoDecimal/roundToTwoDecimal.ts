export default function roundToTwoDecimal(num: number) {
  return Math.round((num + Number.EPSILON) * 100) / 100
}