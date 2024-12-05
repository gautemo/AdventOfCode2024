export function part1(input: string) {
  const grid = input.split('\n').map((line) => [...line])
  let count = 0
  for (let i = 0; i < grid.length; i++) {
    const line = grid[i]
    for (let j = 0; j < line.length; j++) {
      if (grid[i][j] + grid[i][j + 1] + grid[i][j + 2] + grid[i][j + 3] === 'XMAS') count++
      if (grid[i][j] + grid[i][j - 1] + grid[i][j - 2] + grid[i][j - 3] === 'XMAS') count++
      if (grid[i][j] + grid[i + 1]?.[j] + grid[i + 2]?.[j] + grid[i + 3]?.[j] === 'XMAS') count++
      if (grid[i][j] + grid[i - 1]?.[j] + grid[i - 2]?.[j] + grid[i - 3]?.[j] === 'XMAS') count++

      if (grid[i][j] + grid[i + 1]?.[j + 1] + grid[i + 2]?.[j + 2] + grid[i + 3]?.[j + 3] === 'XMAS') count++
      if (grid[i][j] + grid[i - 1]?.[j - 1] + grid[i - 2]?.[j - 2] + grid[i - 3]?.[j - 3] === 'XMAS') count++
      if (grid[i][j] + grid[i - 1]?.[j + 1] + grid[i - 2]?.[j + 2] + grid[i - 3]?.[j + 3] === 'XMAS') count++
      if (grid[i][j] + grid[i + 1]?.[j - 1] + grid[i + 2]?.[j - 2] + grid[i + 3]?.[j - 3] === 'XMAS') count++
    }
  }
  return count
}

export function part2(input: string) {
  const grid = input.split('\n').map((line) => [...line])
  let count = 0
  for (let i = 0; i < grid.length; i++) {
    const line = grid[i]
    for (let j = 0; j < line.length; j++) {
      if (grid[i][j] === 'A') {
        const d1 = [grid[i + 1]?.[j + 1], grid[i - 1]?.[j - 1]]
        const d2 = [grid[i + 1]?.[j - 1], grid[i - 1]?.[j + 1]]
        if (d1.includes('M') && d1.includes('S') && d2.includes('M') && d2.includes('S')) {
          count++
        }
      }
    }
  }
  return count
}

if (import.meta.main) {
  const input = await Deno.readTextFile('./inputs/day4.txt')
  console.log('Answer part 1 =', part1(input))
  console.log('Answer part 2 =', part2(input))
}
