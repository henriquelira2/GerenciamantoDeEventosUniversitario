import { createContext } from "react";

const AuthContext = createContext({
  setUser: (user: boolean) => {
    // eslint-disable-next-line no-unused-expressions
    false;
  },
});

export { AuthContext };
