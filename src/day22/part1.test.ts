import { assertEquals } from '@std/assert'
import { part1 } from './main.ts'

Deno.test('is 37327623', () => {
  const input = `
1
10
100
2024`.trim()
  assertEquals(part1(input), 37327623n)
})
