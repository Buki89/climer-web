import React, { FC, ReactNode, useContext, useState } from "react";

// type User = {
//   username: string;
// };

type State = {
  username: string;
};

const defaultValues: State = {
  username: null,
};

type UserContextState = State & {
  setUsername: React.Dispatch<React.SetStateAction<string>>;
};

const UserContext = React.createContext<UserContextState>({
  ...defaultValues,
  setUsername: () => {},
});

const useUserContext = (): UserContextState =>
  useContext<UserContextState>(UserContext);

type SocketProviderProps = {
  children: ReactNode;
};

const UserProvider: FC<SocketProviderProps> = ({ children }) => {
  const [username, setUsername] = useState<string>("");

  const value = {
    username,
    setUsername,
  } as UserContextState;

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export { UserProvider, useUserContext };
