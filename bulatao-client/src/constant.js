const DEPLOYED_API_URL = 'https://bulatao-web-prog-knyn.vercel.app';
const configuredApiUrl = import.meta.env.VITE_API_URL;
const isLocalApiUrl = configuredApiUrl?.includes('localhost');

const HOST = import.meta.env.PROD && (!configuredApiUrl || isLocalApiUrl)
  ? DEPLOYED_API_URL
  : configuredApiUrl;

export default {
    HOST,
}
