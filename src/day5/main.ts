import { sumOf } from '@std/collections'
// TODO clean up code later

export function part1(input: string) {
  const { rules, updates } = getRulesAndUpdates(input)
  const validUpdates = updates.filter(update => {
    return update.every((n, i) => {
      const after = update.slice(i + 1)
      return !rules.some(r => {
        return after.some(b => {
          return r.b === n && r.a === b
        })
      })
    })
  })
  return sumOf(validUpdates, update => update[Math.floor(update.length / 2)])
}

export function part2(input: string) {
  const { rules, updates } = getRulesAndUpdates(input)
  const invalidUpdates = updates.filter(update => {
    return !update.every((n, i) => {
      const after = update.slice(i + 1)
      return !rules.some(r => {
        return after.some(b => {
          return r.b === n && r.a === b
        })
      })
    })
  })
  return sumOf(invalidUpdates, update => {
    const newOrder = [update[0]]
    for(const n of update.slice(1)) {
      let insertIndex = 0
      for(let i = 0; i < newOrder.length; i++) {
        if(rules.some(r => r.a === newOrder[i] && r.b === n)) {
          insertIndex = i + 1
        }
      }
      newOrder.splice(insertIndex, 0, n)
    }
    return newOrder[Math.floor(newOrder.length / 2)]
  })
}

function getRulesAndUpdates(input: string) {
  const [rulesInput, updatesInput] = input.split('\n\n')
  const rules = rulesInput.split('\n').map(line => {
    const numbers = line.split('|')
    return { a: parseInt(numbers[0]), b: parseInt(numbers[1]) }
  })
  const updates = updatesInput.split('\n').map(line => line.split(',').map(n => parseInt(n)))
  return { rules, updates }
}

if (import.meta.main) {
  const input = await Deno.readTextFile('./inputs/day5.txt')
  console.log('Answer part 1 =', part1(input))
  console.log('Answer part 2 =', part2(input))
}
