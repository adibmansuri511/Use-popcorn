import { useState, useEffect } from "react";

const KEY = "7ee018b6";

export function useMovies(query) {
    const [movies, setMovies] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    // Movie Api fetch using Async/Await method.
    useEffect(function () {
        // callback?.();

        const controller = new AbortController();

        async function fetchMovies() {
            try {
                setIsLoading(true);
                setError("");

                const res = await fetch(
                    `http://www.omdbapi.com/?apikey=${KEY}&s=${query}`,
                    { signal: controller.signal }
                );

                if (!res.ok)
                    throw new Error("Something went wrong while fetching the movies.");

                const data = await res.json();
                // console.log(data);

                if (data.Response === "False")
                    throw new Error("Movie not found!");

                setMovies(data.Search);
                // console.log(data.Search);
                setError("");
                setIsLoading(false);
            }

            catch (err) {
                if (err.name !== "AbortError") {
                    console.log(err.message);
                    setError(err.message);
                }
            }

            finally {
                setIsLoading(false);
            }
        }

        if (query.length < 3) {
            setMovies([]);
            setError("");
            return;
        }

        // handleCloseMovie();

        fetchMovies();

        return function () {
            controller.abort();
        };

    },
        [query]
    );

    return { movies, isLoading, error };
}