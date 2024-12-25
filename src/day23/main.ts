import { count } from '../common/list.ts'

type Node = { name: string; to: Node[] }

if (import.meta.main) {
  const input = await Deno.readTextFile('./inputs/day23.txt')
  console.log('Answer part 1 =', part1(input))
  console.log('Answer part 2 =', part2(input))
}

export function part1(input: string) {
  const nodes = toNodes(input)
  const threes: Node[][] = []
  for (const one of nodes) {
    for (const two of one.to) {
      for (const three of two.to) {
        if (three.to.some((n) => n.name === one.name)) {
          const connected = [one, two, three]
          if (
            !threes.some((t) =>
              t.map((it) => it.name).sort().join(',') === connected.map((it) => it.name).sort().join(',')
            )
          ) {
            threes.push(connected)
          }
        }
      }
    }
  }
  return count(threes, (connected) => connected.some((n) => n.name.startsWith('t')))
}

export function part2(input: string) {
  const nodes = toNodes(input)
  let currentLargest: Node[] = []
  for (const node of nodes) {
    const largestGroup = getLargestGroup([node, ...node.to], currentLargest.length + 1)
    if (largestGroup) {
      currentLargest = largestGroup
    }
  }
  return currentLargest.map((it) => it.name).sort().join(',')
}

function getLargestGroup(nodes: Node[], minLimit: number): Node[] | null {
  if (nodes.length < minLimit) return null
  if (isValidGroup(nodes)) return nodes
  for (let i = 0; i < nodes.length; i++) {
    const largestGroup = getLargestGroup(nodes.toSpliced(i, 1), minLimit)
    if (largestGroup) return largestGroup
  }
  return null
}

function isValidGroup(nodes: Node[]) {
  return nodes.every((n1) => {
    return nodes.every((n2) => {
      return n1.name === n2.name || n2.to.some(({ name }) => name === n1.name)
    })
  })
}

function toNodes(input: string) {
  const list: Node[] = []
  for (const line of input.split('\n')) {
    const [a, b] = line.split('-')
    let nodeA = list.find((it) => it.name === a)
    let nodeB = list.find((it) => it.name === b)
    if (!nodeA) {
      nodeA = { name: a, to: [] }
      list.push(nodeA)
    }
    if (!nodeB) {
      nodeB = { name: b, to: [] }
      list.push(nodeB)
    }
    if (!nodeA.to.some((n) => n.name === b)) {
      nodeA.to.push(nodeB)
    }
    if (!nodeB.to.some((n) => n.name === a)) {
      nodeB.to.push(nodeA)
    }
  }
  return list
}
