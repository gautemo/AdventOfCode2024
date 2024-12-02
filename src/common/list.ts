export function count<T>(list: T[], predicate: (item: T) => boolean) {
  let count = 0
  for (const item of list) {
    if (predicate(item)) count++
  }
  return count
}
