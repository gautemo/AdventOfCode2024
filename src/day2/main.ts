import { toListWithNumbers } from '../common/input.ts'
import { count } from '../common/list.ts'

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
  const increases = level[0] < level[1]
  for (let i = 0; i < level.length - 1; i++) {
    const diff = increases ? level[i + 1] - level[i] : level[i] - level[i + 1]
    if (diff > 3 || diff < 1) return false
  }
  return true
}

if (import.meta.main) {
  const input = await Deno.readTextFile('./inputs/day2.txt')
  console.log('Answer part 1 =', part1(input))
  console.log('Answer part 2 =', part2(input))
}
