const loadImage = (path, success) => {
  const image = new Image();
  image.onload = () => {
    if (success) {
      success();
    }
  };
  image.src = path;
  return {
    abort() {
      image.removeAttribute('src');
    }
  }
}

export default loadImage;
