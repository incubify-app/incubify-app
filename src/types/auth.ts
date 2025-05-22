
export interface User {
  id: number;
  name: string;
  email: string;
  avatar: string;
  startupName: string;
  startupStage: number;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  startupName: string;
}
