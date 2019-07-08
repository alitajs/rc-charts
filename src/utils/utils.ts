export function isArray(value: any): value is any[] {
  return Array.isArray(value)
}

export function sum(...numbers: Array<number | number[]>) {
  return numbers.reduce<number>(
    (total, number) => {
      total += isArray(number) ? sum(...number) : number;
      return total
    },
    0,
  )
}
