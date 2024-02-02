import { api } from "@/app/common/axios";
import { AxiosError } from "axios";
import { useContext, createContext, useState, PropsWithChildren } from "react";
import { toast } from "react-toastify";

type AuthContextType = {
  isLogged: boolean;
  signUp: (
    name: string,
    email: string,
    address: string,
    password: string
  ) => void;
  signIn: (email: string, password: string) => void;
  signOut: () => void;
};
const AuthContext = createContext({} as AuthContextType);
export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [isLogged, setIsLogged] = useState(false);

  const signIn = async (email: string, password: string) => {
    try {
      const { data } = await api.post("/login", {
        email,
        password,
      });
      const { token } = data;
      localStorage.setItem("token", token);
      console.log(data);
      toast.success(data.message, {
        position: "top-center",
        hideProgressBar: true,
      });
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message ?? error.message, {
          position: "top-center",
          hideProgressBar: true,
        });
      }
      console.log(error), "FFF";
    }
  };
  const signUp = async (
    name: string,
    email: string,
    address: string,
    password: string
  ) => {
    try {
      const { data } = await api.post("/signUp", {
        name,
        email,
        address,
        password,
      });
      console.log(data);
      toast.success(data.message, {
        position: "top-center",
        hideProgressBar: true,
      });
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message ?? error.message, {
          position: "top-center",
          hideProgressBar: true,
        });
      }
      console.log(error), "FFF";
    }
  };
  return (
    <AuthContext.Provider
      value={{
        isLogged,
        signUp,
        signIn,
        signOut: () => {},
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
export const useAuth = () => useContext(AuthContext);
