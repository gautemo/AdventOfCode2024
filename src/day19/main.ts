import { sumOf } from '@std/collections'
import { count } from '../common/list.ts'

const cache = new Map<string, number>()

if (import.meta.main) {
  const input = await Deno.readTextFile('./inputs/day19.txt')
  console.log('Answer part 1 =', part1(input))
  console.log('Answer part 2 =', part2(input))
}

export function part1(input: string) {
  const { patterns, designs } = getPatternsAndDesings(input)

  return count(designs, (design) => matchPatterns(design, patterns) > 0)
}

export function part2(input: string) {
  const [patternsInput, designsInput] = input.split('\n\n')
  const patterns = patternsInput.split(', ')
  const designs = designsInput.split('\n')

  return sumOf(designs, (design) => matchPatterns(design, patterns))
}

function getPatternsAndDesings(input: string) {
  const [patternsInput, designsInput] = input.split('\n\n')
  return {
    patterns: patternsInput.split(', '),
    designs: designsInput.split('\n'),
  }
}

function matchPatterns(design: string, patterns: string[]): number {
  if (cache.has(design)) {
    return cache.get(design)!
  }
  const options = sumOf(patterns, (pattern) => {
    if (design === pattern) {
      return 1
    }
    if (design.startsWith(pattern)) {
      return matchPatterns(design.substring(pattern.length), patterns)
    }
    return 0
  })
  cache.set(design, options)
  return options
}
