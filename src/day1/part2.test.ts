import { assertEquals } from '@std/assert'
import { part2 } from './main.ts'

Deno.test('test is 31', () => {
  const input = `
3   4
4   3
2   5
1   3
3   9
3   3`.trim()
  assertEquals(part2(input), 31)
})
