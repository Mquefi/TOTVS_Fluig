var send = function (url, data, type, contentType) {
  return new Promise((resolve, reject) => {
    $.ajax({
      url: window.location.origin + url,
      type: type || 'POST',
      async: false,
      contentType: contentType || 'application/json',
      data: data,
      success: function (data) {
        resolve(data);
      },
      error: function (data) {
        reject(data);
      }
    });
  });
};

var defaultCatchRequest = data => {
  if (data && data.responseText) {
    console.log('ERRO: ' + JSON.parse(data.responseText).message.message);
  } else {
    console.log('ERRO: ');
  }
  console.dir(data);
};
