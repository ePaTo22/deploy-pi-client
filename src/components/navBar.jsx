import React from "react";
import { NavLink } from "react-router-dom";
import SearchBar from "./searchbar";
import { useSelector, useDispatch } from "react-redux";
import {
  ASCENDING,
  DESCENDING,
  TOP,
  LOW,
  ALL,
  CREATED,
  EXISTING,
} from "../const/order";
import {
  orderByName,
  orderByRating,
  filterByCreated,
  filterByGenre,
} from "../Store/actions";
import s from "./styles/Navbar.module.css";

export default function NavBar({ setCurrentPage }) {
  const allGenre = useSelector((state) => state.genres);
  const dispatch = useDispatch();

  function handleSortName(e) {
    console.log(e.target.value);
    e.preventDefault();
    setCurrentPage(1);
    dispatch(orderByName(e.target.value));
  }

  function handleSortRating(e) {
    console.log(e.target.value);
    e.preventDefault();
    setCurrentPage(1);
    dispatch(orderByRating(e.target.value));
  }

  function handleFilterGenre(e) {
    console.log(e.target.value);
    e.preventDefault();
    setCurrentPage(1);
    dispatch(filterByGenre(e.target.value));
  }

  function handleFilterCreated(e) {
    console.log(e.target.value);
    e.preventDefault();
    setCurrentPage(1);
    dispatch(filterByCreated(e.target.value));
  }

  return (
    <div className={s.containerAll}>
      <div className={s.containerSearch}>
        <SearchBar setCurrentPage={setCurrentPage} />
      </div>

      <div className={s.containerSelects}>
        <h3 className={s.filtros}>Filters</h3>

        <select name="Order ⇵" onChange={handleSortName} className={s.select}>
          <option disabled="disabled" className={s.option}>
            Order ⇵
          </option>
          <option value={ASCENDING}>A-Z</option>
          <option value={DESCENDING}>Z-A</option>
        </select>

        <select
          name="Rating ⇵"
          onChange={handleSortRating}
          className={s.select}
        >
          <option disabled="disabled" className={s.option}>
            Rating ⇵
          </option>
          <option value={TOP}>Rating Top</option>
          <option value={LOW}>Rating Low</option>
        </select>

        <select
          className={s.select}
          onChange={handleFilterGenre}
          defaultValue={"DEFAULT"}
        >
          <option disabled="disabled" value="DEFAULT" className={s.option}>
            Filter by Genre
          </option>
          {allGenre.map((genre) => (
            <option key={genre.name} value={genre.name} className={s.opt}>
              {genre.name}
            </option>
          ))}
        </select>

        <select onChange={handleFilterCreated} className={s.select}>
          <option className={s.option}>Games</option>
          <option value={ALL}>All</option>
          <option value={CREATED}>Created</option>
          <option value={EXISTING}>Existing</option>
        </select>

        <button className={s.clear} onClick={handleFilterGenre} value="All">
          Clear{" "}
        </button>

        <div className={s.butDiv}>
          <NavLink to={"/add"}>
            <button src="/home" className={s.buttonCreate}>
              Create Videogame
            </button>
          </NavLink>
        </div>
      </div>
    </div>
  );
}
