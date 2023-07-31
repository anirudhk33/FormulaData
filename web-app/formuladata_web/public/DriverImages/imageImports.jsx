const importAll = (r) => {
  let images = {};
  r.keys().forEach((key) => (images[key] = r(key)));
  return images;
};

const images = importAll(require.context("./images", false, /\.(avif)$/));

export default images;
