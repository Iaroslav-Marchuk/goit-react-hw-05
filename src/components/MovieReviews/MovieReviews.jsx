import css from './MovieReviews.module.css';

import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

import { searchMovieReviews } from '../../services/service';

import Loader from '../Loader/Loader';
import ErrorMessage from '../ErrorMessage/ErrorMessage';

export default function MovieReviews() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const { movieId } = useParams();

  useEffect(() => {
    if (!movieId) return;
    setLoading(true);
    setError(false);

    searchMovieReviews(movieId)
      .then(data => {
        setReviews(data);
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

  return (
    <div className={css.container}>
      {loading && <Loader loadingState={loading} />}
      {error && <ErrorMessage message={error} />}
      {!loading &&
        !error &&
        reviews.length > 0 &&
        reviews.map(review => (
          <div className={css.wrapper} key={review.id}>
            <h3 className={css.author}>{review.author}</h3>
            <p className={css.text}>{review.content}</p>
            <p className={css.date}>added {review.created_at.slice(0, 10)}</p>
          </div>
        ))}

      {!loading && !error && reviews.length === 0 && (
        <p className={css.noResults}>Not comentaries yet!</p>
      )}
    </div>
  );
}
