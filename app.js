const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const fs = require('fs')
const filePath = './database/server.json'
const port = 3000
const encoding = 'utf8'
let count = 0

// parser application/x-www.form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.get('/', (req, res) => {
  res.send('home')
})

app.get('/api/todos', (req, res) => {
  fs.readFile(filePath, encoding, (err, data) => {
    if (err) throw new Error(err)
    res.send(data)
  })
})

app.get('/api/todos/:id', (req, res) => {
  // console.log('body: ', req.params.id)

  fs.readFile(filePath, encoding, (err, data) => {
    if (err) throw new Error(err)

    const dataObj = JSON.parse(data)
    res.send(
      dataObj.filter((item, idx) => item.id === parseInt(req.params.id, 10))
    )
  })
})

app.post('/api/todos', (req, res) => {
  fs.readFile(filePath, encoding, (err, data) => {
    if (err) throw new Error(err)

    const dataObj = JSON.parse(data)
    const newData = {
      id: (count += 1),
      ...req.body,
      edit: false,
      done: false
    }

    dataObj.push(newData)

    fs.writeFile(filePath, JSON.stringify(dataObj), err => {
      if (err) throw new Error(err)
      res.send('ok')
    })
  })
})

app.patch('/api/todos/:id', (req, res) => {
  const editData = { ...req.body }
  // console.log(editData)
  fs.readFile(filePath, encoding, (err, data) => {
    if (err) throw new Error(err)

    const dataObj = JSON.parse(data)

    dataObj.forEach((item, idx) => {
      if (item.id === editData.id) {
        dataObj[idx] = editData
      }
    })
    // console.log('after: ', dataObj)
    fs.writeFile(filePath, JSON.stringify(dataObj), err => {
      if (err) throw new Error(err)
      res.send('ok')
    })
  })
})

app.delete('/api/todos/:id', (req, res) => {
  // const req.params.id

  const delId = parseInt(req.params.id, 10)

  fs.readFile(filePath, encoding, (err, data) => {
    if (err) throw new Error(err)

    const dataObj = JSON.parse(data)

    dataObj.forEach((item, idx) => {
      if (item.id === delId) {
        dataObj.splice(idx, 1)
      }
    })

    fs.writeFile(filePath, JSON.stringify(dataObj), err => {
      if (err) throw new Error(err)
      res.send('ok')
    })
  })
})

app.listen(port, _ => console.log(`listen ${port}`))
