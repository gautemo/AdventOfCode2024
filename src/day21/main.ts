import { sumOf } from '@std/collections'

const numericKeyboard = `
789
456
123
.0A`.trim()

const directionalKeyboard = `
.^A
<v>`.trim()

const cache = new Map<string, number>()

if (import.meta.main) {
  const input = await Deno.readTextFile('./inputs/day21.txt')
  console.log('Answer part 1 =', part1(input))
  console.log('Answer part 2 =', part2(input))
}

export function part1(input: string) {
  return sumOf(input.split('\n'), (line) => {
    return complexity(line, 3)
  })
}

export function part2(input: string) {
  return sumOf(input.split('\n'), (line) => {
    return complexity(line, 26)
  })
}

function complexity(type: string, directionalRobots: number) {
  const length = lengthToRobotType(type, directionalRobots)
  return length * parseInt(type.replace('A', ''))
}

function lengthToRobotType(type: string, robotDepth: number): number {
  const cacheKey = `${type}-${robotDepth}`
  if (cache.has(cacheKey)) {
    return cache.get(cacheKey)!
  }
  let result = 0
  if (robotDepth === 0) {
    result = type.length
  } else {
    const map = /\d/.test(type) ? numericKeyboard : directionalKeyboard
    let on = 'A'
    for (const button of type) {
      const toTypeButton = buttons(on, button, map) + 'A'
      result += lengthToRobotType(toTypeButton, robotDepth - 1)
      on = button
    }
  }
  cache.set(cacheKey, result)
  return result
}

function buttons(on: string, to: string, map: string) {
  const lines = map.split('\n')
  const emptyX = 0
  const emptyY = lines.findIndex((line) => line.includes('.'))
  const onY = lines.findIndex((line) => line.includes(on))
  const onX = lines[onY].indexOf(on)
  const toY = lines.findIndex((line) => line.includes(to))
  const toX = lines[toY].indexOf(to)
  const left = ''.padEnd(onX - toX, '<')
  const right = ''.padEnd(toX - onX, '>')
  const up = ''.padEnd(onY - toY, '^')
  const down = ''.padEnd(toY - onY, 'v')
  if (toX === emptyX && onY === emptyY) {
    return up + down + left
  }
  if (onX === emptyX && toY === emptyY) {
    return right + up + down
  }
  return left + down + up + right
}
