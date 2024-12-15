import { sumOf } from '@std/collections/sum-of'
import { Point } from '../common/point.ts'

type Spot = Point & { type: '@' | 'O' | '#' | '[' | ']' }

if (import.meta.main) {
  const input = await Deno.readTextFile('./inputs/day15.txt')
  console.log('Answer part 1 =', part1(input))
  console.log('Answer part 2 =', part2(input))
}

export function part1(input: string) {
  const [mapInput, moves] = input.split('\n\n')
  const map = toMap(mapInput)
  performMoves([...moves].filter((m) => m !== '\n'), map)

  return sumOf(
    map.filter((it) => it.type === 'O'),
    (box) => 100 * box.y + box.x,
  )
}

export function part2(input: string) {
  const [mapInput, moves] = input.split('\n\n')
  const map = toMap(mapInput.replaceAll('#', '##').replaceAll('O', '[]').replaceAll('.', '..').replaceAll('@', '@.'))
  performMoves([...moves].filter((m) => m !== '\n'), map)

  return sumOf(
    map.filter((it) => it.type === '['),
    (box) => 100 * box.y + box.x,
  )
}

function toMap(input: string): Spot[] {
  const map: Spot[] = []
  const lines = input.split('\n')
  for (let y = 0; y < lines.length; y++) {
    const line = lines[y]
    for (let x = 0; x < line.length; x++) {
      if (['#', 'O', '@', '[', ']'].includes(line[x])) {
        map.push({ x, y, type: line[x] as '@' | 'O' | '#' | '[' | ']' })
      }
    }
  }
  return map
}

function performMoves(moves: string[], map: Spot[]) {
  const robot = map.find((it) => it.type === '@')!

  for (const move of moves) {
    if (canMove(robot, move, map)) {
      doMove(robot, move, map)
    }
  }
}

function canMove(object: Spot, dir: string, map: Spot[], otherHalfChecked = false): boolean {
  const attempt = { x: object.x, y: object.y }
  if (dir === '<') {
    attempt.x--
  }
  if (dir === '>') {
    attempt.x++
  }
  if (dir === '^') {
    attempt.y--
  }
  if (dir === 'v') {
    attempt.y++
  }
  if ((object.type === '[' || object.type === ']') && (dir === '^' || dir === 'v') && !otherHalfChecked) {
    const side = object.type === '[' ? 1 : -1
    const otherSideOfBox = canMove(map.find((it) => it.x === object.x + side && it.y === object.y)!, dir, map, true)
    if (!otherSideOfBox) return false
  }
  const moveTo = map.find((it) => it.x === attempt.x && it.y === attempt.y)
  if (!moveTo) {
    return true
  }
  if (moveTo.type === '#') {
    return false
  }
  return canMove(moveTo, dir, map)
}

function doMove(object: Spot, dir: string, map: Spot[], otherHalfChecked = false) {
  const goTo = { x: object.x, y: object.y }
  if (dir === '<') {
    goTo.x--
  }
  if (dir === '>') {
    goTo.x++
  }
  if (dir === '^') {
    goTo.y--
  }
  if (dir === 'v') {
    goTo.y++
  }
  if ((object.type === '[' || object.type === ']') && (dir === '^' || dir === 'v') && !otherHalfChecked) {
    const side = object.type === '[' ? 1 : -1
    doMove(map.find((it) => it.x === object.x + side && it.y === object.y)!, dir, map, true)
  }
  const moveTo = map.find((it) => it.x === goTo.x && it.y === goTo.y)
  if (!moveTo) {
    object.x = goTo.x
    object.y = goTo.y
    return
  }
  if (moveTo.type === '#') {
    return
  }
  doMove(moveTo, dir, map)
  object.x = goTo.x
  object.y = goTo.y
}
