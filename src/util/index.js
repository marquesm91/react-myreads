export const arrayToObject = (array, key) => {
  key = key || 'id';

  return array.reduce((acc, cur) => {
    acc[cur[key]] = cur;
    return acc;
  }, {});
};

export const removeByKey = (obj, deleteKey) => {
  return Object.keys(obj)
    .filter(key => key !== deleteKey)
    .reduce((result, current) => {
      result[current] = obj[current];
      return result;
  }, {});
}

export const length = (obj) => Object.keys(obj).length;
