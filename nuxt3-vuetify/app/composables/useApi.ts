type MethodType = 'GET' | 'POST' | 'PUT' | 'DELETE';
type ApiType = {
  method: MethodType;
  url: string;
  params?: { [key: string]: string };
  body?: { [key: string]: string };
};

export default function useApi<T>({
  method,
  url,
  params,
  body,
}: ApiType): Promise<T> {
  const config = useRuntimeConfig();
  const { getToken } = useToken();
  const accessToken = getToken('access');
  const refreshToken = getToken('refresh');
  const apiUrl = config.public.API_URL;
  return $fetch(`${apiUrl}${url}`, {
    method,
    params,
    body,
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    onRequest: ({ options }) => {
      // 로그인 시 Authorization 에 Basic으로 전달
      if (method === 'POST' && url === '/auth/login') {
        options.headers.set(
          'Authorization',
          `Basic ${btoa(body?.email + ':' + body?.password)}`
        );
      }
      // 토큰 재발급 시 Authorization 에 refreshToken 추가
      if (method === 'POST' && url === '/auth/refreshToken') {
        options.headers.set('Authorization', `Bearer ${refreshToken}`);
      }
    },
    onResponse: () => {
      // console.log(options);
    },
    onError: (error: never) => {
      console.log(error);
    },
  });
}
