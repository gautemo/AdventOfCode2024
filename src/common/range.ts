type Range = { a: number; b: number }

export function inRange(range: Range, value: number) {
  return Math.min(range.a, range.b) <= value && value <= Math.max(range.a, range.b)
}
