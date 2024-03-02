import { api } from "@/app/common/axios";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import {
  useContext,
  createContext,
  useState,
  PropsWithChildren,
  Dispatch,
  SetStateAction,
  useEffect,
} from "react";
import { toast } from "react-toastify";
import { LoadingPage } from "../LoadingPage";

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
  sendEmail: (email: string) => void;
  resetPassword: (email: string, password: string, otp: string) => void;
  otp: string;
  setOtp: Dispatch<SetStateAction<string>>;
  email: string;
  setEmail: Dispatch<SetStateAction<string>>;
  refresh: number;
  setRefresh: Dispatch<SetStateAction<number>>;
  user: {
    name: string;
    email: string;
    phone: string;
    address: string;
    password: string;
    role: string;
    profilePic: string;
  };
  setUser: Dispatch<
    SetStateAction<{
      name: string;
      email: string;
      phone: string;
      address: string;
      password: string;
      role: string;
      profilePic: string;
    }>
  >;
  isAdmin: boolean;
  isReady: boolean;
  setIsReady: Dispatch<SetStateAction<boolean>>;
};
const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [isLogged, setIsLogged] = useState(false);
  const [otp, setOtp] = useState("");
  const [email, setEmail] = useState("");
  const [refresh, setRefresh] = useState(0);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    password: "",
    role: "",
    profilePic:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
  });
  const router = useRouter();

  const signIn = async (email: string, password: string) => {
    try {
      const { data } = await api.post("auth/login", {
        email,
        password,
      });
      const { token } = data;
      localStorage.setItem("token", token);
      toast.success(data.message, {
        position: "top-center",
        hideProgressBar: true,
      });
      setIsLogged(true);
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
      const { data } = await api.post("auth/signUp", {
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
  const signOut = async () => {
    try {
      localStorage.removeItem("token");
      localStorage.removeItem("basket");
      setIsLogged(false);
      setIsAdmin(false);
      router.push("/");
    } catch (error) {
      console.log(error), "FFF";
    }
  };
  const sendEmail = async (email: string) => {
    const { data } = await api.post("/reset/sendEmail", { email });

    toast.success(data.message, {
      position: "top-center",
      hideProgressBar: true,
    });
  };
  const resetPassword = async (
    email: string,
    password: string,
    otp: string
  ) => {
    try {
      const { data } = await api.post("/reset/resetPassword", {
        email,
        password,
        otp,
      });
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
  const getUser = async () => {
    try {
      const { data } = await api.get("user/getUser", {
        headers: { Authorization: localStorage.getItem("token") },
      });

      setUser(data);
      const { role } = data;
      if (role == "admin") {
        setIsAdmin(true);
      }
      toast.success(data.message, {
        position: "top-center",
        hideProgressBar: true,
      });
      setIsLogged(true);
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

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLogged(true);
    }
  }, []);

  useEffect(() => {
    setIsReady(false);
    if (isLogged) {
      getUser();
    }
    setIsReady(true);
  }, [isLogged, refresh]);

  return (
    <AuthContext.Provider
      value={{
        isLogged,
        signUp,
        signIn,
        signOut,
        sendEmail,
        resetPassword,
        otp,
        setOtp,
        email,
        setEmail,
        user,
        setUser,
        refresh,
        setRefresh,
        isAdmin,
        isReady,
        setIsReady,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
export const useAuth = () => useContext(AuthContext);
