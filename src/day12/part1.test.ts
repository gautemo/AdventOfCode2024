import { assertEquals } from '@std/assert'
import { part1 } from './main.ts'

Deno.test('fence price 1930', () => {
  const input = `
RRRRIICCFF
RRRRIICCCF
VVRRRCCFFF
VVRCCCJFFF
VVVVCJJCFE
VVIVCCJJEE
VVIIICJJEE
MIIIIIJJEE
MIIISIJEEE
MMMISSJEEE`.trim()
  assertEquals(part1(input), 1930)
})
