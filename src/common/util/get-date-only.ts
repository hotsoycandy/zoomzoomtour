export function getDateOnly(date: Date): Date {
  return new Date(
    `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`,
  )
}
