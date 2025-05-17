import css from './MovieList.module.css';

import { Link, useLocation } from 'react-router-dom';

export default function MovieList({ movies }) {
  const location = useLocation();
  return (
    <>
      <ul className={css.list}>
        {movies.map(movie => (
          <li key={movie.id} className={css.item}>
            <Link
              className={css.link}
              to={`/movies/${movie.id}`}
              state={location}
            >
              <img
                className={css.img}
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
              />
              <div className={css.wrapper}>
                <h3 className={css['movie-title']}>{movie.title}</h3>

                <p>{`Release ${movie.release_date}`}</p>
                <p>{`Rating ${movie.vote_average}`}</p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}
