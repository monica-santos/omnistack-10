module.exports = stringList => {
  return stringList.split(',').map(tech => tech.trim());
};
