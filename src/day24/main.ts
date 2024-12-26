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

// Edit comments in function step by step to get swaps needed
export function part2(input: string) {
  const { wires, gates } = gatesAndWires(input)

  // console.log(`check out ${wrongAtZ(wires, gates)}`) // z10 - then checkout x09, x10, y09, and y10
  // console.log(
  //   new Set([
  //     ...affects('x09', gates, 3),
  //     ...affects('y09', gates, 3),
  //     ...affects('x10', gates, 3),
  //     ...affects('y10', gates, 3),
  //   ])
  // ) // "qrc", "bnj", "dkr", "kmb", "z10", "tgq", "psh", "z09", "kks", "vrn", "z11", "ctd", "ptc"
  // const swaps1 = permute(["qrc", "bnj", "dkr", "kmb", "z10", "tgq", "psh", "z09", "kks", "vrn", "z11", "ctd", "ptc"], 2)
  // const bestSwap = maxBy(swaps1, ([a,b]) => {
  //   const copyGates = structuredClone(gates)
  //   swap(copyGates, a, b)
  //   return wrongAtZ(wires, copyGates)
  // })
  // console.log(bestSwap) // [ "kmb", "z10" ]

  swap(gates, 'kmb', 'z10')

  // console.log(`check out ${wrongAtZ(wires, gates)}`) // z15 - then checkout x14, x15, y14, and y15
  // console.log(
  //   new Set([
  //     ...affects('x14', gates, 3),
  //     ...affects('y14', gates, 3),
  //     ...affects('x15', gates, 3),
  //     ...affects('y15', gates, 3),
  //   ]),
  // ) // "dcr", "ttt", "qts", "jkh", "tvp", "z15", "hng", "z16", "sjm", "z14", "kvg", "fsh", "qqc"
  // const swaps2 = permute(["dcr", "ttt", "qts", "jkh", "tvp", "z15", "hng", "z16", "sjm", "z14", "kvg", "fsh", "qqc"], 2)
  // const bestSwap = maxBy(swaps2, ([a, b]) => {
  //   const copyGates = structuredClone(gates)
  //   swap(copyGates, a, b)
  //   return wrongAtZ(wires, copyGates)
  // })
  // console.log(bestSwap) // [ "tvp", "z15" ]

  swap(gates, 'tvp', 'z15')

  // console.log(`check out ${wrongAtZ(wires, gates)}`) // z25 - then checkout x24, x25, y24, and y25
  // console.log(
  //   new Set([
  //     ...affects('x24', gates, 3),
  //     ...affects('y24', gates, 3),
  //     ...affects('x25', gates, 3),
  //     ...affects('y25', gates, 3),
  //   ]),
  // ) //   "mrd", "gbv", "z24", "qnc", "dgv", "gcj", "dpg", "hpr", "z25", "bpw", "mvj", "z26"
  // const swaps3 = permute(["mrd", "gbv", "z24", "qnc", "dgv", "gcj", "dpg", "hpr", "z25", "bpw", "mvj", "z26"], 2)
  // const bestSwap = maxBy(swaps3, ([a, b]) => {
  //   const copyGates = structuredClone(gates)
  //   swap(copyGates, a, b)
  //   return wrongAtZ(wires, copyGates)
  // })
  // console.log(bestSwap) // [ "dpg", "z25" ]

  swap(gates, 'dpg', 'z25')

  // console.log(`check out ${wrongAtZ(wires, gates)}`) // z35 - then checkout x34, x35, y34, and y35
  // console.log(
  //   new Set([
  //     ...affects('x34', gates, 3),
  //     ...affects('y34', gates, 3),
  //     ...affects('x35', gates, 3),
  //     ...affects('y35', gates, 3),
  //   ]),
  // ) // "gbs", "sjd", "tsw", "z35", "qhw", "bsj", "z34", "nvt", "vdk", "mmf", "mtm", "z36", "vgt"
  // const swaps4 = permute(["gbs", "sjd", "tsw", "z35", "qhw", "bsj", "z34", "nvt", "vdk", "mmf", "mtm", "z36", "vgt"], 2)
  // const bestSwap = maxBy(swaps4, ([a, b]) => {
  //   const copyGates = structuredClone(gates)
  //   swap(copyGates, a, b)
  //   return wrongAtZ(wires, copyGates)
  // })
  // console.log(bestSwap) // [ "vdk", "mmf" ]

  swap(gates, 'vdk', 'mmf')

  solve(wires, gates)
  const shouldBeAnswer = (getDecimal(wires, 'x') + getDecimal(wires, 'y')).toString(2).padStart(45, '0')
  const answer = getDecimal(wires, 'z').toString(2).padStart(45, '0')
  if (shouldBeAnswer === answer) {
    return ['kmb', 'z10', 'tvp', 'z15', 'dpg', 'z25', 'vdk', 'mmf'].sort().join()
  }
  throw new Error('not solved')
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
