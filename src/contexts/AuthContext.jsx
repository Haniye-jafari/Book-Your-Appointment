import { createContext } from 'react';

const AuthContext = createContext({
  authStatus: 'guest',
  user: null,
  login: () => {},
  logout: () => {},
});

export default AuthContext;
