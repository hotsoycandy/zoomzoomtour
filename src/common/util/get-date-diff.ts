export function getDateDiff(date1: Date, date2: Date): number {
  return Math.floor(
    Math.abs(date2.getTime() - date1.getTime()) / (24 * 3600 * 1000),
  )
}
