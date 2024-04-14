import { useEffect, useRef, useState } from "react";
import StarRating from "./starRating";
import { useMovies } from "./useMovies";
import { useLocalStorageState } from "./useLocalStorageState";
import { useKey } from "./useKey";

const average = (arr) =>
  arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

const KEY = "7ee018b6";

export default function App() {

  const [query, setQuery] = useState("");
  const { movies, isLoading, error } = useMovies(query);
  const [selectedId, setSelectedId] = useState(null);

  const [watched, setWatched] = useLocalStorageState([], "watched");

  // const [watched, setWatched] = useState([]);
  // const [watched, setWatched] = useState(function () {
  //   const storedValue = localStorage.getItem("watched");
  //   return JSON.parse(storedValue);
  // });

  function handleSelectMovie(id) {
    setSelectedId((setSelectedId) =>
      id === setSelectedId ? null : id);
  }

  function handleCloseMovie() {
    setSelectedId(null);
  }

  function handleAddWatched(movie) {
    setWatched((watched) => [...watched, movie]);

    // localStorage.setItem("watched", JSON.stringify([...watched, movie]));
  }

  function handleDeleteWatched(id) {
    setWatched((watched) =>
      watched.filter((movie) =>
        movie.imdbID !== id
      )
    );
  }

  return (
    <>
      <NavBar>
        <Search query={query} setQuery={setQuery} />
        <NumResults movies={movies} />
      </NavBar>

      <Main>
        <Box>
          {/* {isLoading ? <Loader /> : <MovieList movies={movies} />} */}

          {isLoading && < Loader />}

          {!isLoading && !error &&
            <MovieList
              movies={movies}
              onSelectMovie={handleSelectMovie}
            />
          }

          {error &&
            <ErrorMessage message={error} />
          }
        </Box>

        <Box>
          {selectedId
            ?
            <MovieDetails
              selectedId={selectedId}
              onCloseMovie={handleCloseMovie}
              onAddWatched={handleAddWatched}
              watched={watched}
            />

            :
            <>
              <WatchedSummary watched={watched} />
              <WatchedMoviesList watched={watched} onDeleteWatched={handleDeleteWatched} />
            </>
          }
        </Box>
      </Main>
    </>
  );
}


function Loader() {

  return (
    <>
      <p className="loader">Loading...</p>
    </>
  );
}


function ErrorMessage({ message }) {

  return (
    <>
      <p className="error">
        <span>-</span> {message}
      </p>
    </>
  );
}


function NavBar({ children }) {

  return (
    <>
      <nav className="nav-bar">
        <Logo />
        {children}
      </nav>
    </>
  );
}


function Logo() {

  const logo = <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M19.93 5.03C19.93 4.22 19.36 3.55 18.61 3.38C18.48 3.35 18.37 3.26 18.32 3.14C18.09 2.47 17.46 2 16.72 2C15.98 2 15.36 2.47 15.12 3.13C15.08 3.26 14.97 3.34 14.84 3.37C14.08 3.54 13.52 4.22 13.52 5.03C13.52 5.84 14.09 6.51 14.84 6.68C14.97 6.71 15.08 6.8 15.13 6.92C15.36 7.58 15.99 8.05 16.73 8.05C17.47 8.05 18.09 7.58 18.33 6.92C18.37 6.79 18.49 6.7 18.62 6.68C19.36 6.51 19.93 5.83 19.93 5.03Z" fill="#F9C23C" />
    <path d="M19.0618 5.25223C19.3699 4.99451 19.7677 4.83997 20.2001 4.83997C20.9701 4.83997 21.6301 5.32997 21.8701 6.01997C21.9201 6.15997 22.0301 6.24997 22.1701 6.27997C22.9701 6.45997 23.5601 7.15997 23.5601 8.00997C23.5601 8.85997 22.9701 9.55997 22.1701 9.73997C22.0301 9.76997 21.9201 9.86997 21.8701 9.99997C21.6301 10.69 20.9701 11.18 20.2001 11.18C19.5691 11.18 19.012 10.8509 18.6993 10.3524C18.4271 10.5403 18.0976 10.65 17.74 10.65C17 10.65 16.37 10.18 16.14 9.51999C16.09 9.39999 15.98 9.30999 15.85 9.27999C15.7573 9.25896 15.6673 9.23029 15.5808 9.19465C15.3361 9.46297 15.0094 9.65687 14.6401 9.73997C14.5001 9.76997 14.3901 9.86997 14.3401 9.99997C14.1001 10.69 13.4401 11.18 12.6701 11.18C11.9001 11.18 11.2401 10.69 11.0001 9.99997C10.9601 9.85997 10.8401 9.76997 10.7001 9.73997C9.91007 9.55997 9.32007 8.85997 9.32007 8.00997C9.32007 7.15997 9.91007 6.45997 10.7001 6.27997C10.8401 6.24997 10.9601 6.15997 11.0001 6.01997C11.2501 5.32997 11.9001 4.83997 12.6801 4.83997C13.4501 4.83997 14.1101 5.32997 14.3501 6.01997C14.4001 6.15997 14.5101 6.24997 14.6501 6.27997C14.7877 6.31093 14.9191 6.35729 15.0424 6.41716C15.2612 6.20379 15.5363 6.04977 15.84 5.97999C15.97 5.95999 16.09 5.86999 16.13 5.73999C16.37 5.07999 16.99 4.60999 17.73 4.60999C18.2701 4.60999 18.7516 4.86036 19.0618 5.25223Z" fill="#FCD53F" />
    <path d="M19.5299 8.42004C20.1845 8.42004 20.7596 8.77419 21.0648 9.3043C21.3854 8.85277 21.9148 8.56006 22.5099 8.56006C23.2799 8.56006 23.9399 9.05006 24.1799 9.74006C24.2299 9.88006 24.3399 9.97006 24.4799 10.0001C25.2799 10.1801 25.8699 10.8801 25.8699 11.7301C25.8699 12.5701 25.2799 13.2801 24.4799 13.4601C24.3399 13.4901 24.2299 13.5901 24.1799 13.7201C23.9399 14.4101 23.2799 14.9001 22.5099 14.9001C21.8553 14.9001 21.2802 14.5459 20.9751 14.0158C20.6545 14.4673 20.1251 14.76 19.5299 14.76C18.7911 14.76 18.1536 14.3089 17.8911 13.6629C17.6903 13.7689 17.4668 13.8378 17.23 13.86C16.47 13.93 15.79 13.52 15.48 12.89C15.16 13.52 14.49 13.93 13.73 13.86C13.3142 13.8204 12.9375 13.6362 12.6535 13.3584C12.5535 13.4014 12.4487 13.4356 12.34 13.4601C12.2 13.4901 12.09 13.5901 12.04 13.7201C11.8 14.4101 11.14 14.9001 10.37 14.9001C9.60001 14.9001 8.94001 14.4101 8.70001 13.7201C8.65001 13.5801 8.54001 13.4901 8.40001 13.4601C7.60001 13.2801 7.01001 12.5801 7.01001 11.7301C7.01001 10.8801 7.61001 10.1701 8.40001 10.0001C8.54001 9.97006 8.65001 9.87006 8.70001 9.74006C8.94001 9.05006 9.60001 8.56006 10.37 8.56006C11.15 8.56006 11.8 9.05006 12.04 9.74006C12.09 9.88006 12.2 9.97006 12.34 10.0001C12.6741 10.0752 12.9716 10.2411 13.2047 10.4707C13.249 10.4521 13.2941 10.4352 13.34 10.42C13.53 10.36 13.68 10.21 13.75 10.02C13.98 9.30004 14.64 8.79004 15.43 8.79004C16.21 8.79004 16.87 9.29004 17.11 9.99004C17.1134 10.0011 17.117 10.012 17.121 10.0227C17.258 9.95042 17.4053 9.89527 17.5599 9.86004C17.6999 9.83004 17.8099 9.73004 17.8599 9.60004C18.0999 8.91004 18.7599 8.42004 19.5299 8.42004Z" fill="#FFF478" />
    <path d="M13.7401 14.13C13.6801 12.74 14.8001 11.58 16.1901 11.58C17.5801 11.58 18.6901 12.74 18.6401 14.13L22.3901 13.59C22.4801 12.54 23.3501 11.73 24.4101 11.73C25.6501 11.73 26.6001 12.84 26.4001 14.07L24.0701 28.82C23.9601 29.51 23.3601 30.02 22.6601 30.02H21.0901L19.6827 25.8043L18.0201 30.01H14.3601L13.0739 26.7061L11.3301 30.02H9.76012C9.06012 30.02 8.46012 29.51 8.35012 28.82L6.02012 14.07C5.83012 12.84 6.78012 11.73 8.02012 11.73C9.08012 11.73 9.96012 12.54 10.0301 13.59L13.7401 14.13Z" fill="#F8312F" />
    <path d="M11.2801 30.02L9.99012 13.74C9.90012 12.65 10.7601 11.73 11.8401 11.73C12.8401 11.73 13.6601 12.52 13.7001 13.52L14.3601 30.02H11.2801Z" fill="#F4F4F4" />
    <path d="M18.02 30.02L18.67 13.52C18.71 12.52 19.53 11.73 20.53 11.73C21.62 11.73 22.48 12.66 22.39 13.74L21.1 30.02H18.02Z" fill="#F4F4F4" />
  </svg>;

  return (
    <>
      <div className="logo">
        <span role="img">{logo}</span>
        <h1>usePopcorn</h1>
      </div>
    </>
  );
}


function Search({ query, setQuery }) {

  const inputEl = useRef(null);

  useKey("Enter", function () {
    if (document.activeElement === inputEl.current) return;
    inputEl.current.focus();
    setQuery("");
  });

  return (
    <>
      <input
        className="search"
        type="text"
        placeholder="Search movies..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        ref={inputEl}
      />
    </>
  );
}


function NumResults({ movies }) {

  return (
    <>
      <p className="num-results">
        Found <strong>{movies.length}</strong> results
      </p>
    </>
  );
}


function Main({ children }) {

  return (
    <>
      <main className="main">
        {children}
      </main>
    </>
  );
}


function Box({ children }) {

  const [isOpen, setIsOpen] = useState(true);

  return (
    <>
      <div className="box">
        <button
          className="btn-toggle"
          onClick={() => setIsOpen((open) => !open)}
        >
          {isOpen ? "–" : "+"}
        </button>
        {isOpen && children}
      </div>
    </>
  );
}


/*
function WatchedBox() {
  
  const [watched, setWatched] = useState(tempWatchedData);
  const [isOpen2, setIsOpen2] = useState(true);

  return (
    <>
      <div className="box">
        <button
          className="btn-toggle"
          onClick={() => setIsOpen2((open) => !open)}
        >
          {isOpen2 ? "–" : "+"}
        </button>
        {isOpen2 && (
          <>
            <WatchedSummary watched={watched} />
            <WatchedMoviesList watched={watched} />
          </>
        )}
      </div>
    </>
  );
}
*/


function MovieList({ movies, onSelectMovie }) {

  return (
    <>
      <ul className="list list-movies">
        {movies?.map((movie) =>
          <Movie
            movie={movie}
            key={movie.imdbID}
            onSelectMovie={onSelectMovie}
          />
        )}
      </ul>
    </>
  );
}


function Movie({ movie, onSelectMovie }) {

  return (
    <>
      <li onClick={() => onSelectMovie(movie.imdbID)}>
        <img src={movie.Poster} alt={`${movie.Title} poster`} />
        <h3>{movie.Title}</h3>
        <div>
          <p>
            <span><i className="far fa-calendar-alt"></i></span>
            <span>{movie.Year}</span>
          </p>
        </div>
      </li>
    </>
  );
}


function MovieDetails({ selectedId, onCloseMovie, onAddWatched, watched }) {

  // console.log(selectedId);
  const [movie, setMovie] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [userRating, setUserRating] = useState("");

  const countRef = useRef(0);

  useEffect(function () {
    if (userRating) countRef.current++;
  },
    [userRating]
  );

  const isWatched = watched.map((movie) => movie.imdbID).includes(selectedId);
  // console.log(isWatched);

  const watchedUserRating = watched.find((movie) => movie.imdbID === selectedId)?.userRating;

  // console.log(movie);

  const {
    Title: title,
    Year: year,
    Poster: poster,
    Runtime: runtime,
    imdbRating,
    Plot: plot,
    Released: released,
    Actors: actors,
    Director: director,
    Genre: genre,
  } = movie;

  // console.log(title, year);

  // if (imdbRating > 8) [isTop, setIsTop] = useState(true);

  // if (imdbRating > 8) return <p>Greatest Ever!</p>;

  /*
  const [isTop, setIsTop] = useState(imdbRating > 8);
  console.log(isTop);
  useEffect(function () {
    setIsTop(imdbRating > 8);
  },
    [imdbRating]
  );
  */

  const isTop = imdbRating > 8;
  console.log(isTop);

  // const [avgRating, setAvgRating] = useState(0);d

  function handleAdd() {
    const newWatchedMovie = {
      imdbID: selectedId,
      title,
      year,
      poster,
      imdbRating: Number(imdbRating),
      runtime: Number(runtime.split(" ").at(0)),
      userRating,
      countRatingDecisions: countRef.current,
    }

    onAddWatched(newWatchedMovie);
    onCloseMovie();

    // setAvgRating(Number(imdbRating));
    // setAvgRating((avgRating) => (avgRating + userRating) / 2);
  }

  useKey("Escape", onCloseMovie);

  useEffect(function () {

    setIsLoading(true);

    async function getMovieDetails() {
      const res = await fetch(`http://www.omdbapi.com/?apikey=${KEY}&i=${selectedId}`);
      const data = await res.json();
      // console.log(data);
      setMovie(data);

      setIsLoading(false);
    }

    getMovieDetails();
  }, [selectedId]);

  useEffect(function () {
    if (!title) return;
    document.title = `Movie | ${title}`;

    return function () {
      document.title = "UsePopcorn";
      // console.log(`Clean up effect for movie ${title}`);
    }

  },
    [title]
  );

  return (
    <>
      <div className="details">
        {isLoading
          ? <Loader />
          : <>
            <header>

              <button
                className="btn-back"
                onClick={onCloseMovie}
              >
                &larr;
              </button>

              <img src={poster} alt={`Poster of ${movie} movie`} />

              <div className="details-overview">
                <h2>{title}</h2>

                <p>
                  {released} &bull; {runtime}
                </p>

                <p>{genre}</p>

                <p>
                  <span>🌟</span>
                  {imdbRating} IMDb rating
                </p>
              </div>
            </header>

            {/* <p>{avgRating}</p> */}

            <section>
              <div className="rating">
                {!isWatched
                  ? <>
                    < StarRating
                      maxRating={10}
                      size={24}
                      onSetRating={setUserRating}
                    />

                    {userRating > 0 &&
                      <button
                        className="btn-add"
                        onClick={handleAdd}
                      >
                        + Add to list
                      </button>
                    }
                  </>
                  : <p>You rated this movie {watchedUserRating}
                    <span> 🌟</span>
                  </p>}
              </div>

              <p>
                <em>{plot}</em>
              </p>

              <p>Starring {actors}</p>

              <p>Directed by {director}</p>
            </section>
          </>
        }
      </div >
    </>
  );
}

function WatchedSummary({ watched }) {

  const avgImdbRating = average(watched.map((movie) => movie.imdbRating));
  const avgUserRating = average(watched.map((movie) => movie.userRating));
  const avgRuntime = average(watched.map((movie) => movie.runtime));

  return (
    <>
      <div className="summary">
        <h2>Movies you watched</h2>
        <div>
          <p>
            <span>#️⃣</span>
            <span>{watched.length} movies</span>
          </p>
          <p>
            <span>⭐️</span>
            <span>{avgImdbRating.toFixed(2)}</span>
          </p>
          <p>
            <span>🌟</span>
            <span>{avgUserRating.toFixed(2)}</span>
          </p>
          <p>
            <span>⏳</span>
            <span>{avgRuntime} min</span>
          </p>
        </div>
      </div>
    </>
  );
}


function WatchedMoviesList({ watched, onDeleteWatched }) {

  return (
    <>
      <ul className="list">
        {watched.map((movie) =>
          <WatchedMovie movie={movie} key={movie.imdbID} onDeleteWatched={onDeleteWatched} />
        )}
      </ul>
    </>
  );
}


function WatchedMovie({ movie, onDeleteWatched }) {

  return (
    <>
      <li key={movie.imdbID}>
        <img src={movie.poster} alt={`${movie.title} poster`} />
        <h3>{movie.title}</h3>
        <div>
          <p>
            <span>⭐️</span>
            <span>{movie.imdbRating}</span>
          </p>
          <p>
            <span>🌟</span>
            <span>{movie.userRating}</span>
          </p>
          <p>
            <span>⏳</span>
            <span>{movie.runtime} min</span>
          </p>

          <button
            className="btn-delete"
            onClick={() => onDeleteWatched(movie.imdbID)}
          >
            X
          </button>
        </div>
      </li>
    </>
  );
}