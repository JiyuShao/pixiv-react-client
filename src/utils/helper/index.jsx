function isJson(str) {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
}

function getLocalStorage(key) {
  let result;
  try {
    result = localStorage.getItem(key);
    return JSON.parse(result);
  } catch (e) {
    return result;
  }
}

function setLocalStorage(key, value) {
  try {
    if (typeof value === 'object') {
      value = JSON.stringify(value);
    }
    localStorage.setItem(key, value);
    return true;
  } catch (e) {
    return false;
  }
}

function isNumeric(val) {
  return Number(parseFloat(val)) == val;
}

function postRedirect(url, postData) {
  let postCart = JSON.stringify(postData);
  console.log('postCart', postCart)
  let $form = document.createElement("form");
  $form.setAttribute('method', 'POST');
  $form.setAttribute('action', url);

  for (var key in postData) {
    if (postData.hasOwnProperty(key)) {
      let $input = document.createElement("input");
      $input.setAttribute('type', 'hidden');
      $input.setAttribute('name', key);
      $input.setAttribute('value', postData[key]);
      $form.appendChild($input);
    }
  }

  document.body.appendChild($form);
  $form.submit();
}

export default {
  isJson,
  getLocalStorage,
  setLocalStorage,
  isNumeric,
  postRedirect,
}
