import Toast from 'components/toast';

function toastWarper(cb) {
  return function* (action) {
    console.log(Toast);

    // Toast.text({
    //   content: 'Loading...',
    //   duration: 0,
    // });
    const result = yield cb(action);
    Toast.hide();
    yield result;
  }
}

export default toastWarper;
