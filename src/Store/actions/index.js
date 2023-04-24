import axios from "axios";
export const AXIOS_VIDEOGAMES = "AXIOS_VIDEOGAMES";
export const SEARCH_VIDEOGAME = "SEARCH_VIDEOGAME";
export const SORT_VIDEOGAMES = "SORT_VIDEOGAMES";
export const GET_GENRE = "GET_GENRE";
export const FILTER_CREATED = "FILTER_CREATED";
export const FILTER_BY_GENRE = "FILTER_BY_GENRE";
export const ORDER_BY_NAME = "ORDER_BY_NAME";
export const ORDER_BY_RATING = "ORDER_BY_RATING";
export const GET_PLATFORMS = "GET_PLATFORMS";
export const DELETE_GAME = "DELETE_GAME";

export function axiosVideogames() {
  return function (dispatch) {
    axios
      .get("https://videogames-pi-pat.fly.dev/api/videogame")
      .then((videogames) => {
        dispatch({
          type: AXIOS_VIDEOGAMES,
          payload: videogames.data,
        });
      })

      .catch((error) => {
        console.log(error);
      });
  };
}

export function searchVideogames(search) {
  return function (dispatch) {
    axios
      .get(
        "https://videogames-pi-pat.fly.dev/api/videogame?name=" +
          search
      )
      .then((videogames) => {
        dispatch({
          type: SEARCH_VIDEOGAME,
          payload: videogames.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
}

export function getGenre() {
  return function (dispatch) {
    axios
      .get(`https://videogames-pi-pat.fly.dev/api/genre`)
      .then((genres) => {
        dispatch({ type: GET_GENRE, payload: genres.data });
      })
      .catch((err) => {
        console.log(err);
      });
  };
}

export function getPlatforms() {
  return function (dispatch) {
    axios
      .get(`https://videogames-pi-pat.fly.dev/api/videogame`)
      .then((platforms) => {
        dispatch({
          type: GET_PLATFORMS,
          payload: platforms.data.map((el) => {
            return el.platforms;
          }),
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
}

export function filterByCreated(filter) {
  return {
    type: FILTER_CREATED,
    payload: filter,
  };
}

export function filterByGenre(filter) {
  return {
    type: FILTER_BY_GENRE,
    payload: filter,
  };
}

export function orderByName(order) {
  return {
    type: ORDER_BY_NAME,
    payload: order,
  };
}

export function orderByRating(order) {
  return {
    type: ORDER_BY_RATING,
    payload: order,
  };
}
