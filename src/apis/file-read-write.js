const fs = require('fs')

const hasFile = fileName => {
  fs.open(fileName, 'a', (err, fd) => {
    if (err) throw new Error(err)
  })
}

module.exports = {
  readFile(file) {
    return new Promise((res, rej) => {
      fs.readFile(file, 'utf8', (err, data) => {
        err ? rej(err) : res(data)
      })
    })
  },
  writeFile(file, dataObj) {
    return new Promise((res, rej) => {
      fs.writeFile(file, JSON.stringify(dataObj), err => {
        err ? rej(err) : res('ok')
      })
    })
  }
}
