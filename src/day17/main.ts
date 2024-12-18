// deno-lint-ignore-file no-inner-declarations
if (import.meta.main) {
  const input = await Deno.readTextFile('./inputs/day17.txt')
  console.log('Answer part 1 =', part1(input))
  console.log('Answer part 2 =', part2(input))
}

export function part1(input: string) {
  const a = BigInt(input.match(/Register A: (\d+)/)![1])
  const b = BigInt(input.match(/Register B: (\d+)/)![1])
  const c = BigInt(input.match(/Register C: (\d+)/)![1])
  const program = input
    .match(/Program: ((\d,?)+)/)![1]
    .split(',')
    .map(Number)
  return runProgram(a, b, c, program)?.toString()
}

// found out length of output depends on A. 16 is around 35_184_372_000_000 - 281_474_980_000_000
// found out ending of output changes the least, ending with my last 5 outputs around 47_906_072_000_000 - 47_914_572_000_000
// Finishes in 1 hour ish
export function part2(input: string) {
  const b = BigInt(input.match(/Register B: (\d+)/)![1])
  const c = BigInt(input.match(/Register C: (\d+)/)![1])
  const program = input
    .match(/Program: ((\d,?)+)/)![1]
    .split(',')
    .map(Number)
  for (let i = 47_906_072_000_000; i < 47_914_572_000_000; i++) {
    if (runProgram(BigInt(i), b, c, program, true)?.toString() === program.toString()) {
      return i
    }
  }
  return -1
}

function runProgram(a: bigint, b: bigint, c: bigint, program: number[], onlyAllowProgramOutput = false) {
  let instructionPointer = 0
  const output: number[] = []
  while (instructionPointer < program.length) {
    const opcode = program[instructionPointer]
    const operand = program[instructionPointer + 1]

    function comboOperand() {
      switch (operand) {
        case 4:
          return a
        case 5:
          return b
        case 6:
          return c
        case 7:
          throw new Error('not valid program')
        default:
          return BigInt(operand)
      }
    }

    if (opcode === undefined || operand === undefined) {
      break
    }
    if (opcode === 0) {
      a = a / 2n ** comboOperand()
    }
    if (opcode === 1) {
      b = b ^ BigInt(operand)
    }
    if (opcode === 2) {
      b = comboOperand() % 8n
    }
    if (opcode === 3 && a !== 0n) {
      instructionPointer = operand
      continue
    }
    if (opcode === 4) {
      b = b ^ c
    }
    if (opcode === 5) {
      output.push(Number(comboOperand() % 8n))
      if (onlyAllowProgramOutput && !program.toString().startsWith(output.toString())) {
        return null
      }
    }
    if (opcode === 6) {
      b = a / 2n ** comboOperand()
    }
    if (opcode === 7) {
      c = a / 2n ** comboOperand()
    }
    instructionPointer += 2
  }
  return output
}
