import { useContext, createContext, PropsWithChildren } from "react";

type DataContextType = {};
const DataContext = createContext({} as DataContextType);
export const DataProvider = ({ children }: PropsWithChildren) => {
  return <DataContext.Provider value={{}}>{children}</DataContext.Provider>;
};
export const useData = () => useContext(DataContext);
