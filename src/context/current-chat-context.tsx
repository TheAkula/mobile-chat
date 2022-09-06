import { createContext, ReactNode, useContext, useState } from "react";

interface Value {
  currentChat: string;
  setCurrentChat: (id: string) => void;
}

const CurrentChatContext = createContext<Value>({
  currentChat: "",
  setCurrentChat: () => undefined,
});

interface Props {
  children: ReactNode;
}

export const CurrentChatContextProvider = ({ children }: Props) => {
  const [currentChat, setCurrentChat] = useState("");

  const updateCurrentChat = (id: string) => {
    setCurrentChat(id);
  };

  return (
    <CurrentChatContext.Provider
      value={{ currentChat, setCurrentChat: updateCurrentChat }}
    >
      {children}
    </CurrentChatContext.Provider>
  );
};

export const useCurrentChatContext = () => useContext(CurrentChatContext);
