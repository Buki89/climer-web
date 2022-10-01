import React, { FC, ReactNode, useContext, useState } from "react";

type User = {
  username: string;
};

type State = {
  user: User | null;
};

const defaultValues: State = {
  user: null,
};

type UserContextState = State & {
  setUser: React.Dispatch<React.SetStateAction<User>>;
};

const UserContext = React.createContext<UserContextState>({
  ...defaultValues,
  setUser: () => {},
});

const useUserContext = (): UserContextState =>
  useContext<UserContextState>(UserContext);

type SocketProviderProps = {
  children: ReactNode;
};

const UserProvider: FC<SocketProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  const value = {
    user,
    setUser,
  } as UserContextState;

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export { UserProvider, useUserContext };
