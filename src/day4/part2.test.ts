import { assertEquals } from '@std/assert'
import { part2 } from './main.ts'

Deno.test('X-MAS appears 9 times', () => {
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
  assertEquals(part2(input), 9)
})
