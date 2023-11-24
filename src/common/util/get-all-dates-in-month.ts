export function getAllDatesInMonth(year: number, month: number) {
  return Array.from(
    { length: new Date(year, month, 0).getDate() },
    (_, i) => new Date(year, month - 1, i + 1),
  )
}
