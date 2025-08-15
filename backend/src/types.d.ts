export interface User {
  id: number;
  email: string;
  password: string;
  created_at: string;
}

export interface UserPublic {
  id: number;
  email: string;
  created_at: string;
}
