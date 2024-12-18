import { assertEquals } from '@std/assert'
import { part1 } from './main.ts'

Deno.test('output is 4,6,3,5,6,3,5,2,1,0', () => {
  const input = `
Register A: 729
Register B: 0
Register C: 0

Program: 0,1,5,4,3,0`.trim()
  assertEquals(part1(input), '4,6,3,5,6,3,5,2,1,0')
})
