import { sumOf } from '@std/collections'

export function part1(input: string) {
  return sumOf(input.matchAll(/mul\((\d{1,3}),(\d{1,3})\)/g), (m) => {
    return parseInt(m[1]) * parseInt(m[2])
  })
}

export function part2(input: string) {
  let active = true
  return sumOf(input.matchAll(/mul\((\d{1,3}),(\d{1,3})\)|do\(\)|don't\(\)/g), (m) => {
    switch (m[0]) {
      case 'do()':
        active = true
        break
      case `don't()`:
        active = false
        break
      default:
        if (active) {
          return parseInt(m[1]) * parseInt(m[2])
        }
    }
    return 0
  })
}

if (import.meta.main) {
  const input = await Deno.readTextFile('./inputs/day3.txt')
  console.log('Answer part 1 =', part1(input))
  console.log('Answer part 2 =', part2(input))
}
