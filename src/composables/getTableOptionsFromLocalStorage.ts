export function getTableOptionsFromLocalStorage(tableId: string) {
  const lastSaved = localStorage.getItem(tableId)
  if (!lastSaved) {
    console.error('There are no table options in localStorage!')
    return null
  }
  return JSON.parse(lastSaved)
}
