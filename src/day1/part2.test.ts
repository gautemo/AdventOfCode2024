import { assertEquals } from '@std/assert'
import { part2 } from './main.ts'

Deno.test('1212 is 6', () => {
  assertEquals(part2('1212'), 6)
})

Deno.test('1221 is 0', () => {
  assertEquals(part2('1221'), 0)
})

Deno.test('123425 is 4', () => {
  assertEquals(part2('123425'), 4)
})

Deno.test('123123 is 12', () => {
  assertEquals(part2('123123'), 12)
})

Deno.test('12131415 is 4', () => {
  assertEquals(part2('12131415'), 4)
})
