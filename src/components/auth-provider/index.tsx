import { getUserLogin } from '@/apis/pet-store';
import { AUTH_STORAGE_KEY } from '@/constants';
import AuthContext from '@/contexts/auth';
import { FC, PropsWithChildren, useCallback, useEffect, useReducer } from 'react';

interface State {
  isLogin: boolean;
}

interface ReducerAction {
  type: string;
  payload?: any;
}

const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
  const [state, dispatch] = useReducer(
    (state: State, action: ReducerAction) => {
      console.log(action);
      switch (action.type) {
        case 'userLogin':
          return {
            ...state,
            isLogin: true,
          };
        default:
          return {
            ...state,
            isLogin: false,
          };
      }
    },
    { isLogin: false },
    (initialState) => {
      try {
        const state = JSON.parse(localStorage.getItem(AUTH_STORAGE_KEY) ?? '{}');
        return state;
      } catch (error) {}
      return {
        ...initialState,
        isLogin: false,
      };
    },
  );

  useEffect(() => {
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  const userLogin = useCallback(
    async (params: PetStore.LoginUser.QueryParameters) => {
      console.log(params);
      await getUserLogin(params);
      dispatch({
        type: 'userLogin',
      });
    },
    [dispatch],
  );

  return (
    <AuthContext.Provider
      value={{
        ...state,
        userLogin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
