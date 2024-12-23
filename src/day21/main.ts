import { sumOf } from '@std/collections'

const numericKeyboard = `
789
456
123
.0A`.trim()

const directionalKeyboard = `
.^A
<v>`.trim()

const cache = new Map<string, string>()

if (import.meta.main) {
  const input = await Deno.readTextFile('./inputs/day21.txt')
  console.log('Answer part 1 =', part1(input)) // 217676 too high
  console.log('Answer part 2 =', part2(input))
}

export function part1(input: string) {
  return sumOf(input.split('\n'), (line) => {
    return complexity(line, 2)
  })
}

export function part2(input: string) {
  return sumOf(input.split('\n'), (line) => {
    console.log('hup')
    return complexity(line, 25)
  })
}

function complexity(type: string, directionalRobots: number) {
  let result = type
  for (let i = 0; i <= directionalRobots; i++) {
    result = typeToMakeRobotType(result)
  }
  return result.length * parseInt(type.replace('A', ''))
}

function typeToMakeRobotType(type: string) {
  // const splitted = type.split('A')
  if (cache.get(type)) {
    console.log('cache hit')
    return cache.get(type)!
  }
  const map = /\d/.test(type) ? numericKeyboard : directionalKeyboard
  let on = 'A'
  let result = ''
  for (const button of type) {
    result += buttons(on, button, map) + 'A'
    on = button
  }
  cache.set(type, result)
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
