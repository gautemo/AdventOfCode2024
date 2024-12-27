import { sumOf } from '@std/collections'
import { count } from '../common/list.ts'

if (import.meta.main) {
  const input = await Deno.readTextFile('./inputs/day25.txt')
  console.log('Answer part 1 =', part1(input))
}

export function part1(input: string) {
  const { keys, locks } = getKeysAndLocks(input)
  return sumOf(keys, (key) => {
    return count(locks, (lock) => {
      for (let i = 0; i < key.length; i++) {
        if (key[i] - lock[i] < 0) return false
      }
      return true
    })
  })
}

function getKeysAndLocks(input: string) {
  const keys: number[][] = []
  const locks: number[][] = []
  for (const item of input.split('\n\n')) {
    const type = item[0]
    const lines = item.split('\n')
    const heights: number[] = []
    for (let i = 0; i < lines[0].length; i++) {
      heights.push(count(lines, (line) => line[i] === type))
    }
    if (type === '#') {
      locks.push(heights)
    } else {
      keys.push(heights)
    }
  }
  return { keys, locks }
}
