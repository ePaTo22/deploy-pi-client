import { ASCENDING, CREATED, TOP, EXISTING } from "../../const/order";
import {
  AXIOS_VIDEOGAMES,
  SEARCH_VIDEOGAME,
  GET_GENRE,
  FILTER_BY_GENRE,
  FILTER_CREATED,
  ORDER_BY_NAME,
  ORDER_BY_RATING,
  GET_PLATFORMS,
  DELETE_GAME,
} from "../actions";

const initialState = {
  videogames: [],
  filteredVideogames: [],
  genres: [],
  platforms: [],
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case AXIOS_VIDEOGAMES:
      return {
        ...state,
        videogames: action.payload,
        filteredVideogames: action.payload,
      };

    case SEARCH_VIDEOGAME:
      console.log(action.payload);

      if (action.payload.length === 0) {
        alert("Game not found");
        return {
          ...state,
        };
      }

      return {
        ...state,
        filteredVideogames: action.payload,
      };

    case GET_GENRE:
      return { ...state, genres: action.payload };

    case GET_PLATFORMS:
      console.log(action.payload);
      return { ...state, platforms: action.payload };

    case ORDER_BY_NAME:
      console.log(action.payload);

      let orderedVideogames = [...state.filteredVideogames];

      orderedVideogames = orderedVideogames.sort((a, b) => {
        if (a.name < b.name) {
          return action.payload === ASCENDING ? -1 : 1;
        }
        if (a.name > b.name) {
          return action.payload === ASCENDING ? 1 : -1;
        }
        return 0;
      });
      return {
        ...state,
        filteredVideogames: orderedVideogames,
      };

    case ORDER_BY_RATING:
      console.log(action.payload);
      let orderedVideogamesRating = [...state.filteredVideogames];

      orderedVideogamesRating = orderedVideogamesRating.sort((a, b) => {
        if (a.rating < b.rating) {
          return action.payload === TOP ? 1 : -1;
        }
        if (a.rating > b.rating) {
          return action.payload === TOP ? -1 : 1;
        }
        return 0;
      });
      return {
        ...state,
        filteredVideogames: orderedVideogamesRating,
      };

    case FILTER_BY_GENRE:
      console.log(action.payload);

      let genreVideogames = [...state.filteredVideogames];

      const filtered =
        action.payload === "All"
          ? state.videogames
          : (genreVideogames = genreVideogames.filter((e) => {
              return e.genres.includes(action.payload + " ");
            }));

      if (genreVideogames.length === 0) {
        alert(`No ${action.payload} games where found! Try another genre!`);
        return {
          ...state,
        };
      }

      return {
        ...state,
        filteredVideogames: filtered,
      };

    case FILTER_CREATED:
      console.log(action.payload);

      let createdVideogames = [...state.videogames];

      if (action.payload === CREATED) {
        createdVideogames = createdVideogames.filter((e) => {
          return e.created;
        });
      }

      if (action.payload === EXISTING) {
        createdVideogames = createdVideogames.filter((e) => {
          return !e.created;
        });
      }

      if (createdVideogames.length === 0) {
        alert(
          "No videogames where created yet, click on create videogames and make one!"
        );
        return {
          ...state,
        };
      }

      return {
        ...state,
        filteredVideogames: createdVideogames,
      };

    case DELETE_GAME:
      console.log(action.payload);

      let deleted = [...state.videogames];

      if (action.payload.length > 8) {
        deleted = deleted.filteredVideogames.filter(
          (e) => e.id !== action.payload
        );
      }

      return {
        ...state,
        filteredVideogames: deleted,
      };

    default:
      return state;
  }
}
