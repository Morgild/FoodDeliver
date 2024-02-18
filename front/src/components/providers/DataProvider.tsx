import { api } from "@/app/common/axios";
import { AxiosError } from "axios";
import {
  useContext,
  createContext,
  PropsWithChildren,
  useState,
  Dispatch,
  SetStateAction,
  useEffect,
} from "react";
import { toast } from "react-toastify";

type DataContextType = {
  getCategories: () => void;
  postCategory: (foodCategory: string) => void;
  categories: Array<string>;
  setCategories: Dispatch<SetStateAction<Array<string>>>;
  refreshF: () => void;
};
const DataContext = createContext({} as DataContextType);
export const DataProvider = ({ children }: PropsWithChildren) => {
  const [categories, setCategories] = useState<string[]>([]);
  const [refresh, setRefresh] = useState(0);

  //refresh Function
  const refreshF = () => {
    setRefresh((prev) => prev + 1);
  };

  //get Categories function
  const getCategories = async () => {
    try {
      const { data } = await api.get("food/getCategories", {
        headers: { Authorization: localStorage.getItem("token") },
      });
      setCategories(data);
      console.log(data);
    } catch (error) {
      console.log(error), "FFF";
    }
  };

  //create new category
  const postCategory = async (foodCategory: string) => {
    try {
      const { data } = await api.post(
        "food/postCategory",
        { foodCategory },
        {
          headers: { Authorization: localStorage.getItem("token") },
        }
      );
      toast.success(data.message, {
        position: "top-center",
        hideProgressBar: true,
      });
      setRefresh(refresh + 1);
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
  //create new food
  const postFood = async (
    foodName: string,
    foodPrice: number,
    discount: number,
    foodCategory: string,
    foodPic: string
  ) => {
    try {
      const { data } = await api.post(
        "food/postFood",
        { foodName, foodPrice, discount, foodCategory, foodPic },
        {
          headers: { Authorization: localStorage.getItem("token") },
        }
      );
      toast.success(data.message, {
        position: "top-center",
        hideProgressBar: true,
      });
      setRefresh(refresh + 1);
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
    getCategories();
  }, [refresh]);
  return (
    <DataContext.Provider
      value={{
        getCategories,
        categories,
        setCategories,
        postCategory,
        refreshF,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
export const useData = () => useContext(DataContext);
