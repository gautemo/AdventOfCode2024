import { assertEquals } from '@std/assert'
import { part1 } from './main.ts'

Deno.test('55312 stones', () => {
  const input = '125 17'
  assertEquals(part1(input), 55312)
})
