import { sumOf } from '@std/collections'

type Machine = {
  buttonA: {
    x: number
    y: number
  }
  buttonB: {
    x: number
    y: number
  }
  prize: {
    x: number
    y: number
  }
}

if (import.meta.main) {
  const input = await Deno.readTextFile('./inputs/day13.txt')
  console.log('Answer part 1 =', part1(input))
  console.log('Answer part 2 =', part2(input))
}

export function part1(input: string) {
  const machines = input.split('\n\n').map((machineInput) => machineData(machineInput))
  return sumOf(machines, spentTokens)
}

export function part2(input: string) {
  const machines = input.split('\n\n').map((machineInput) => machineData(machineInput, 10000000000000))
  return sumOf(machines, spentTokens)
}

function spentTokens(machine: Machine) {
  const result = intersect2Lines(
    machine.buttonA.x,
    machine.buttonB.x,
    machine.prize.x,
    machine.buttonA.y,
    machine.buttonB.y,
    machine.prize.y,
  )
  if (result) {
    return result.a * 3 + result.b
  }
  return 0
}

function machineData(input: string, addedPrize = 0): Machine {
  const [buttonA, buttonB] = [...input.matchAll(/X\+(?<x>\d+),\sY\+(?<y>\d+)/g)].map((match) => ({
    x: parseInt(match.groups!.x),
    y: parseInt(match.groups!.y),
  }))
  const [prize] = [...input.matchAll(/X=(?<x>\d+),\sY=(?<y>\d+)/g)].map((match) => ({
    x: parseInt(match.groups!.x) + addedPrize,
    y: parseInt(match.groups!.y) + addedPrize,
  }))
  return {
    buttonA,
    buttonB,
    prize,
  }
}

/* Inspired by https://stackoverflow.com/a/57898175 */
function intersect2Lines(aX: number, bX: number, x: number, aY: number, bY: number, y: number) {
  const determinant = aX * bY - bX * aY
  if (determinant != 0) {
    const a = (x * bY - bX * y) / determinant
    const b = (aX * y - x * aY) / determinant
    if (Number.isInteger(a) && Number.isInteger(b)) {
      return { a, b }
    }
  }
}
