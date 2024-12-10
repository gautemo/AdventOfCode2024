import { distinctBy } from '@std/collections'

type Spot = { x: number; y: number; value: number }

export function part1(input: string) {
  const spots = getSpots(input)
  return distinctBy(getTrails(spots), (trail) => `${trail[0].x},${trail[0].y} -> ${trail[9].x},${trail[9].y}`).length
}

export function part2(input: string) {
  const spots = getSpots(input)
  return getTrails(spots).length
}

function stepPossible(from: Spot, to: Spot) {
  const diffX = Math.abs(from.x - to.x)
  const diffY = Math.abs(from.y - to.y)
  return diffX + diffY === 1 && to.value - from.value === 1
}

function getSpots(input: string) {
  const lines = input.split('\n')
  const spots: Spot[] = []
  for (let y = 0; y < lines.length; y++) {
    const line = lines[y]
    for (let x = 0; x < line.length; x++) {
      if (line[x] === '.') continue
      spots.push({ x, y, value: parseInt(line[x]) })
    }
  }
  return spots
}

function getTrails(spots: Spot[]) {
  const trails: Spot[][] = spots.filter((s) => s.value === 0).map((s) => [s])
  while (true) {
    const checkIndex = trails.findIndex((trail) => trail.length < 10)
    if (checkIndex === -1) {
      return trails
    }
    const trail = trails.splice(checkIndex, 1)[0]
    const on = trail.at(-1)!
    const nexts = spots.filter((s) => stepPossible(on, s))
    for (const next of nexts) {
      trails.push([...trail, next])
    }
  }
}

if (import.meta.main) {
  const input = await Deno.readTextFile('./inputs/day10.txt')
  console.log('Answer part 1 =', part1(input))
  console.log('Answer part 2 =', part2(input))
}
