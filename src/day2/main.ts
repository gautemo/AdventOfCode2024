import { slidingWindows } from '@std/collections'
import { toListWithNumbers } from '../common/input.ts'
import { count } from '../common/list.ts'
import { inRange } from '../common/range.ts'

export function part1(input: string) {
  const levels = toListWithNumbers(input)
  return count(levels, levelIsSafe)
}

export function part2(input: string) {
  const levels = toListWithNumbers(input)
  return count(levels, (level) => {
    if (levelIsSafe(level)) return true
    for (let i = 0; i < level.length; i++) {
      if (levelIsSafe(level.toSpliced(i, 1))) return true
    }
    return false
  })
}

function levelIsSafe(level: number[]) {
  const windows = slidingWindows(level, 2)
  return windows.every((w) => inRange({ a: 1, b: 3 }, w[1] - w[0])) ||
    windows.every((w) => inRange({ a: -1, b: -3 }, w[1] - w[0]))
}

if (import.meta.main) {
  const input = await Deno.readTextFile('./inputs/day2.txt')
  console.log('Answer part 1 =', part1(input))
  console.log('Answer part 2 =', part2(input))
}
