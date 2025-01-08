export function dateToNumber(
  dateAsAny: string | number = new Date().toISOString().slice(0, 10),
  daysBeforeOrLater: number | undefined = 0,
): number {
  if (typeof dateAsAny === 'string') {
    dateAsAny = Date.parse(dateAsAny) || Date.now()
  }
  const ms = dateAsAny + daysBeforeOrLater * 1000 * 60 * 60 * 24
  return ms
}
