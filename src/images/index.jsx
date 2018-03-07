import _ from 'lodash';

function importAll(r) {
  let images = {};
  r.keys().map((item, index) => {
    return images[_.trimStart(item, './').split(".").slice(0, -1).join(".")] = r(item);
  });
  return images;
}
const images = importAll(require.context('./icons', false, /\.(png|jpe?g|svg)$/));

export default images;
