import css from './MovieDetailsPage.module.css';

import { useState, useEffect, useRef, Suspense } from 'react';
import {
  useLocation,
  useParams,
  Outlet,
  Link,
  NavLink,
} from 'react-router-dom';
import { FaArrowAltCircleLeft } from 'react-icons/fa';

import { searchMovieById } from '../../services/service';

import MovieInfo from '../../components/MovieInfo/MovieInfo';
import Loader from '../../components/Loader/Loader';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';

export default function MovieDetailsPage() {
  const location = useLocation();
  const backLinkRef = useRef(location.state ?? '/movies');

  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const { movieId } = useParams();

  useEffect(() => {
    if (!movieId) return;
    setLoading(true);
    setError(false);

    searchMovieById(movieId)
      .then(data => setMovie(data))
      .catch(error =>
        setError(
          error.message || 'Something went wrong. Please try again later.'
        )
      )
      .finally(() => setLoading(false));
  }, [movieId]);

  return (
    <div className={css.container}>
      <Link className={css.link} to={backLinkRef.current}>
        <FaArrowAltCircleLeft /> Go back
      </Link>
      {loading && <Loader loadingState={loading} />}
      {error && <ErrorMessage message={error} />}

      {!loading && !error && movie && (
        <>
          <MovieInfo movie={movie} />
          <ul className={css.list}>
            <li>
              <NavLink
                to="cast"
                className={({ isActive }) =>
                  isActive ? `${css.navLink} ${css.active}` : css.navLink
                }
              >
                Cast
              </NavLink>
            </li>
            <li>
              <NavLink
                to="reviews"
                className={({ isActive }) =>
                  isActive ? `${css.navLink} ${css.active}` : css.navLink
                }
              >
                Reviews
              </NavLink>
            </li>
          </ul>
        </>
      )}

      <Suspense fallback={<Loader loadingState={loading} />}>
        <Outlet />
      </Suspense>
    </div>
  );
}
