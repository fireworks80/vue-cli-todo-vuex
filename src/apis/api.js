const XHR = new XMLHttpRequest()

const MSG = {
  GET: 'GET API ERROR',
  UPDATE: 'UPDATE API ERROR',
  ADD: 'ADD API ERROR',
  DEL: 'DEL API ERROR'
}

const get = url => {
  return new Promise((resolve, reject) => {
    const getMemolist = () => {
      if (XHR.readyState === XHR.DONE) {
        if (XHR.status === 200) {
          // debugger
          resolve(JSON.parse(XHR.responseText))
        } else {
          reject(new Error(MSG.GET))
        }
        // debugger;
      }
    }

    XHR.onreadystatechange = getMemolist
    XHR.open('GET', url)
    XHR.send()
  })
}

const update = (url, data) => {
  return new Promise((resolve, reject) => {
    const toggle = () => {
      if (XHR.readyState === XHR.DONE) {
        // debugger
        if (XHR.status === 200 || XHR.status === 201) {
          resolve('ok')
        } else {
          reject(new Error(MSG.UPDATE))
        }
      }
    }

    XHR.onreadystatechange = toggle
    XHR.open('PATCH', `${url}${data.id}`)
    XHR.setRequestHeader('Content-Type', 'application/json')
    XHR.send(JSON.stringify(data))
  })
}

const add = (url, data) => {
  return new Promise((resolve, reject) => {
    const addTodo = () => {
      if (XHR.readyState === XHR.DONE) {
        if (XHR.status === 200 || XHR.status === 201) {
          resolve('ok')
        } else {
          reject(new Error(MSG.ADD))
        }
      }
    }

    XHR.onreadystatechange = addTodo
    XHR.open('POST', url)
    XHR.setRequestHeader('Content-Type', 'application/json')
    XHR.send(JSON.stringify(data))
  })
}

const del = (url, id) => {
  return new Promise((resolve, reject) => {
    const delItem = () => {
      if (XHR.readyState === XHR.DONE) {
        // debugger;
        if (XHR.status === 200 || XHR.status === 201) {
          resolve('ok')
        } else {
          reject(new Error(MSG.DEL))
        }
      }
    }
    XHR.onreadystatechange = delItem
    XHR.open('DELETE', `${url}${id}`)
    XHR.send()
  })
}

export default {
  get,
  add,
  update,
  del
}
