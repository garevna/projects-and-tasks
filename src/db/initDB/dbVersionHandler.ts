export const dbVersionHandler = (function () {
  let version = 1
  return function (value?: number) {
    if (value) {
      version = value
    } else return version
  }
})()
