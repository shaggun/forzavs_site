export const TOGGLE_FILTER_OPEN = state => {
  state.filterOpen = !state.filterOpen;
};
export const CLOSE_FILTER_OPEN = state => {
  state.filterOpen = false;
};
export const CLEAR_CAR_COMPARE = state => {
  state.comparedCars = [];
};
export const ADD_CAR_COMPARE = (state, car) => {
  if (state.comparedCars.length < 4) {
    state.comparedCars.push(car);
  }
};
export const REMOVE_CAR_COMPARE = (state, car) => {
  if (state.comparedCars.length !== 0) {
    const found = state.comparedCars.find(element => element.id === car.id);
    state.comparedCars.splice(state.comparedCars.indexOf(found), 1);
  }
};
export const SET_SORT_CATEGORY = (state, category) => {
  state.sortCategory = category;
};
export const SET_SORT_ORDER = (state, order) => {
  state.sortOrder = order;
};
export const RESET_SORTING_CRITERIA = state => {
  state.sortCategory = "Manufacturer";
  state.sortOrder = "Ascending";
};
export const SET_FILTER_CLASS = (state, carClass) => {
  state.filterClass = carClass;
};
export const SET_FILTER_TYPE = (state, type) => {
  state.filterType = type;
};
export const SET_FILTER_MANUFACTURER = (state, manufacturer) => {
  state.filterManufacturer = manufacturer;
};
export const SET_FILTER_TEXT = (state, text) => {
  state.filterTextSearch = text;
};
export const SET_RESULTS = (state, res) => {
  state.results = res;
};
export const SET_RESULTS_JSON = (state, res) => {
  state.resultsJson = res;
};
export const SET_SELECTED_GAME_TEXT = (state, game) => {
  state.selectedGameText = game;
};
export const SET_SELECTED_GAME_ID = (state, id) => {
  state.selectedGameKey = id;
};
export const SET_LOADING_DATA = (state, val) => {
  state.loadingData = val;
};
export const SET_LOCAL_CARS_OBJECT = (state, obj) => {
  state.localCarsObject = obj;
};
export const SET_LOCAL_GAMES = (state, data) => {
  state.localGames = data;
};
export const SET_REMOTE_GAMES = (state, data) => {
  state.remoteGames = data;
};
export const SET_PAG_MULTIPLIER = (state, num) => {
  state.pagMultiplier = num;
};
export const SET_PAG_ELEMENTS = (state, num) => {
  state.pagElements = num;
};
