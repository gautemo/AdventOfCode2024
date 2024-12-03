import { assertEquals } from '@std/assert'
import { part1 } from './main.ts'

Deno.test('mul is 161', () => {
  const input = `xmul(2,4)%&mul[3,7]!@^do_not_mul(5,5)+mul(32,64]then(mul(11,8)mul(8,5))`
  assertEquals(part1(input), 161)
})
