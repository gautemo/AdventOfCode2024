import { count } from '../common/list.ts'
import { Point } from '../common/point.ts'

type Robot = { vx: number; vy: number } & Point

if (import.meta.main) {
  const input = await Deno.readTextFile('./inputs/day14.txt')
  console.log('Answer part 1 =', part1(input))
  console.log('Answer part 2 =', part2(input))
}

export function part1(input: string, width = 101, height = 103) {
  const robots = findRobots(input)
  for (let i = 0; i < 100; i++) {
    moveRobots(robots, width, height)
  }
  const upperLeft = count(robots, (robot) => robot.x < Math.floor(width / 2) && robot.y < Math.floor(height / 2))
  const upperRight = count(robots, (robot) => robot.x > Math.floor(width / 2) && robot.y < Math.floor(height / 2))
  const downLeft = count(robots, (robot) => robot.x < Math.floor(width / 2) && robot.y > Math.floor(height / 2))
  const downRight = count(robots, (robot) => robot.x > Math.floor(width / 2) && robot.y > Math.floor(height / 2))
  return upperLeft * upperRight * downLeft * downRight
}

export function part2(input: string) {
  const width = 101
  const height = 103
  const robots = findRobots(input)
  for (let i = 1; i < 10000; i++) {
    moveRobots(robots, width, height)
    printRobots(robots, i, width, height)
  }
}

function findRobots(input: string): Robot[] {
  return input.split('\n').map((line) => {
    const [x, y, vx, vy] = [...line.matchAll(/-?\d+/g)].map((match) => parseInt(match[0]))
    return { x, y, vx, vy }
  })
}

function moveRobots(robots: Robot[], width: number, height: number) {
  for (const robot of robots) {
    robot.x = (robot.x + robot.vx) % width
    robot.y = (robot.y + robot.vy) % height
    if (robot.x < 0) {
      robot.x = width + robot.x
    }
    if (robot.y < 0) {
      robot.y = height + robot.y
    }
  }
}

function printRobots(robots: Robot[], second: number, width: number, height: number) {
  let content = `second ${second}:\n`
  for (let y = 0; y < height; y++) {
    let line = ''
    for (let x = 0; x < width; x++) {
      line += robots.some((r) => r.x === x && r.y === y) ? '#' : ' '
    }
    content += line + '\n'
  }
  content += '\n'
  Deno.writeTextFileSync('result.txt', content, { append: true })
}
