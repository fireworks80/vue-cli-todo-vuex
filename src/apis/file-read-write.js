const fs = require('fs')

module.exports = {
  readFile(path) {
    return new Promise((res, rej) => {
      fs.readFile(path, 'utf8', (err, data) => {
        err ? rej(err) : res(data)
      })
    })
  },
  writeFile(path, dataObj) {
    return new Promise((res, rej) => {
      fs.writeFile(path, JSON.stringify(dataObj), err => {
        err ? rej(err) : res('ok')
      })
    })
  }
}
