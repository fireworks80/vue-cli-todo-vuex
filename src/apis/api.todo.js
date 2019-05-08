import Config from '@/config/Config.todo';

const XHR = new XMLHttpRequest();

const fetch = () => {
  return new Promise((resolve, reject) => {
    const getTodolist = () => {
      if (XHR.readyState === XHR.DONE) {
        if (XHR.status === 200) {
          resolve(JSON.parse(XHR.responseText));
        } else {
          reject(new Error('fetch error'));
        }
        // debugger;
      }
    };
    XHR.onreadystatechange = getTodolist;
    XHR.open('GET', Config.BASEURL);
    XHR.send();
  });
};

const post = data => {
  return new Promise((resolve, reject) => {
    const addTodo = () => {
      if (XHR.readyState === XHR.DONE) {
        if (XHR.status === 200 || XHR.status === 201) {
          resolve('ok');
        } else {
          reject(new Error('post error'));
        }
      }
    };

    XHR.onreadystatechange = addTodo;
    XHR.open('POST', Config.BASEURL);
    XHR.setRequestHeader('Content-Type', 'application/json');
    XHR.send(JSON.stringify(data));
  });
};

const patch = data => {
  return new Promise((resolve, reject) => {
    const toggle = () => {
      if (XHR.readyState === XHR.DONE) {
        // debugger;
        if (XHR.status === 200 || XHR.status === 201) {
          resolve('ok');
        } else {
          reject(new Error('patch error'));
        }
      }
    };
    XHR.onreadystatechange = toggle;
    XHR.open('PATCH', `${Config.BASEURL}${data.id}`);
    XHR.setRequestHeader('Content-Type', 'application/json');
    XHR.send(JSON.stringify(data));
  });
};

const del = id => {
  return new Promise((resolve, reject) => {
    const delItem = () => {
      if (XHR.readyState === XHR.DONE) {
        // debugger;
        if (XHR.status === 200 || XHR.status === 201) {
          resolve('ok');
        } else {
          reject(new Error('del error'));
        }
      }
    };
    XHR.onreadystatechange = delItem;
    XHR.open('DELETE', `${Config.BASEURL}${id}`);
    XHR.send();
  });
};

export default {
  fetch,
  post,
  patch,
  del
};
