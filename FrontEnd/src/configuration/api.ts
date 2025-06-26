const API_MODE = process.env.REACT_APP_API_MODE;

export const BASE_URL =
    API_MODE === 'prod'
        ? process.env.REACT_APP_API_URL_PROD
        : process.env.REACT_APP_API_URL_LOCAL ?? 'http://localhost:8080';
