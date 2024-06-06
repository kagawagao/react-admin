import { createContext } from 'react';

export interface AuthContextValues {
  isLogin: boolean;
  userLogin: (params: PetStore.LoginUser.QueryParameters) => Promise<void> | void;
}

const AuthContext = createContext<AuthContextValues>({
  isLogin: false,
  userLogin: () => {},
});

export default AuthContext;
