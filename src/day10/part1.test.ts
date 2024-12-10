import { assertEquals } from '@std/assert'
import { part1 } from './main.ts'

Deno.test('test is 36', () => {
  const input = `
89010123
78121874
87430965
96549874
45678903
32019012
01329801
10456732`.trim()
  assertEquals(part1(input), 36)
})
