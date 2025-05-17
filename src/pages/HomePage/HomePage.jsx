import css from './HomePage.module.css';

import { useEffect, useState } from 'react';

import { trendingMovies } from '../../services/service';

import MovieList from '../../components/MovieList/MovieList';
import Loader from '../../components/Loader/Loader';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';

export default function HomePage() {
  const [trendMovies, setTrendMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    setLoading(true);
    setError(false);
    trendingMovies()
      .then(trendMoviesList => setTrendMovies(trendMoviesList))
      .catch(error =>
        setError(
          error.message || 'Something went wrong. Please try again later.'
        )
      )
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className={css.container}>
      {loading && <Loader loadingState={loading} />}
      {error && <ErrorMessage message={error} />}

      {!loading && !error && trendMovies.length > 0 && (
        <>
          <h2 className={css.title}>Now Showing</h2>
          <MovieList movies={trendMovies} />
        </>
      )}
    </div>
  );
}
