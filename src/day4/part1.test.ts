import { assertEquals } from '@std/assert'
import { part1 } from './main.ts'

Deno.test('XMAS appears 18 times', () => {
  const input = `
MMMSXXMASM
MSAMXMSMSA
AMXSXMAAMM
MSAMASMSMX
XMASAMXAMM
XXAMMXXAMA
SMSMSASXSS
SAXAMASAAA
MAMMMXMMMM
MXMXAXMASX`.trim()
  assertEquals(part1(input), 18)
})
