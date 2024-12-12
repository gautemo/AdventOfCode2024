import { assertEquals } from '@std/assert'
import { part2 } from './main.ts'

Deno.test('fence price 1206', () => {
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
  assertEquals(part2(input), 1206)
})
