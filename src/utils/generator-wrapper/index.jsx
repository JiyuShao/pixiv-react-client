import Toast from 'components/toast';

export function toastWrapper(cb) {
  return function* (action) {
    Toast.loading('Loading');
    const result = yield cb(action);
    Toast.hide();
    yield result;
  }
}

export default toastWrapper;
