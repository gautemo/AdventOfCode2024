import { assertEquals } from '@std/assert'
import { part2 } from './main.ts'

Deno.test('16 possible options for designs', () => {
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
  assertEquals(part2(input), 16)
})
