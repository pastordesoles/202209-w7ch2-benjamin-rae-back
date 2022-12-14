export interface LoginBody {
  username: string;
  password: string;
}

export interface UserStructure {
  username: string;
  password: string;
  id: string;
}

export interface RegisterBody extends LoginBody {
  email: string;
}
