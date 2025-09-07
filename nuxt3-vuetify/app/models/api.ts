export type MethodType = 'GET' | 'POST' | 'PUT' | 'DELETE';
export type ApiType = {
  method: MethodType;
  url: string;
  params?: { [key: string]: string };
  body?: { [key: string]: string };
};

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export interface ApiTokenResponse {
  success: boolean;
  message: string;
  token: { access_token: string; refresh_token: string };
}

export interface OauthResponse {
  success: boolean;
  message: string;
  url: string;
}
