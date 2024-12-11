import { count } from '../common/list.ts'

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
  return checksum(blocks)
}

function convert(input: string) {
  const blocks: string[] = []
  for (let i = 0; i < input.length; i++) {
    const number = parseInt(input[i])
    if (i % 2 === 0) {
      const id = Math.floor(i / 2).toString()
      blocks.push(...Array(number).fill(id))
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
  const spaces = blocks.reduce<{ from: number; size: number }[]>((acc, block, i) => {
    if (block === '.') {
      if (blocks[i - 1] !== '.') {
        acc.push({ from: i, size: 1 })
      } else {
        acc.at(-1)!.size++
      }
    }
    return acc
  }, [])

  for (let i = blocks.length - 1; i >= 0; i--) {
    const block = blocks[i]
    if (block !== '.') {
      const size = count(blocks, (b) => b === block)
      const movingToSpace = spaces.find((space) => space.from < i && space.size >= size)
      if (movingToSpace) {
        for (let j = 0; j < size; j++) {
          blocks[i - j] = '.'
          blocks[movingToSpace.from + j] = block
        }
        movingToSpace.from += size
        movingToSpace.size -= size
      }
    }
  }

  return blocks
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
  console.log('Answer part 1 =', part1(input))
  console.log('Answer part 2 =', part2(input))
}
