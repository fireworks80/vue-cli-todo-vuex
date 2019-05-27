const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const fs = require('fs')

const config = {
  path: {
    todo: './database/todo.json',
    memo: './database/memo.json'
  },
  port: 3000,
  encoding: 'utf8'
}

// parser application/x-www.form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.get('/', (req, res) => {
  res.send('home')
})

app.get('/api/todos', (req, res) => {
  fs.readFile(config.path.todo, config.encoding, (err, data) => {
    if (err) throw new Error(err)
    res.send(data)
  })
})

app.get('/api/memos', (req, res) => {
  fs.readFile(config.path.memo, config.encoding, (err, data) => {
    if (err) throw new Error(err)
    res.send(data)
  })
})

app.get('/api/todos/:id', (req, res) => {
  // console.log('body: ', req.params.id)

  fs.readFile(config.path.todo, config.encoding, (err, data) => {
    if (err) throw new Error(err)

    const dataObj = JSON.parse(data)
    res.send(
      dataObj.filter((item, idx) => item.id === parseInt(req.params.id, 10))
    )
  })
})

app.get('/api/memos/:id', (req, res) => {
  // console.log('body: ', req.params.id)

  fs.readFile(config.path.memo, config.encoding, (err, data) => {
    if (err) throw new Error(err)

    const dataObj = JSON.parse(data)
    res.send(
      dataObj.filter((item, idx) => item.id === parseInt(req.params.id, 10))
    )
  })
})

app.post('/api/todos', (req, res) => {
  fs.readFile(config.path.todo, config.encoding, (err, data) => {
    if (err) throw new Error(err)

    const dataObj = JSON.parse(data)
    const newData = {
      ...req.body,
      id: new Date().getTime(),
      done: false
    }

    dataObj.push(newData)

    fs.writeFile(config.path.todo, JSON.stringify(dataObj), err => {
      if (err) throw new Error(err)
      res.send('ok')
    })
  })
})

app.post('/api/memos', (req, res) => {
  fs.readFile(config.path.memo, config.encoding, (err, data) => {
    if (err) throw new Error(err)

    const dataObj = JSON.parse(data)
    const newData = {
      ...req.body,
      id: new Date().getTime(),
      done: false
    }

    dataObj.push(newData)

    fs.writeFile(config.path.memo, JSON.stringify(dataObj), err => {
      if (err) throw new Error(err)
      res.send('ok')
    })
  })
})

app.patch('/api/todos/:id', (req, res) => {
  const editData = { ...req.body }
  // console.log(editData)
  fs.readFile(config.path.todo, config.encoding, (err, data) => {
    if (err) throw new Error(err)

    const dataObj = JSON.parse(data)

    dataObj.forEach((item, idx) => {
      if (item.id === editData.id) {
        dataObj[idx] = editData
      }
    })
    // console.log('after: ', dataObj)
    fs.writeFile(config.path.todo, JSON.stringify(dataObj), err => {
      if (err) throw new Error(err)
      res.send('ok')
    })
  })
})

app.patch('/api/memos/:id', (req, res) => {
  const editData = { ...req.body }
  // console.log(editData)
  fs.readFile(config.path.memo, config.encoding, (err, data) => {
    if (err) throw new Error(err)

    const dataObj = JSON.parse(data)

    dataObj.forEach((item, idx) => {
      if (item.id === editData.id) {
        dataObj[idx] = editData
      }
    })
    // console.log('after: ', dataObj)
    fs.writeFile(config.path.memo, JSON.stringify(dataObj), err => {
      if (err) throw new Error(err)
      res.send('ok')
    })
  })
})

app.delete('/api/todos/:id', (req, res) => {
  // const req.params.id

  const delId = parseInt(req.params.id, 10)

  fs.readFile(config.path.todo, config.encoding, (err, data) => {
    if (err) throw new Error(err)

    const dataObj = JSON.parse(data)

    dataObj.forEach((item, idx) => {
      if (item.id === delId) {
        dataObj.splice(idx, 1)
      }
    })

    fs.writeFile(config.path.todo, JSON.stringify(dataObj), err => {
      if (err) throw new Error(err)
      res.send('ok')
    })
  })
})

app.listen(config.port, _ => console.log(`listen ${config.port}`))
