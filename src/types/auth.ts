export interface AuthEmailForm {
  email: string;
}

export interface AuthProfileForm {
  firstName: string;
  lastName?: string;
}

export interface AuthSignIn {
  email: string;
  password: string;
}

export interface AuthPassword {
  password: string;
}
