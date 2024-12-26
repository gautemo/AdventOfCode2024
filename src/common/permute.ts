export function permute<T>(array: T[], maxLength: number): T[][] {
  const result: T[][] = []
  if (maxLength === 0) return result
  for (let i = 0; i < array.length; i++) {
    const permutations = permute(array.toSpliced(i, 1), maxLength - 1)
    if (permutations.length === 0) {
      result.push([array[i]])
    } else {
      for (const perm of permutations) {
        result.push([array[i], ...perm])
      }
    }
  }
  return result
}
