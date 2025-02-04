export function parseSubroute(subroute: string) {
  const [key, value] =
    subroute && subroute !== '/' ? subroute.replace('?', '').split('=') : ['', '']
  return { key, value }
}
