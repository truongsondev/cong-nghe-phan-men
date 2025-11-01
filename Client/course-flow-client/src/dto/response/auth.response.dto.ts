export interface ApiResponse<T> {
  success: boolean;
  data: T;
  timestamp: string;
}

export interface SignUpResponse {
  otpToken: string;
}
export interface SignInResponse {
  accessToken: string;
  refreshToken: string;
  user: any;
}

export interface TTLResponse {
  ttl: number;
}
export interface imageKitResponse {
  token: string;
  expire: number;
  signature: string;
}
