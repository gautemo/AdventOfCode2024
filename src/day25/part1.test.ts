import { assertEquals } from '@std/assert'
import { part1 } from './main.ts'

Deno.test('unique lock/key fits is 3', () => {
  const input = `
#####
.####
.####
.####
.#.#.
.#...
.....

#####
##.##
.#.##
...##
...#.
...#.
.....

.....
#....
#....
#...#
#.#.#
#.###
#####

.....
.....
#.#..
###..
###.#
###.#
#####

.....
.....
.....
#....
#.#..
#.#.#
#####`.trim()
  assertEquals(part1(input), 3)
})
