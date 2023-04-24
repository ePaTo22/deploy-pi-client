import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router";
import s from "./styles/detail.module.css";
import { Link } from "react-router-dom";

export default function Videogame() {
  const [videogame, setVideogame] = useState();

  let { id } = useParams();

  useEffect(() => {
    axios
      .get(`https://videogames-pi-pat.fly.dev/api/videogame/${id}`)
      .then((result) => {
        setVideogame(result.data);
      });

    return () => {
      setVideogame(null);
    };
  }, []);

  return (
    <div className={s.detail}>
      {videogame ? (
        <>
          <Link to={"/home"}>
            <button className={s.but} src="/home">
              Back to Home
            </button>
          </Link>

          <h3 className={s.title}>{videogame.name}</h3>

          <img
            src={videogame.background_image}
            alt="imagen"
            className={s.img}
          />
          <h4 className={s.genres}>
            Genres: {videogame.genres.map((el) => el.name + " ")}
          </h4>
          <h4 className={s.description}>
            Description : {videogame.description}
          </h4>

          <h4 className={s.released}>Released: {videogame.released}</h4>
          <h4 className={s.rating}>Rating: {videogame.rating}/5</h4>
          <h4 className={s.platforms}>Platforms: {videogame.platforms}</h4>
        </>
      ) : (
        <div className={s.loading}>Loading</div>
      )}
    </div>
  );
}
