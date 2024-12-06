import { assertEquals } from '@std/assert'
import { part1 } from './main.ts'

Deno.test('test is 0', () => {
  const input = `
....#.....
.........#
..........
..#.......
.......#..
..........
.#..^.....
........#.
#.........
......#...`.trim()
  assertEquals(part1(input), 41)
})
