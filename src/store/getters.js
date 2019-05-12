export const results = state => {
  return state.results;
};
export const resultsJson = state => {
  return state.resultsJson;
};
export const filterOpen = state => {
  return state.filterOpen;
};
export const comparedCars = state => {
  return state.comparedCars;
};
export const sorting = state => {
  return {
    category: state.sortCategory,
    order: state.sortOrder
  };
};
export const filtering = state => {
  return {
    carClass: state.filterClass,
    type: state.filterType,
    manufacturer: state.filterManufacturer
  };
};
export const filterTextSearch = state => {
  return state.filterTextSearch;
};
export const selectedGameText = state => {
  return state.selectedGameText;
};
export const selectedGameKey = state => {
  return state.selectedGameKey;
};
export const loadingData = state => {
  return state.loadingData;
};
export const localCarsObject = state => {
  return state.localCarsObject;
};
export const localGames = state => {
  return state.localGames;
};
export const pagMultiplier = state => {
  return state.pagMultiplier;
};
export const pagElements = state => {
  return state.pagElements;
};
