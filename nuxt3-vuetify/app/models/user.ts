export interface User {
  id: string;
  email: string;
  name: string;
  role: string;
  type: string;
  profileImage: string | null;
  iat: number;
  exp: number;
}
