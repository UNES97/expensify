const mode = import.meta.env.DEV;
export const BASE_URL = mode ? 'http://localhost:3000/' :  `${window.location.origin}/`;