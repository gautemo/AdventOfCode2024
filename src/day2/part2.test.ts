import { assertEquals } from '@std/assert'
import { part2 } from './main.ts'

Deno.test('4 is safe', () => {
  const input = `
7 6 4 2 1
1 2 7 8 9
9 7 6 2 1
1 3 2 4 5
8 6 4 4 1
1 3 6 7 9`.trim()
  assertEquals(part2(input), 4)
})
