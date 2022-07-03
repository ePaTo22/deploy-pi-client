import React from "react";
import s from "./styles/Pagination.module.css";

export const Pagination = ({
  gamesPerPage,
  totalGames,
  paginate,
  prevPage,
  nextPage,
}) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalGames / gamesPerPage); i++) {
    pageNumbers.push(i); // correct page numbers
  }

  return (
    <div>
      <ul className={s.ul}>
        <button className={s.prev} onClick={prevPage}>
          {" "}
          Prev{" "}
        </button>
        {pageNumbers.map((number) => (
          <li key={number} className={s.li}>
            <button onClick={() => paginate(number)} className={s.button}>
              {number}
            </button>
          </li>
        ))}
        <button className={s.next} onClick={nextPage}>
          {" "}
          Next{" "}
        </button>
      </ul>
    </div>
  );
};
