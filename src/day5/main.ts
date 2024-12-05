import { sumOf } from '@std/collections'

export function part1(input: string) {
  const { rules, updates } = getRulesAndUpdates(input)
  const validUpdates = updates.filter((update) => updateIsValid(update, rules))
  return sumOf(validUpdates, (update) => update[Math.floor(update.length / 2)])
}

export function part2(input: string) {
  const { rules, updates } = getRulesAndUpdates(input)
  const invalidUpdates = updates.filter((update) => !updateIsValid(update, rules))
  return sumOf(invalidUpdates, (update) => {
    const inOrder = update.toSorted((a, b) => {
      if (rules.some((r) => r.a === a && r.b === b)) return -1
      if (rules.some((r) => r.a === b && r.b === a)) return 1
      return 0
    })
    return inOrder[Math.floor(inOrder.length / 2)]
  })
}

function getRulesAndUpdates(input: string) {
  const [rulesInput, updatesInput] = input.split('\n\n')
  const rules = rulesInput.split('\n').map((line) => {
    const [a, b] = line.split('|').map(Number)
    return { a, b }
  })
  const updates = updatesInput.split('\n').map((line) => line.split(',').map(Number))
  return { rules, updates }
}

function updateIsValid(update: number[], rules: { a: number; b: number }[]) {
  return update.every((n, i) => {
    return !rules.some((r) => r.b === n && update.slice(i + 1).includes(r.a))
  })
}

if (import.meta.main) {
  const input = await Deno.readTextFile('./inputs/day5.txt')
  console.log('Answer part 1 =', part1(input))
  console.log('Answer part 2 =', part2(input))
}
