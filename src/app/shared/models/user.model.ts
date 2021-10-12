export class User {
  email!: string;
  password!: string;
  returnSecureToken!: boolean;
  idToken!: string;
  refreshToken!: string;
  localId!: string;
  expiresIn!: number;
  kind!: string;
  favourites: Array<string>;
}
