import { createContext, useContext } from 'react';

const AuthContext = createContext({
  authStatus: 'guest',
  user: null,
  login: () => {},
  logout: () => {},
});

export function useAuth() {
  return useContext(AuthContext);
}

export default AuthContext;
