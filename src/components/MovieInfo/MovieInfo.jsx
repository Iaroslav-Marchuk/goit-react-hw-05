import css from './MovieInfo.module.css';

export default function MovieInfo({ movie }) {
  return (
    <div className={css.container}>
      <img
        src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
        alt={movie.title}
        className={css.poster}
      />
      <div className={css.info}>
        <h2>{movie.title}</h2>
        <p>
          <strong>Original Title:</strong> {movie.original_title}
        </p>

        <p>
          <strong>Production:</strong>{' '}
          {movie.production_companies
            .map(company => `${company.name} (${company.origin_country})`)
            .join(', ')}
        </p>
        <p>
          <strong>Release Date:</strong> {movie.release_date}
        </p>
        <p>
          <strong>Overview:</strong> {movie.overview}
        </p>
        <p>
          <strong>Genres:</strong>{' '}
          {movie.genres.map(genre => genre.name).join(', ')}
        </p>
        <p>
          <strong>Rating:</strong> {movie.vote_average}
        </p>
      </div>
    </div>
  );
}
