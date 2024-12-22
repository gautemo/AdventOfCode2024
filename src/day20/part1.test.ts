import { assertEquals } from '@std/assert'
import { part1 } from './main.ts'

Deno.test('2 cheats saves 40 picoseconds or more', () => {
  const input = `
###############
#...#...#.....#
#.#.#.#.#.###.#
#S#...#.#.#...#
#######.#.#.###
#######.#.#...#
#######.#.###.#
###..E#...#...#
###.#######.###
#...###...#...#
#.#####.#.###.#
#.#...#.#.#...#
#.#.#.#.#.#.###
#...#...#...###
###############`.trim()
  assertEquals(part1(input, 40), 2)
})
