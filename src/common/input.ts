export function toListWithNumbers(input: string) {
  return input.split('\n').map((line) => Array.from(line.matchAll(/\d+/g), (m) => parseInt(m[0])))
}
