import { assertEquals } from '@std/assert'
import { part2 } from './main.ts'

Deno.test('checksum is 1928', () => {
  const input = '2333133121414131402'
  assertEquals(part2(input), 2858)
})
