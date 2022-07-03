import React from "react";
import { Link } from "react-router-dom";
import s from "./styles/Games.module.css";

export const Games = ({ games }) => {
  return (
    <ul className={s.ul}>
      {games.map((game, i) => (
        <div className={s.li}>
          <li key={game.id}>
            <Link to={`/${game.id}`} className={s.title}>
              {game.name}
              <li key={game.name}>
                <img src={game.image} alt="img" className={s.img} />
              </li>
            </Link>
          </li>

          <li key={i} className={s.genres}>
            {game.genres}
          </li>
        </div>
      ))}
    </ul>
  );
};

export default Games;
