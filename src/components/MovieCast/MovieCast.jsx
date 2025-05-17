import css from './MovieCast.module.css';

import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

import { searchMovieCast } from '../../services/service';

import Loader from '../Loader/Loader';
import ErrorMessage from '../ErrorMessage/ErrorMessage';

export default function MovieCast() {
  const [casts, setCasts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const { movieId } = useParams();

  useEffect(() => {
    if (!movieId) return;
    setLoading(true);
    setError(false);

    searchMovieCast(movieId)
      .then(data => {
        setCasts(data);
      })
      .catch(error =>
        setError(
          error.message || 'Something went wrong. Please try again later.'
        )
      )
      .finally(() => {
        setLoading(false);
      });
  }, [movieId]);

  const defaultImg =
    'https://dl-media.viber.com/10/share/2/long/vibes/icon/image/0x0/95e0/5688fdffb84ff8bed4240bcf3ec5ac81ce591d9fa9558a3a968c630eaba195e0.jpg';

  return (
    <div className={css.container}>
      {loading && <Loader loadingState={loading} />}
      {error && <ErrorMessage message={error} />}

      {!loading &&
        !error &&
        casts.length > 0 &&
        casts.map(cast => (
          <div className={css.person} key={cast.id}>
            <img
              className={css.image}
              src={
                cast.profile_path
                  ? `https://image.tmdb.org/t/p/w500/${cast.profile_path}`
                  : defaultImg
              }
              alt="poster"
            />
            <h3 className={css.name}>{cast.name}</h3>
            <p className={css.text}>Character: {cast.character}</p>
          </div>
        ))}
    </div>
  );
}
