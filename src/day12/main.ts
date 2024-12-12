import { distinctBy, sumOf } from '@std/collections'
import { isNeighbour, Point } from '../common/point.ts'
import { count } from '../common/list.ts'

type Region = { plant: string; points: Point[] }

if (import.meta.main) {
  const input = await Deno.readTextFile('./inputs/day12.txt')
  console.log('Answer part 1 =', part1(input))
  console.log('Answer part 2 =', part2(input))
}

export function part1(input: string) {
  const regions = findRegions(input)
  return sumOf(regions, (region) => {
    const perimeter = sumOf(region.points, (point) => {
      return 4 - count(region.points, (other) => isNeighbour(point, other))
    })
    return region.points.length * perimeter
  })
}

export function part2(input: string) {
  const regions = findRegions(input)
  return sumOf(regions, (region) => {
    const fences = countHorizontalSides(region, 1) + countHorizontalSides(region, -1) + countVerticalSides(region, 1) +
      countVerticalSides(region, -1)
    return region.points.length * fences
  })
}

function findRegions(input: string) {
  const regions: Region[] = []

  const lines = input.split('\n')
  for (let y = 0; y < lines.length; y++) {
    const line = lines[y]
    for (let x = 0; x < line.length; x++) {
      if (regions.some((region) => region.points.some((point) => point.x === x && point.y === y))) {
        continue
      }
      const region = { plant: line[x], points: [{ x, y }] }
      while (true) {
        const neightbours = distinctBy(
          region.points.flatMap((point) => {
            return [
              { x: point.x - 1, y: point.y },
              { x: point.x + 1, y: point.y },
              { x: point.x, y: point.y - 1 },
              { x: point.x, y: point.y + 1 },
            ].filter(
              (p) =>
                lines[p.y]?.[p.x] === region.plant &&
                !region.points.some((other) => other.x === p.x && other.y === p.y),
            )
          }),
          (p) => `${p.x},${p.y}`,
        )
        if (neightbours.length === 0) break
        region.points.push(...neightbours)
      }
      regions.push(region)
    }
  }

  return regions
}

function countHorizontalSides(region: Region, direction: 1 | -1) {
  let count = 0
  const maxX = Math.max(...region.points.map((p) => p.x))
  const maxY = Math.max(...region.points.map((p) => p.y))
  for (let y = 0; y < maxY + 1; y++) {
    let fenceStarted = false
    for (let x = 0; x < maxX + 1; x++) {
      if (
        region.points.some((p) => p.x === x && p.y === y) &&
        !region.points.some((p) => p.x === x && p.y === y + direction)
      ) {
        if (!fenceStarted) {
          fenceStarted = true
          count++
        }
      } else {
        fenceStarted = false
      }
    }
  }
  return count
}

function countVerticalSides(region: Region, direction: 1 | -1) {
  let count = 0
  const maxX = Math.max(...region.points.map((p) => p.x))
  const maxY = Math.max(...region.points.map((p) => p.y))
  for (let x = 0; x < maxX + 1; x++) {
    let fenceStarted = false
    for (let y = 0; y < maxY + 1; y++) {
      if (
        region.points.some((p) => p.x === x && p.y === y) &&
        !region.points.some((p) => p.x === x + direction && p.y === y)
      ) {
        if (!fenceStarted) {
          fenceStarted = true
          count++
        }
      } else {
        fenceStarted = false
      }
    }
  }
  return count
}
