import { useEffect, useState } from "react";
import Games from "./Games.jsx";
import { useDispatch, useSelector } from "react-redux";
import { axiosVideogames, getGenre } from "../Store/actions";
import { Pagination } from "./Pagination.js";
import s from "./styles/videogames.module.css";
import NavBar from "./navBar.jsx";

export default function Videogames() {
  const dispatch = useDispatch();
  const games = useSelector((state) => state.filteredVideogames);
  const [currentPage, setCurrentPage] = useState(1);
  const [gamesPerPage] = useState(15);

  useEffect(() => {
    dispatch(axiosVideogames());
    dispatch(getGenre());
  }, []);

  const indexOfLastGame = currentPage * gamesPerPage;
  const indexOfFirstGame = indexOfLastGame - gamesPerPage;
  const currentGames = games.slice(indexOfFirstGame, indexOfLastGame);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const nextPage = () => {
    if (currentPage < Math.ceil(games.length / gamesPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  if (games.length === 0) {
    return <h1 className={s.loading}>Loading...</h1>;
  }
  return (
    <div className={s.container}>
      <div className={s.containNav}>
        <NavBar setCurrentPage={setCurrentPage} />
      </div>

      <div className={s.containGames}>
        <Games games={currentGames} />
      </div>

      <div className={s.containPagination}>
        <Pagination
          gamesPerPage={gamesPerPage}
          totalGames={games.length}
          paginate={paginate}
          prevPage={prevPage}
          nextPage={nextPage}
        />
      </div>
    </div>
  );
}
