const cleanObject = obj => Object.entries(obj).reduce((acc, [key, value]) => {
  if (value !== undefined) {
    acc[key] = value;
  }
  return acc;
}, {});

module.exports = {
  cleanObject,
};
