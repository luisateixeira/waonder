

export const setItem = (key, value, expirationMin) => {
  try {
    const record = {value: JSON.stringify(value)};
    if (expirationMin) {
      const expirationMS = expirationMin * 60 * 1000;
      record.timestamp = new Date().getTime() + expirationMS;
    }
    localStorage.setItem(key, JSON.stringify(record));
  } catch(err) {
    //
  }
}


export const getItem = (key) => {
  try {
    const record = JSON.parse(localStorage.getItem(key));
    if (record) {
      if (record.timestamp && new Date().getTime() > record.timestamp) {
        return removeItem(key);
      }
      return JSON.parse(record.value);
    }
    return undefined;

  } catch(err) {
    //
  }
}

export const removeItem = (key) => {
  try {
    localStorage.removeItem(key);
  } catch(err) {
    //
  }
}
