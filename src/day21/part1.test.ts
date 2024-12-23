import { assertEquals } from '@std/assert'
import { part1 } from './main.ts'

Deno.test('complexity is 126384', () => {
  const input = `
029A
980A
179A
456A
379A`.trim()
  assertEquals(part1(input), 126384)
})
