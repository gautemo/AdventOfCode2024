import { sumOf } from "@std/collections";

export function part1(input: string) {
  const lists = parseToLists(input)
  return lists.left.reduce((acc, current, index) => {
    return acc + Math.abs(current - lists.right[index])
  }, 0)
}

export function part2(input: string) {
  const lists = parseToLists(input)
  return sumOf(lists.left, (n) => n * lists.right.filter(it => it === n).length)
}

function parseToLists(input: string) {
  const lines = input.split('\n')
  return {
    left: lines.map(it => parseInt(it.split(' ')[0])).sort(),
    right: lines.map(it => parseInt(it.split(' ').at(-1)!)).sort()
  }
}

if (import.meta.main) {
  const input = await Deno.readTextFile('./inputs/day1.txt')
  console.log('Answer part 1 =', part1(input))
  console.log('Answer part 2 =', part2(input))
}
