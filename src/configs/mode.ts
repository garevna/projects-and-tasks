let mode: 'local' | 'server' | null = null

export function modeHandler(val?: 'local' | 'server' | undefined | null) {
  if (!val) {
    return mode
  } else {
    mode = val
  }
}
