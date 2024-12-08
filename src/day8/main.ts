import { distinctBy } from '@std/collections'

type Antenna = { symbol: string; x: number; y: number } & Point
type Point = { x: number; y: number }

export function part1(input: string) {
  return findAllAntiNodes(input, false)
}

export function part2(input: string) {
  return findAllAntiNodes(input, true)
}

function findAllAntiNodes(input: string, effectsOfResonantHarmonics: boolean) {
  const height = input.split('\n').length
  const width = input.split('\n')[0].length
  const antennas = findAntennas(input, width)
  const antiNodes: Point[] = []
  for (const antenna of antennas) {
    const sameFrequency = antennas.filter((a) => antenna.symbol === a.symbol && antenna.x !== a.x && antenna.y !== a.y)
    const antiNodesForAntenna = sameFrequency
      .flatMap((otherAntenna) => {
        if (effectsOfResonantHarmonics) {
          return findLineAntiNodes(antenna, otherAntenna, width, height)
        }
        return findAntiNodes(antenna, otherAntenna)
      })
      .filter((p) => isInMap(p, width, height))
    antiNodes.push(...antiNodesForAntenna)
  }
  return distinctBy(antiNodes, (a) => `${a.x},${a.y}`).length
}

function findAntennas(input: string, width: number): Antenna[] {
  return [...input]
    .map((char, i) => {
      if (char !== '.' && char !== '\n') {
        return { symbol: input[i], x: i % (width + 1), y: Math.floor(i / (width + 1)) }
      }
    })
    .filter((a) => !!a)
}

function findAntiNodes(a: Point, b: Point) {
  const diffX = b.x - a.x
  const diffY = b.y - a.y
  return [
    { x: a.x - diffX, y: a.y - diffY },
    { x: b.x + diffX, y: b.y + diffY },
  ]
}

function findLineAntiNodes(a: Point, b: Point, maxX: number, maxY: number) {
  const points = [a, b]
  let continueDirection1 = false
  do {
    const direction1 = findAntiNodes(points[0], points[1])[0]
    continueDirection1 = isInMap(direction1, maxX, maxY)
    if (continueDirection1) {
      points.splice(0, 0, direction1)
    }
  } while (continueDirection1)
  let continueDirection2 = false
  do {
    const direction2 = findAntiNodes(points.at(-2)!, points.at(-1)!)[1]
    continueDirection2 = isInMap(direction2, maxX, maxY)
    if (continueDirection2) {
      points.push(direction2)
    }
  } while (continueDirection2)
  return points
}

function isInMap(point: Point, maxX: number, maxY: number) {
  return point.x >= 0 && point.x < maxX && point.y >= 0 && point.y < maxY
}

if (import.meta.main) {
  const input = await Deno.readTextFile('./inputs/day8.txt')
  console.log('Answer part 1 =', part1(input)) // ikke 32300
  console.log('Answer part 2 =', part2(input))
}
