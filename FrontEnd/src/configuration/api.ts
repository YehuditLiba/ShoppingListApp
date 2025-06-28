export const API_MODE = process.env.REACT_APP_API_MODE ?? 'local';

export const BASE_URL =
    API_MODE === 'local'
        ? process.env.REACT_APP_API_URL_LOCAL ?? 'http://localhost:5201'
        : process.env.REACT_APP_API_URL_PROD;
