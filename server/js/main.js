const gel = element => document.querySelector(element);

gel.get = (url, callback) => {
  const http = new XMLHttpRequest();
  http.open('GET', url, true);

  http.onload = () => {
    if (http.status >= 200 && http.status < 400) {
      // Success!
      callback(http.responseText);
    }
  };

  http.send();
};

gel.post = (url, data, callback) => {
  const http = new XMLHttpRequest();
  http.open('POST', url, true);
  http.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');

  http.onload = () => {
    if (http.status >= 200 && http.status < 400) {
      // Success!
      callback(http.responseText);
    }
  };

  http.send(data);
};

setTimeout(() => {
  if (window.location.href.indexOf('admin') !== -1) {
    setInterval(() => {
      console.log(1);
      gel.post('/update', gel('#code').value);
    }, 1000);
  }

  if(window.location.href.indexOf('admin') === -1){
    setInterval(() => {
      gel.get('/update', (res) => {
        gel('#code').value = res;
      });
    }, 1000);
  }
}, 1000);

