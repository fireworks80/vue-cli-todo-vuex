import Config from '@/Config';

const XHR = new XMLHttpRequest();

// console.log(Config);

const fetch = () => {

  return new Promise((resolve, reject) => {

    const getTodolist = () => {

      if (XHR.readyState === XHR.DONE) {
        if (XHR.status === 200) {
          resolve(JSON.parse(XHR.responseText));
        } else {
          reject(new Error('fetch Ajax error'));
        }
        // debugger;
      }
    };
    XHR.onreadystatechange = getTodolist;
    XHR.open('GET', Config.BASEURL);
    XHR.send();

  });
};

const post = (data) => {
  return new Promise((resolve, reject) => {

    const addTodo = () => {
      if (XHR.readyState === XHR.DONE) {
        if (XHR.status === 200 || XHR.status === 201) {
          resolve('ok');
        } else {
          reject(new Error('add ajax error'));
        }
      }
    };

    XHR.onreadystatechange = addTodo;
    XHR.open('POST', Config.BASEURL);
    XHR.setRequestHeader('Content-Type', 'application/json');
    XHR.send(JSON.stringify(data));
  });
};

export default {
  fetch,
  post
};