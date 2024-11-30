import { sumOf } from '@std/collections'

export function part1(input: string) {
  const array = [...input].map((it) => parseInt(it))
  return digitsSum(array, 1)
}

export function part2(input: string) {
  const array = [...input].map((it) => parseInt(it))
  return digitsSum(array, array.length / 2)
}

function digitsSum(array: number[], next: number) {
  let index = 0
  return sumOf(array, (n) => {
    const compareWith = array[(index + next) % array.length]
    index++
    if (n === compareWith) return n
    return 0
  })
}

if (import.meta.main) {
  const input = await Deno.readTextFile('./inputs/day1.txt')
  console.log('Answer part 1 =', part1(input))
  console.log('Answer part 2 =', part2(input))
}
