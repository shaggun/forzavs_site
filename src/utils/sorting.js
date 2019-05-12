//Manufacturer
//Low to high
function byManufacturerAsc(a, b) {
  let elA = a.manufacturer;
  let elB = b.manufacturer;
  if (elA < elB) {
    return -1;
  }
  if (elA > elB) {
    return 1;
  }
  return 0;
} //High to low
function byManufacturerDes(a, b) {
  let elA = a.manufacturer;
  let elB = b.manufacturer;
  if (elA < elB) {
    return 1;
  }
  if (elA > elB) {
    return -1;
  }
  return 0;
}
//Generic function for simple arrays
function descendingGeneric(a, b) {
  if (a < b) {
    return 1;
  }
  if (a > b) {
    return -1;
  }
  return 0;
}
const descending = () => (a, b) => (a == b ? 0 : a < b ? 1 : -1);
const byPropAscending = propName => (a, b) =>
  a[propName] == b[propName] ? 0 : a[propName] < b[propName] ? -1 : 1;

const byPropDescending = propName => (a, b) =>
  a[propName] == b[propName] ? 0 : a[propName] < b[propName] ? 1 : -1;

module.exports = {
  byPropAscending,
  byPropDescending
};
