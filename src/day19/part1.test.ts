import { assertEquals } from '@std/assert'
import { part1 } from './main.ts'

Deno.test('6 possible designs', () => {
  const input = `
r, wr, b, g, bwu, rb, gb, br

brwrr
bggr
gbbr
rrbgbr
ubwu
bwurrg
brgr
bbrgwb`.trim()
  assertEquals(part1(input), 6)
})
