import { assertEquals } from '@std/assert'
import { part2 } from './main.ts'

Deno.test('mul is 48', () => {
  const input = `xmul(2,4)&mul[3,7]!^don't()_mul(5,5)+mul(32,64](mul(11,8)undo()?mul(8,5))`
  assertEquals(part2(input), 48)
})
