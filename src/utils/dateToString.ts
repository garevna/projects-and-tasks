export function dateToString(
  now: string | number = Date.now(),
  daysBeforeOrLater: number | undefined = 0,
): string {
  if (typeof now === 'string') {
    now = Date.parse(now) || Date.now()
  }
  const ms = now + daysBeforeOrLater * 1000 * 60 * 60 * 24
  return new Date(ms).toISOString().slice(0, 10)
}
