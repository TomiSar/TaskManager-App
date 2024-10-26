export type UserLogin = {
  email: string;
  password: string;
};

export interface UserRegister extends UserLogin {
  firstName: string;
  lastName: string;
}

export interface UserAuth {
  onLogin: () => void;
}
