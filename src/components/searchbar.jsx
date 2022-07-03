import { useState } from "react";
import { searchVideogames } from "../Store/actions";
import { useDispatch } from "react-redux";
import s from "./styles/search.module.css";

export default function SearchBar({ currentPage, setCurrentPage }) {
  const [search, setSearch] = useState("");
  let dispatch = useDispatch();

  function onSubmit(e) {
    if (search.length === 0) {
      alert("Please insert a value");
    }
    e.preventDefault();
    dispatch(searchVideogames(search));
    setCurrentPage(1);
    setSearch("");
  }

  function onInputChange(e) {
    e.preventDefault();
    setSearch(e.target.value);
  }
  return (
    <>
      <h2 className={s.title}>VIDEOGAMES PI</h2>
      <form onSubmit={onSubmit}>
        <div className={s.container}>
          <input
            type="text"
            onChange={onInputChange}
            value={search}
            placeholder=" Search Videogame... "
            className={s.input}
          />

          <button type="submit" className={s.button}>
            Search
          </button>
        </div>
      </form>
    </>
  );
}
