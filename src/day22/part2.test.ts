import { assertEquals } from '@std/assert'
import { part2 } from './main.ts'

Deno.test('gets 23 bananas', () => {
  const input = `
1
2
3
2024`.trim()
  assertEquals(part2(input), 23)
})
