export interface UserResponse {
  id: string;
  email: string;
  avt_url: string | null;
  bio: string | null;
  name: string | null;
  created_at: Date;
  updated_at: Date;
  role_id: number;
  user_verified: boolean;
}
