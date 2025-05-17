import api from './api';

export const trendingMovies = async () => {
  const response = await api.get('/trending/movie/week');
  return response.data.results;
};

export const searchMovies = async query => {
  const response = await api.get('/search/movie', {
    params: {
      query: query,
    },
  });
  return response.data.results;
};

export const searchMovieById = async movieId => {
  const response = await api.get(`/movie/${movieId}`);
  return response.data;
};

export const searchMovieCast = async movieId => {
  const response = await api.get(`/movie/${movieId}/credits`);
  return response.data.cast;
};

export const searchMovieReviews = async movieId => {
  const response = await api.get(`/movie/${movieId}/reviews`);
  return response.data.results;
};
