import { count } from '../common/list.ts'

// TODO - refactor

export function part1(input: string) {
  const blocks = convert(input)
  while (blocks.indexOf('.') < blocks.findLastIndex((block) => block !== '.')) {
    moveBlock(blocks)
  }
  return checksum(blocks)
}

export function part2(input: string) {
  const blocks = convert(input)
  moveWholeBlocks(blocks)
  // while(true) {
  //   const compare = blocks.join('')
  //   moveWholeBlocks(blocks)
  //   console.log(blocks.join(''))
  //   if(blocks.join('') === compare) {
  //     break
  //   }
  // }
  return checksum(blocks)
}

function convert(input: string) {
  const blocks = []
  for (let i = 0; i < input.length; i++) {
    const number = parseInt(input[i])
    if (i % 2 === 0) {
      const id = Math.floor(i / 2).toString()
      for (let j = 0; j < number; j++) {
        blocks.push(id)
      }
    } else {
      blocks.push(...'.'.repeat(number))
    }
  }
  return blocks
}

function moveBlock(blocks: string[]) {
  const moveFileIndex = blocks.findLastIndex((block) => block !== '.')
  const moveSpaceIndex = blocks.indexOf('.')
  ;[blocks[moveFileIndex], blocks[moveSpaceIndex]] = [blocks[moveSpaceIndex], blocks[moveFileIndex]]
}

function moveWholeBlocks(blocks: string[]) {
  const spaces: { from: number; size: number }[] = []
  let found: number | null = null
  for (let i = 0; i < blocks.length; i++) {
    if (blocks[i] === '.') {
      if (found === null) {
        found = i
      }
    } else {
      if (found !== null) {
        spaces.push({ from: found, size: i - found })
        found = null
      }
    }
  }

  for (let i = blocks.length - 1; i >= 0; i--) {
    if (blocks[i] !== '.') {
      const move = blocks[i]
      const size = count(blocks, (b) => b === move)
      const movingToSpace = spaces.find((space) => space.from < i && space.size >= size)
      if (movingToSpace) {
        for (let k = 0; k < blocks.length; k++) {
          if (blocks[k] === move) {
            blocks[k] = '.'
          }
        }
        for (let j = 0; j < size; j++) {
          blocks[movingToSpace.from + j] = move
        }
        movingToSpace.from += size
        movingToSpace.size -= size
      }
    }
  }
}

function checksum(blocks: string[]) {
  let sum = 0
  for (let i = 0; i < blocks.length; i++) {
    if (blocks[i] !== '.') {
      sum += parseInt(blocks[i]) * i
    }
  }
  return sum
}

if (import.meta.main) {
  const input = await Deno.readTextFile('./inputs/day9.txt')
  console.log('Answer part 1 =', part1(input)) // not 90994085674
  console.log('Answer part 2 =', part2(input))
}
