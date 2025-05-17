import css from './MoviesPage.module.css';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

import { searchMovies } from '../../services/service';

import MovieList from '../../components/MovieList/MovieList';
import Loader from '../../components/Loader/Loader';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import SearchForm from '../../components/SearchForm/SearchForm';

export default function MoviesPage() {
  const [movieSearch, setMovieSearch] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  const query = searchParams.get('query') ?? '';

  const handleSubmit = value => {
    setSearchParams({ query: value });
  };

  useEffect(() => {
    if (!query) {
      setMovieSearch([]);
      return;
    }
    setLoading(true);
    setError(false);

    searchMovies(query)
      .then(data => {
        setMovieSearch(data);
      })
      .catch(error =>
        setError(
          error.message || 'Something went wrong. Please try again later.'
        )
      )

      .finally(() => {
        setLoading(false);
      });
  }, [query]);

  return (
    <div className={css.container}>
      <SearchForm onSearch={handleSubmit} />

      {loading && <Loader loadingState={loading} />}
      {error && <ErrorMessage message={error} />}

      {!loading && !error && movieSearch.length > 0 && (
        <>
          <h2 className={css.title}>Results</h2>
          <MovieList movies={movieSearch} />
        </>
      )}

      {!loading && !error && movieSearch.length === 0 && query && (
        <p className={css.noResults}>Could not find movies for {query}</p>
      )}
    </div>
  );
}
