import { useCookies } from '@vueuse/integrations/useCookies';

type TokenType = 'access' | 'refresh';
export default function useToken() {
  const config = useRuntimeConfig();
  const { get, set, remove } = useCookies([
    config.public.ACCESS_TOKEN,
    config.public.REFRESH_TOKEN,
  ]);

  const getToken = (type: TokenType) => {
    if (type === 'access') {
      return get(config.public.ACCESS_TOKEN as string);
    } else {
      return get(config.public.REFRESH_TOKEN as string);
    }
  };
  const setToken = (type: TokenType, token: string) => {
    if (type === 'access') {
      return set(config.public.ACCESS_TOKEN as string, token);
    } else {
      return set(config.public.REFRESH_TOKEN as string, token);
    }
  };
  const removeToken = (type: TokenType) => {
    if (type === 'access') {
      return remove(config.public.ACCESS_TOKEN as string);
    } else {
      return remove(config.public.REFRESH_TOKEN as string);
    }
  };

  return { getToken, setToken, removeToken };
}
