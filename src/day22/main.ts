if (import.meta.main) {
  const input = await Deno.readTextFile('./inputs/day22.txt')
  console.log('Answer part 1 =', part1(input))
  console.log('Answer part 2 =', part2(input))
}

export function part1(input: string) {
  const buyersSecretNumbers = input.split('\n').map(BigInt)
  let sum = 0n
  for (let secretNumber of buyersSecretNumbers) {
    for (let i = 0; i < 2000; i++) {
      secretNumber = pseudoRandom(secretNumber)
    }
    sum += secretNumber
  }
  return sum
}

// 1 day runtime
export function part2(input: string) {
  const buyersSecretNumbers = input.split('\n').map(BigInt)
  const buyersOffers = buyersSecretNumbers.map((secretNumber) => {
    const offers = [getOffer(secretNumber)]
    for (let i = 0; i < 2000; i++) {
      secretNumber = pseudoRandom(secretNumber)
      offers.push(getOffer(secretNumber))
    }
    return offers
  })

  const sequences: number[][] = []
  for (const offers of buyersOffers) {
    for (let i = 4; i < offers.length; i++) {
      const sequence = [
        offers[i - 3] - offers[i - 4],
        offers[i - 2] - offers[i - 3],
        offers[i - 1] - offers[i - 2],
        offers[i] - offers[i - 1],
      ]
      if (!sequences.some((s) => s.toString() === sequence.toString())) {
        sequences.push(sequence)
      }
    }
  }

  let max = 0
  for (const sequence of sequences) {
    let bananas = 0
    for (const offers of buyersOffers) {
      for (let i = 4; i < offers.length; i++) {
        const buyerSequence = [
          offers[i - 3] - offers[i - 4],
          offers[i - 2] - offers[i - 3],
          offers[i - 1] - offers[i - 2],
          offers[i] - offers[i - 1],
        ]
        if (sequence.toString() === buyerSequence.toString()) {
          bananas += offers[i]
          break
        }
      }
    }
    max = Math.max(max, bananas)
  }
  return max
}

function getOffer(secretNumber: bigint) {
  return parseInt(secretNumber.toString().at(-1)!)
}

function pseudoRandom(secretNumber: bigint) {
  // multiply by 64
  let result = secretNumber * 64n
  // mix
  secretNumber = result ^ secretNumber
  // prune
  secretNumber = secretNumber % 16777216n
  // divide by 32
  result = secretNumber / 32n
  // mix
  secretNumber = result ^ secretNumber
  // prune
  secretNumber = secretNumber % 16777216n
  // multiply by 2048
  result = secretNumber * 2048n
  // mix
  secretNumber = result ^ secretNumber
  // prune
  secretNumber = secretNumber % 16777216n
  return secretNumber
}
