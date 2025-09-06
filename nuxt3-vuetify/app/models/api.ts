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
