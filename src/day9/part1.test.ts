import { assertEquals } from '@std/assert'
import { part1 } from './main.ts'

Deno.test('checksum is 1928', () => {
  const input = '2333133121414131402'
  assertEquals(part1(input), 1928)
})
