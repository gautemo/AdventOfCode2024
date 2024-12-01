import { assertEquals } from '@std/assert'
import { part1 } from './main.ts'

Deno.test('test is 11', () => {
  const input = `
3   4
4   3
2   5
1   3
3   9
3   3`.trim()
  assertEquals(part1(input), 11)
})
