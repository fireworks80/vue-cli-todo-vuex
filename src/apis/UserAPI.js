const XHR = new XMLHttpRequest()

const getUserInfo = url => {
  // debugger
  return new Promise((resolve, reject) => {
    const checkSession = () => {
      if (XHR.readyState === XHR.DONE) {
        if (XHR.status === 200 || XHR.status === 201) {
          resolve(JSON.parse(XHR.responseText))
        } else {
          reject(new Error('check 에러'))
        }
      }
    }

    XHR.onreadystatechange = checkSession
    XHR.open('GET', url)
    XHR.send()
  })
}

const login = (url, info) => {
  return new Promise((resolve, reject) => {
    const getUsers = () => {
      if (XHR.readyState === XHR.DONE) {
        if (XHR.status === 200 || XHR.status === 201) {
          resolve(JSON.parse(XHR.responseText))
        } else {
          reject(new Error('로그인 에러'))
        }
      }
    }

    XHR.onreadystatechange = getUsers
    XHR.open('POST', url)
    XHR.setRequestHeader('Content-Type', 'application/json')
    XHR.send(JSON.stringify(info))
  })
}

const logout = url => {
  return new Promise((resolve, reject) => {
    const logoutPage = () => {
      if (XHR.readyState === XHR.DONE) {
        if (XHR.status === 200 || XHR.status === 201) {
          resolve(JSON.parse(XHR.responseText))
        } else {
          reject(new Error('로그아웃 에러'))
        }
      }
    }

    XHR.onreadystatechange = logoutPage
    XHR.open('POST', url)
    XHR.send(null)
  })
}

const join = (url, userInfo) => {
  return new Promise((resolve, reject) => {
    const cb = () => {
      if (XHR.readyState === XHR.DONE) {
        if (XHR.status === 200 || XHR.status === 201) {
          resolve(JSON.parse(XHR.responseText))
        } else {
          reject(new Error('회원가입 에러'))
        }
      }
    }

    XHR.onreadystatechange = cb
    XHR.open('POST', url)
    XHR.setRequestHeader('Content-Type', 'application/json')
    XHR.send(JSON.stringify(userInfo))
  })
}

export default {
  getUserInfo,
  login,
  logout,
  join
}
