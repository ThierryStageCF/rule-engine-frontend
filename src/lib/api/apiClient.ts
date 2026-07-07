import ky from 'ky';

/**
 * Instance de Ky configuré avec l'URL backend le type de corps des requêtes et un timeout.
 */
export const apiClient= ky.create({
    baseUrl: import.meta.env.VITE_BASE_URL,
    prefix: import.meta.env.VITE_PREFIX_URL,
    timeout: 30000,
    headers: {
        Accept: 'application/json',
    },
});