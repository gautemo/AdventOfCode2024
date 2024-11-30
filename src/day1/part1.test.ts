import { assertEquals } from '@std/assert'
import { part1 } from './main.ts'

Deno.test('1122 is 3', () => {
  assertEquals(part1('1122'), 3)
})

Deno.test('1111 is 4', () => {
  assertEquals(part1('1111'), 4)
})

Deno.test('1234 is 0', () => {
  assertEquals(part1('1234'), 0)
})

Deno.test('91212129 is 9', () => {
  assertEquals(part1('91212129'), 9)
})
