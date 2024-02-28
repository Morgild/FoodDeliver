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
import { useAuth } from "./AuthProvider";
import { LoadingPage } from "../LoadingPage";
import { stringify } from "querystring";
import { convertLength } from "@mui/material/styles/cssUtils";

type Food = {
  foodName: string;
  foodCategory: string;
  foodIngredients: string;
  foodPrice: number;
  discount: number;
  foodPic: string;
};
type Category = {
  foodCategory: string;
};
type Basket = {
  foodName: string;
  foodCategory: string;
  foodIngredients: string;
  foodPrice: number;
  discount?: number;
  foodPic: string;
  foodCount: number;
};
type DataContextType = {
  getCategories: () => void;
  postCategory: (foodCategory: string) => void;
  postFood: (
    foodName: string,
    foodCategory: string,
    foodIngerdients: string,
    foodPrice: number,
    discount: number,
    foodPic: string
  ) => void;
  categories: Category[];
  setCategories: Dispatch<SetStateAction<Category[]>>;
  refreshF: () => void;
  foods: Food[];
  setFoods: Dispatch<SetStateAction<Food[]>>;
  basket: Basket[];
  setBasket: Dispatch<SetStateAction<Basket[]>>;
};

const DataContext = createContext({} as DataContextType);
export const DataProvider = ({ children }: PropsWithChildren) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [foods, setFoods] = useState<Food[]>([]);
  const [basket, setBasket] = useState<Basket[]>([]);
  const [isFirstRender, setIsFirstRender] = useState(true);
  const [refresh, setRefresh] = useState(0);
  const { isReady, setIsReady } = useAuth();

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
    } catch (error) {
      console.log(error), "FFF";
    }
  };

  const getFoods = async () => {
    try {
      const { data } = await api.get("food/getFoods", {
        headers: { Authorization: localStorage.getItem("token") },
      });
      setFoods(data);
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
    foodCategory: string,
    foodIngredients: string,
    foodPrice: number,
    discount: number,
    foodPic: string
  ) => {
    try {
      const { data } = await api.post(
        "/food/postFood",
        {
          foodName,
          foodCategory,
          foodIngredients,
          foodPrice,
          discount,
          foodPic,
        },
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

  //send order
  const postOrder = async (order: object) => {
    try {
      const { data } = await api.post(
        "/food/postOrder",
        {
          order,
        },
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
    setIsReady(false);
    getCategories();
    getFoods();
    setIsReady(true);
  }, [refresh]);

  useEffect(() => {
    const basket = localStorage.getItem("basket");
    if (basket) {
      setBasket(JSON.parse(basket));
    }
    setIsFirstRender(false);
  }, []);

  useEffect(() => {
    if (isFirstRender) return;
    localStorage.setItem("basket", JSON.stringify(basket));
  }, [basket]);

  return (
    <DataContext.Provider
      value={{
        getCategories,
        categories,
        setCategories,
        postCategory,
        postFood,
        refreshF,
        foods,
        setFoods,
        basket,
        setBasket,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
export const useData = () => useContext(DataContext);
