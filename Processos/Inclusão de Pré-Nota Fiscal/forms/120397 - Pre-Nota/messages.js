'use strict';

var showError = (message, data, title) => {
  console.log('ERRO:');
  console.dir(message);
  FLUIGC.toast({
    title: title || '',
    message: data && data.responseText ? JSON.parse(data.responseText).message.message : data,
    type: 'danger'
  });
};

var showWarning = (message, title) => {
  FLUIGC.toast({
    title: title || '',
    message: message,
    type: 'warning'
  });
};
