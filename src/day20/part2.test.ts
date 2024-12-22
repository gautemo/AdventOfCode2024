import { assertEquals } from '@std/assert'
import { part2 } from './main.ts'

Deno.test('7 cheats saves 74 picoseconds or more', () => {
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
  assertEquals(part2(input, 74), 7)
})
