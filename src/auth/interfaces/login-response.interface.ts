export interface PayloadResponse {
  email: string;
  sub: string;
}

export interface LoginResponse {
  access_token: string;
  user: PayloadResponse;
}
