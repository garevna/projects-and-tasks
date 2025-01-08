let mode: 'local' | 'server' = 'local'

export function modeHandler(val?: 'local' | 'server' | undefined | null) {
  if (!val) {
    return mode
  } else {
    mode = val
  }
}
