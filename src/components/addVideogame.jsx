import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getGenre, getPlatforms } from "../Store/actions";
import { plataformsArray } from "./platforms"; // opcion p/ optimizar rendimiento, traer platforms de un array.
import PlatformsFromAPI from "./platformsFromAPI";
import s from "./styles/addVideogames.module.css";

export default function AddVideogame() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const genres = useSelector((state) => state.genres);

  const [errors, setErrors] = useState({
    name: "Please insert a name",
  });

  console.log(genres);

  let plataforms = PlatformsFromAPI();

  function formErrors(err) {
    let errors = {};
    if (!err.name) errors.name = "Please insert a name";
    else if (!/^[^\s]+(\s+[^\s]+)*$/.test(err.name)) {
      errors.name = "Please remove the space at the beginning or the end";
    } else if (/\b([a-z])/g.test(err.name)) {
      errors.name = "The first letter in each word should be uppercase";
    }

    if (!err.description) errors.description = "Please insert a description";

    if (!err.rating) errors.rating = "Please insert a rating";
    else if (err.rating > 5) {
      errors.rating = "Rating must be less than 5";
    } else if (!/^[^\s]+(\s+[^\s]+)*$/.test(err.rating)) {
      errors.rating = "Please remove the spaces";
    } else if (isNaN(err.rating)) {
      errors.rating = "Only numbers are allowed";
    }

    if (!err.released) errors.released = "Please insert a released date";
    else if (
      !/^((0?[1-9]|1[012])[- /.](0?[1-9]|[12][0-9]|3[01])[- /.](19|20)?[0-9]{2})*$/.test(
        err.released
      )
    ) {
      errors.released = "Please enter a date in the format mm-dd-yyyy";
    }

    if (
      typeof err.background_image === "undefined" ||
      err.background_image === ""
    ) {
      return errors;
    } else if (
      !/(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/.test(
        err.background_image
      )
    ) {
      errors.background_image =
        "Please insert the URL of an image, or leave it blank to use a default image";
    }

    return errors;
  }

  const [input, setInput] = useState({
    platforms: [],
    genres: [],
  });

  function onInputChange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });

    setErrors(
      formErrors({
        ...input,
        [e.target.name]: e.target.value,
      })
    );

    console.log(errors);
  }

  function onPlatfromChange(e) {
    if (input.platforms.includes(e.target.value)) {
      setInput({
        ...input,
        platforms: [...input.platforms],
      });
      alert("The platforms has been already added");
    } else {
      setInput({
        ...input,
        platforms: [...input.platforms, e.target.value],
      });
    }
  }

  function onGenresChange(e) {
    setInput({
      ...input,
      genres: [...input.genres, e.target.value],
    });
  }

  function clearGenre(e) {
    let a = e;

    setInput({
      ...input,
      genres: [...input.genres].filter((e) => e !== a),
    });
  }

  function clearPlatforms(e) {
    let a = e;

    setInput({
      ...input,
      platforms: [...input.platforms].filter((e) => e !== a),
    });
  }

  useEffect(() => {
    dispatch(getGenre());
    dispatch(getPlatforms());
  }, []);

  function onSubmit(e) {
    e.preventDefault();

    axios
      .post(
        "https://videogames-pi-pat.fly.dev/api/videogame/",
        input
      )
      .then(() => {
        alert("Videogame Created!");
      })
      .then(() =>
        setInput({
          platforms: [],
          genres: [],
        })
      )
      .then(() => {
        navigate("/home");
      });
  }

  return (
    <form onSubmit={onSubmit} autoComplete="off" className={s.form}>
      <div className={s.titleBox}>
        <h1 className={s.title}>CREATE YOUR VIDEOGAME</h1>
      </div>

      <br />

      <label htmlFor="" className={s.name}>
        Name:{" "}
      </label>
      <input
        placeholder="Name.."
        className={s.input}
        onChange={onInputChange}
        type="text"
        name="name"
        value={input.name || ""}
      />

      {errors.name ? <span className={s.errors}> {errors.name} </span> : null}

      <br />
      <br />
      <label htmlFor="" className={s.name}>
        Image:{" "}
      </label>
      <input
        placeholder="URL.."
        className={s.input}
        onChange={onInputChange}
        type="text"
        name="background_image"
        value={input.background_image}
      />

      {errors.background_image ? (
        <span className={s.errors}> {errors.background_image} </span>
      ) : null}

      <br />
      <br />
      <label htmlFor="" className={s.name}>
        Description:{" "}
      </label>
      <input
        placeholder="Descrption.."
        className={s.input}
        onChange={onInputChange}
        type="text"
        name="description"
        value={input.description || ""}
      />

      {errors.description ? (
        <span className={s.errors}> {errors.description} </span>
      ) : null}

      <br />
      <br />
      <label htmlFor="" className={s.name}>
        Released:{" "}
      </label>
      <input
        placeholder="Released date.."
        className={s.input}
        onChange={onInputChange}
        type="text"
        name="released"
        value={input.released || ""}
      />

      {errors.released ? (
        <span className={s.errors}> {errors.released} </span>
      ) : null}

      <br />
      <br />
      <label htmlFor="" className={s.name}>
        Rating:{" "}
      </label>
      <input
        placeholder="Rating.."
        className={s.input}
        onChange={onInputChange}
        type="text"
        name="rating"
        value={input.rating || ""}
      />

      {errors.rating ? (
        <span className={s.errors}> {errors.rating} </span>
      ) : null}

      <br />
      <br />

      <label htmlFor="" className={s.name}>
        Genres:{" "}
      </label>
      <select
        name="genres"
        onChange={(e) => onGenresChange(e)}
        required
        className={s.input}
      >
        <option value="">Choose the genres</option>
        {genres.map((g) => (
          <option key={g.id} value={g.name} label={g.name} />
        ))}
      </select>

      <div>
        {input.genres.map((e, i) => (
          <span key={i} className={s.divSelect}>
            <p className={s.pSelect}>
              {e}{" "}
              <button
                type="button"
                onClick={() => clearGenre(e)}
                className={s.delete}
              >
                x
              </button>{" "}
            </p>
          </span>
        ))}
      </div>

      <br />
      <br />

      <label className={s.name}>Plataforms: </label>
      <select
        name="plataforms"
        onChange={(e) => onPlatfromChange(e)}
        required
        className={s.input}
      >
        <option value="">Choose the platforms</option>
        {plataforms.map((e, i) => {
          return <option key={i} value={e + " "} label={e} />;
        })}
      </select>

      <div>
        {input.platforms.map((g, i) => (
          <div key={i} className={s.divSelect}>
            <p className={s.pSelect}>
              {g}{" "}
              <button
                type="button"
                onClick={() => clearPlatforms(g)}
                className={s.delete}
              >
                x
              </button>{" "}
            </p>
          </div>
        ))}
      </div>

      <br />
      <br />
      <input
        className={s.inputSubmit}
        type="submit"
        disabled={Object.keys(errors).length ? true : false}
      />
    </form>
  );
}
