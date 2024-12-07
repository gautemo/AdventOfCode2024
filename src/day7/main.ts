import { sumOf } from '@std/collections'
import { toListWithNumbers } from '../common/input.ts'

export function part1(input: string) {
  const equations = toListWithNumbers(input)
  return calibrate(equations, twoOperators)
}

export function part2(input: string) {
  const equations = toListWithNumbers(input)
  return calibrate(equations, threeOperators)
}

function calibrate(equations: number[][], operatorsFn: (a: number, b: number) => number[]) {
  return sumOf(equations, ([answer, ...rest]) => {
    let possibilities = [rest[0]]
    for (const n of rest.slice(1)) {
      possibilities = possibilities.flatMap((p) => operatorsFn(p, n)).filter((p) => p <= answer)
    }
    if (possibilities.includes(answer)) {
      return answer
    }
    return 0
  })
}

function twoOperators(a: number, b: number) {
  return [
    a + b,
    a * b,
  ]
}

function threeOperators(a: number, b: number) {
  return [
    a + b,
    a * b,
    parseInt(`${a}${b}`),
  ]
}

if (import.meta.main) {
  const input = await Deno.readTextFile('./inputs/day7.txt')
  console.log('Answer part 1 =', part1(input))
  console.log('Answer part 2 =', part2(input))
}
