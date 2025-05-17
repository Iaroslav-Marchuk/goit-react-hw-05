import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  headers: {
    Authorization:
      'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1MDQzMjZhZWVhNzY3ODUyNWVmYzNjNzY3ZjU2MzY2MyIsIm5iZiI6MS43NDcyNTI3NDc5MTY5OTk4ZSs5LCJzdWIiOiI2ODI0ZjYwYjNlZWVjODgyNzRhZDllMmEiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.EAvpcLRm2crMhPomOE_0C9SUlvQRgfqRkV3pc1tQcL0',
  },
});

export default api;
