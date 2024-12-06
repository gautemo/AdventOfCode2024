type Guard = { x: number; y: number; direction: 'north' | 'east' | 'south' | 'west' }

export function part1(input: string) {
  const map = new Map(input)
  while (map.move()) {
    // guard moves
  }
  return map.trail.length
}

export function part2(input: string) {
  const map = new Map(input)
  while (map.move()) {
    // guard moves
  }
  let count = 0
  for (const point of map.trail) {
    const insertAt = (input.split('\n')[0].length + 1) * point.y + point.x
    if (input[insertAt] !== '^') {
      const alternative = new Map(input.substring(0, insertAt) + '#' + input.substring(insertAt + 1))
      const history: string[] = []
      while (alternative.move()) {
        const state = `${alternative.guard.x},${alternative.guard.y},${alternative.guard.direction}`
        if (history.includes(state)) {
          count++
          break
        }
        history.push(state)
      }
    }
  }
  return count
}

class Map {
  private positions: string[][]
  guard: Guard
  trail: { x: number; y: number }[] = []

  constructor(input: string) {
    this.positions = input.split('\n').map((line) => [...line])
    const startY = this.positions.findIndex((line) => line.includes('^'))
    this.guard = { x: this.positions[startY].indexOf('^'), y: startY, direction: 'north' }
  }

  move() {
    if (!this.trail.some(({ x, y }) => x === this.guard.x && y === this.guard.y)) {
      this.trail.push({ x: this.guard.x, y: this.guard.y })
    }
    const next = this.nextSpot()
    const spot = this.positions[next.y]?.[next.x]
    if (!spot) return false
    if (spot === '#') {
      this.turn()
      return true
    }
    this.guard.x = next.x
    this.guard.y = next.y
    return true
  }

  private turn() {
    switch (this.guard.direction) {
      case 'north':
        this.guard.direction = 'east'
        break
      case 'east':
        this.guard.direction = 'south'
        break
      case 'south':
        this.guard.direction = 'west'
        break
      case 'west':
        this.guard.direction = 'north'
    }
  }

  private nextSpot() {
    switch (this.guard.direction) {
      case 'north':
        return { x: this.guard.x, y: this.guard.y - 1 }
      case 'east':
        return { x: this.guard.x + 1, y: this.guard.y }
      case 'south':
        return { x: this.guard.x, y: this.guard.y + 1 }
      case 'west':
        return { x: this.guard.x - 1, y: this.guard.y }
    }
  }
}

if (import.meta.main) {
  const input = await Deno.readTextFile('./inputs/day6.txt')
  console.log('Answer part 1 =', part1(input))
  console.log('Answer part 2 =', part2(input))
}
