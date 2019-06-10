const express = require('express')
const app = express()
const session = require('express-session')
const FileStore = require('session-file-store')(session)
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const { readFile, writeFile } = require('./src/apis/file-read-write')

const config = {
  path: {
    todo: './database/',
    memo: './database/',
    user: './database/user.json'
  },
  port: 3000,
  encoding: 'utf8'
}

// parser application/x-www.form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(
  session({
    secret: '!@#$%%',
    resave: false,
    saveUninitialized: true,
    store: new FileStore(),
    cookie: {
      maxAge: 2400 * 60 * 60
    }
  })
)

// parse application/json
app.use(bodyParser.json())

const setSession = (req, { username, isAuth }) => {
  req.session.username = username
  req.session.isAuth = isAuth
  return {
    isAuth,
    username
  }
}

app.get('/api/todos', (req, res) => {
  // console.log('app.js todos api')
  if (req.session.username === undefined || req.session.username === 'guest')
    return
  readFile(`${config.path.todo}${req.session.username}.todo.json`)
    .then(data => res.send(data))
    .catch(err => console.log(err))
})

app.get('/api/memos', (req, res) => {
  if (req.session.username === undefined || req.session.username === 'guest')
    return
  readFile(`${config.path.memo}${req.session.username}.memo.json`)
    .then(data => res.send(data))
    .catch(err => console.log(err))
})

app.get('/api/todos/:id', (req, res) => {
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
      writeFile(`${config.path.todo}${req.session.username}`, data).then(
        status => res.send(status)
      )
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

// login

app.get('/authenticate', (req, res) => {
  res.json(
    req.session.username
      ? { username: req.session.username, isAuth: req.session.isAuth }
      : { username: 'guest', isAuth: false }
  )
})

app.post('/authenticate', (req, res) => {
  const body = req.body
  let result = {}

  // 사용자 정보 확인하기위해 데이터 가져오기
  readFile(config.path.user).then(data => {
    // console.log(typeof data)
    const userObj = JSON.parse(data)
    const authUser = userObj.filter(
      (user, idx) =>
        user.username === body.username && user.password === body.password
    ) // filter

    const result = setSession(
      req,
      authUser.length
        ? { username: authUser[0].username, isAuth: true }
        : { username: 'guest', isAuth: false }
    )

    res.json(result)
  }) // then
})

// logout
app.post('/authenticate/logout', (req, res) => {
  req.session.destroy()
  res.clearCookie('connect.sid')
  res.json({ username: 'guest', isAuth: false })
})

// join
app.post('/authenticate/join', async (req, res) => {
  const userJSONData = await readFile(config.path.user)
  const userObjectData = JSON.parse(userJSONData)

  const sessionResultObj = setSession(req, { ...req.body, isAuth: true })

  userObjectData.push({ ...req.body, id: new Date().getTime() })

  const userDataResult = await writeFile(config.path.user, userObjectData)

  if (userDataResult === 'ok') {
    const writeTodoJsonResult = await writeFile(
      `${config.path.todo}${req.body.username}.todo.json`,
      []
    )
    const writeMemoJsonResult = await writeFile(
      `${config.path.todo}${req.body.username}.memo.json`,
      []
    )

    if (writeTodoJsonResult === 'ok' && writeMemoJsonResult === 'ok') {
      res.json(sessionResultObj)
    }
  }
})

app.listen(config.port, _ => console.log(`listen ${config.port}`))
