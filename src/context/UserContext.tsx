import { createContext, ReactNode, useState, FC } from "react";

export interface UserContextInterface {
    userId: string;
    setUserId: (userId: string) => void;
}

export const UserContext = createContext<UserContextInterface>({
    userId: "",
    setUserId: () => {},
});

export const UserContextProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const [userId, setUserId] = useState("");
    return (
        <UserContext.Provider value={{ userId, setUserId }}>
            {children}
        </UserContext.Provider>
    );
}
