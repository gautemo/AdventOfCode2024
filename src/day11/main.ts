import { sumOf } from '@std/collections'

export function part1(input: string) {
  const stones = input.split(' ')
  return sumOf(stones, (stone) => convert(stone, 25))
}

export function part2(input: string) {
  const stones = input.split(' ')
  return sumOf(stones, (stone) => convert(stone, 75))
}

const cache = new Map<string, number>()

function convert(stone: string, blinkingLeft: number): number {
  if (blinkingLeft === 0) return 1
  const key = `${stone}-${blinkingLeft}`
  if (cache.has(key)) {
    return cache.get(key)!
  }
  let nrStones = -1
  if (stone === '0') {
    nrStones = convert('1', blinkingLeft - 1)
  } else if (stone.length % 2 === 0) {
    nrStones = convert(parseInt(stone.substring(0, stone.length / 2)).toString(), blinkingLeft - 1) +
      convert(parseInt(stone.substring(stone.length / 2)).toString(), blinkingLeft - 1)
  } else {
    nrStones = convert((parseInt(stone) * 2024).toString(), blinkingLeft - 1)
  }
  cache.set(key, nrStones)
  return nrStones
}

if (import.meta.main) {
  const input = await Deno.readTextFile('./inputs/day11.txt')
  console.log('Answer part 1 =', part1(input))
  console.log('Answer part 2 =', part2(input)) // too low = 120633825
}
