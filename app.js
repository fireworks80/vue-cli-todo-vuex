const express = require('express')
const app = express()
const session = require('express-session')
const bodyParser = require('body-parser')
const { readFile, writeFile } = require('./src/apis/file-read-write')

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
app.use(
  session({
    secret: '!@#$%%',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }
  })
)

// parse application/json
app.use(bodyParser.json())

app.get('/api/todos', (req, res) => {
  readFile(config.path.todo).then(data => res.send(data))
})

app.get('/api/memos', (req, res) => {
  readFile(config.path.memo).then(data => res.send(data))
})

app.get('/api/todos/:id', (req, res) => {
  // console.log('body: ', req.params.id)
  readFile(config.path.todo).then(data => {
    const selectedTodo = JSON.parse(data).filter(
      (item, idx) => item.id === parseInt(req.params.id, 10)
    )
    res.send(selectedTodo)
  })
})

app.get('/api/memos/:id', (req, res) => {
  // console.log('body: ', req.params.id)
  readFile(config.path.memo).then(data => {
    const selectedMemo = JSON.parse(data).filter(
      (item, idx) => item.id === parseInt(req.params.id, 10)
    )
    res.send(selectedMemo)
  })
})

app.post('/api/todos', (req, res) => {
  const result = readFile(config.path.todo)
    .then(data => {
      const dataObj = JSON.parse(data)
      const newData = {
        ...req.body,
        id: new Date().getTime(),
        done: false
      }

      dataObj.push(newData)
      return dataObj
    })
    .then(data =>
      writeFile(config.path.todo, data).then(status => res.send(status))
    )
})

app.post('/api/memos', (req, res) => {
  readFile(config.path.memo)
    .then(data => {
      const DATE = new Date()
      const dataObj = JSON.parse(data)
      const newData = {
        ...req.body,
        id: DATE.getTime(),
        date: `${DATE.getFullYear()}.${DATE.getMonth() + 1}.${DATE.getDate()}`
      }

      dataObj.push(newData)
      return dataObj
    })
    .then(data =>
      writeFile(config.path.memo, data).then(status => res.send(status))
    )
})

app.patch('/api/todos/:id', (req, res) => {
  const editData = { ...req.body }

  readFile(config.path.todo)
    .then(data => {
      const dataObj = JSON.parse(data)

      dataObj.forEach((item, idx) => {
        if (item.id === editData.id) {
          dataObj[idx] = editData
        }
      })

      return dataObj
    })
    .then(data =>
      writeFile(config.path.todo, data).then(status => res.send(status))
    )
})

app.patch('/api/memos/:id', (req, res) => {
  const editData = { ...req.body }
  // console.log(editData)
  readFile(config.path.memo)
    .then(data => {
      const dataObj = JSON.parse(data)

      dataObj.forEach((item, idx) => {
        if (item.id === editData.id) {
          dataObj[idx] = editData
        }
      })

      return dataObj
    })
    .then(data =>
      writeFile(config.path.memo, data).then(status => res.send(status))
    )
})

app.delete('/api/todos/:id', (req, res) => {
  const delId = parseInt(req.params.id, 10)

  readFile(config.path.todo)
    .then(data => {
      const dataObj = JSON.parse(data)

      dataObj.forEach((item, idx) => {
        if (item.id === delId) {
          dataObj.splice(idx, 1)
        }
      })

      return dataObj
    })
    .then(data =>
      writeFile(config.path.todo, data).then(status => res.send(status))
    )
})

app.listen(config.port, _ => console.log(`listen ${config.port}`))
