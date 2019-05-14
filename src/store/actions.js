import jsonFirebase from "../api/jsonFirebase";

export const fetchCars = ({ commit }, gameId) => {
  commit("SET_LOADING_DATA", true);
  jsonFirebase
    .get(`/${gameId}.json`)
    .then(res => {
      const data = res.data;
      localStorage.setItem(gameId, JSON.stringify(data));
      commit("SET_LOCAL_CARS_OBJECT", data);
      commit("SET_RESULTS_JSON", Object.values(data.cars));
      commit("SET_LOADING_DATA", false);
    })
    .catch(error => console.log(error));
};

export const fetchGames = ({ commit, dispatch }) => {
  commit("SET_LOADING_DATA", true);
  jsonFirebase
    .get("/games.json")
    .then(res => {
      const data = res.data;
      commit("SET_REMOTE_GAMES", data); //this is not necessary, but we will see
      dispatch("localDataCheck", data);
    })
    .catch(error => console.log(error));
};
//if we already have up to date local data then we don't fetch anything else to save some from our quota
export const localDataCheck = ({ commit, dispatch, state }, remoteData) => {
  const tempLocalGames = JSON.parse(localStorage.getItem("localGames"));
  const tempLocalCarsObject = JSON.parse(
    localStorage.getItem(state.defaultGame)
  );
  if (!tempLocalGames) {
    //first time/empty storage, fetchings cars and unload to local
    localStorage.setItem("localGames", JSON.stringify(remoteData));
    commit("SET_LOCAL_GAMES", remoteData);
    dispatch("fetchCars", state.defaultGame);
  } else {
    //data exists, let's check if it's uptaded
    if (tempLocalGames[state.defaultGame] !== remoteData[state.defaultGame]) {
      //it's old data, let's update games and cars
      localStorage.setItem("localGames", JSON.stringify(remoteData));
      commit("SET_LOCAL_GAMES", remoteData);
      dispatch("fetchCars", state.defaultGame);
    } else {
      //we update game versions of non default games but we don't fetch
      localStorage.setItem("localGames", JSON.stringify(remoteData));
      commit("SET_LOCAL_GAMES", remoteData);
      commit("SET_LOCAL_CARS_OBJECT", tempLocalCarsObject);
      commit("SET_RESULTS_JSON", Object.values(tempLocalCarsObject.cars));
      commit("SET_LOADING_DATA", false);
    }
  }
};
//reloading cars when changing games
export const reloadCars = ({ commit, dispatch, state }) => {
  const tempLocalCarsObject = JSON.parse(
    localStorage.getItem(state.selectedGameKey)
  );
  if (state.localCarsObject.metadata.id !== state.selectedGameKey) {
    //Changing game, data not in store
    if (!tempLocalCarsObject) {
      //cars doesn't exist locally, let's fetch them
      localStorage.setItem("localGames", JSON.stringify(state.localGames));
      dispatch("fetchCars", state.selectedGameKey);
    } else {
      //cars exists locally, let's check if it's updated
      if (
        state.localGames[state.selectedGameKey] ===
        tempLocalCarsObject.metadata.version
      ) {
        //found locally and updated, let's just load it then
        commit("SET_LOCAL_CARS_OBJECT", tempLocalCarsObject);
        commit("SET_RESULTS_JSON", Object.values(tempLocalCarsObject.cars));
        commit("SET_LOADING_DATA", false);
      } else {
        //cars exists locally but it needs to be updated
        dispatch("fetchCars", state.selectedGameKey);
      }
    }
  } else {
    //we're just changing pages
    if (!tempLocalCarsObject) {
      //local storage was deleted while user was using the page, let's restore it
      localStorage.setItem("localGames", JSON.stringify(state.localGames));
      localStorage.setItem(
        state.selectedGameKey,
        JSON.stringify(state.localCarsObject)
      );
    }
    commit("SET_RESULTS_JSON", Object.values(state.localCarsObject.cars));
    commit("SET_LOADING_DATA", false);
  }
};
//This is only used when we're testing locally to use local storage and avoid making requests
export const loadFromLocalTemp = ({ commit, state }) => {
  const tempLocalGames = JSON.parse(localStorage.getItem("localGames"));
  const tempLocalCarsObject = JSON.parse(
    localStorage.getItem(state.defaultGame)
  );
  commit("SET_LOCAL_GAMES", tempLocalGames);
  commit("SET_LOCAL_CARS_OBJECT", tempLocalCarsObject);
  commit("SET_RESULTS_JSON", Object.values(tempLocalCarsObject.cars));
  commit("SET_LOADING_DATA", false);
};
