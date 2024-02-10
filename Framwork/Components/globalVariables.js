import { createContext, useState } from "react";

const AppContext = createContext();

function AppProvider({ children }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState(undefined);
  const [preloader, setPreloader] = useState(false);
  const [userUID, setUserUID] = useState("");
  const [userInfo, setUserInfo] = useState("");
  const [targetID, setTargetID] = useState("");
  const [allTargets, setAllTargets] = useState([]);

  return (
    <AppContext.Provider
      value={{
        email,
        setEmail,
        password,
        setPassword,
        preloader,
        setPreloader,
        userUID,
        setUserUID,
        userInfo,
        setUserInfo,
        targetID,
        setTargetID,
        allTargets,
        setAllTargets,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export { AppContext, AppProvider };
