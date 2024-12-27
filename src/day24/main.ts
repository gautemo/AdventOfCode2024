// deno-lint-ignore-file no-unused-vars
import { maxBy, slidingWindows } from '@std/collections'
import { permute } from '../common/permute.ts'

type Operation = 'AND' | 'OR' | 'XOR'
type Gate = { a: string; b: string; operation: Operation; output: string }

const random = (max: number) => Math.floor(Math.random() * max)

if (import.meta.main) {
  const input = await Deno.readTextFile('./inputs/day24.txt')
  console.log('Answer part 1 =', part1(input))
  console.log('Answer part 2 =', part2(input))
}

export function part1(input: string) {
  const { wires, gates } = gatesAndWires(input)
  solve(wires, gates)
  return getDecimal(wires, 'z')
}

export function part2(input: string) {
  const { wires, gates } = gatesAndWires(input)

  const swap1 = getBestSwap(wires, gates)
  swap(gates, swap1[0], swap1[1])
  const swap2 = getBestSwap(wires, gates)
  swap(gates, swap2[0], swap2[1])
  const swap3 = getBestSwap(wires, gates)
  swap(gates, swap3[0], swap3[1])
  const swap4 = getBestSwap(wires, gates)
  swap(gates, swap4[0], swap4[1])

  solve(wires, gates)
  const shouldBeAnswer = (getDecimal(wires, 'x') + getDecimal(wires, 'y')).toString(2).padStart(45, '0')
  const answer = getDecimal(wires, 'z').toString(2).padStart(45, '0')
  if (shouldBeAnswer === answer) {
    return [...swap1, ...swap2, ...swap3, ...swap4].sort().join()
  }
  throw new Error('not solved')
}

function getBestSwap(wires: Map<string, number | null>, gates: Gate[]) {
  const zIndex = wrongAtZ(wires, gates)
  const possibleOutputs = new Set([
    ...affects(`x${(zIndex - 1).toString().padStart(2, '0')}`, gates, 3),
    ...affects(`y${(zIndex - 1).toString().padStart(2, '0')}`, gates, 3),
    ...affects(`x${zIndex.toString().padStart(2, '0')}`, gates, 3),
    ...affects(`y${zIndex.toString().padStart(2, '0')}`, gates, 3),
  ])
  const swaps = permute([...possibleOutputs], 2)
  return maxBy(swaps, ([a, b]) => {
    const copyGates = structuredClone(gates)
    swap(copyGates, a, b)
    return wrongAtZ(wires, copyGates)
  })!
}

function wrongAtZ(wires: Map<string, number | null>, gates: Gate[]) {
  try {
    return Math.min(
      wrongAtWithRandomXY(new Map(wires), structuredClone(gates)),
      wrongAtWithRandomXY(new Map(wires), structuredClone(gates)),
      wrongAtWithRandomXY(new Map(wires), structuredClone(gates)),
      wrongAtWithRandomXY(new Map(wires), structuredClone(gates)),
      wrongAtWithRandomXY(new Map(wires), structuredClone(gates)),
      wrongAtWithRandomXY(new Map(wires), structuredClone(gates)),
      wrongAtWithRandomXY(new Map(wires), structuredClone(gates)),
      wrongAtWithRandomXY(new Map(wires), structuredClone(gates)),
      wrongAtWithRandomXY(new Map(wires), structuredClone(gates)),
      wrongAtWithRandomXY(new Map(wires), structuredClone(gates)),
      wrongAtWithRandomXY(new Map(wires), structuredClone(gates)),
      wrongAtWithRandomXY(new Map(wires), structuredClone(gates)),
      wrongAtWithRandomXY(new Map(wires), structuredClone(gates)),
      wrongAtWithRandomXY(new Map(wires), structuredClone(gates)),
      wrongAtWithRandomXY(new Map(wires), structuredClone(gates)),
      wrongAtWithRandomXY(new Map(wires), structuredClone(gates)),
      wrongAtWithRandomXY(new Map(wires), structuredClone(gates)),
    )
  } catch {
    return -1
  }
}

function wrongAtWithRandomXY(wires: Map<string, number | null>, gates: Gate[]) {
  const randomX = random(35184372088831).toString(2) // max 45 binary number
  const randomY = random(35184372088831).toString(2)
  for (let i = 0; i <= 44; i++) {
    wires.set(`x${i > 9 ? i : `0${i}`}`, randomX[i] ? parseInt(randomX[i]) : 0)
    wires.set(`y${i > 9 ? i : `0${i}`}`, randomY[i] ? parseInt(randomY[i]) : 0)
  }
  solve(wires, gates)
  const shouldBeAnswer = (getDecimal(wires, 'x') + getDecimal(wires, 'y')).toString(2).padStart(45, '0')
  const wrongAnswer = getDecimal(wires, 'z').toString(2).padStart(45, '0')
  for (let i = 45; i > 0; i--) {
    if (shouldBeAnswer[i] !== wrongAnswer[i]) {
      return 45 - i
    }
  }
  return 45
}

function affects(wire: string, gates: Gate[], depths: number): string[] {
  const pointsAt = gates.filter((g) => g.a === wire || g.b === wire).map((g) => g.output)
  if (depths === 0) return pointsAt
  return [...pointsAt, ...pointsAt.flatMap((p) => affects(p, gates, depths - 1))]
}

function swap(gates: Gate[], a: string, b: string) {
  const gateOutputA = gates.find((g) => g.output === a)!
  const gateOutputB = gates.find((g) => g.output === b)!
  gateOutputA.output = b
  gateOutputB.output = a
}

function solve(wires: Map<string, number | null>, gates: Gate[]) {
  while (!isSolved(wires)) {
    let changes = false
    for (const gate of gates) {
      const a = wires.get(gate.a)!
      const b = wires.get(gate.b)!
      if (a !== null && b !== null && wires.get(gate.output) === null) {
        wires.set(gate.output, getOutput(a, b, gate.operation))
        changes = true
      }
    }
    if (!changes) throw new Error('unsolvable')
  }
}

function getDecimal(wires: Map<string, number | null>, letter: 'z' | 'x' | 'y') {
  const values = [...wires.entries()]
    .filter(([name]) => name.startsWith(letter))
    .sort(([a], [b]) => b.localeCompare(a))
    .map(([_, value]) => value!.toString())
    .join('')
  return parseInt(values, 2)
}

function gatesAndWires(input: string) {
  const wires = new Map<string, number | null>()
  const gates: Gate[] = []
  const [wireInput, gateInput] = input.split('\n\n')

  for (const line of wireInput.split('\n')) {
    const [name, value] = line.split(': ')
    wires.set(name, parseInt(value))
  }

  for (const line of gateInput.split('\n')) {
    const [a, operation, b, _, output] = line.split(' ')
    if (!wires.has(a)) {
      wires.set(a, null)
    }
    if (!wires.has(b)) {
      wires.set(b, null)
    }
    if (!wires.has(output)) {
      wires.set(output, null)
    }
    gates.push({ a, b, operation: operation as Operation, output })
  }
  return { wires, gates }
}

function isSolved(wires: Map<string, number | null>) {
  return wires.values().every((value) => value !== null)
}

function getOutput(a: number, b: number, operation: Operation) {
  if (operation === 'AND') return a & b
  if (operation === 'OR') return a | b
  return a ^ b
}
