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
import { useRouter } from "next/navigation";

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
type DeliveryAddress = {
  additional: string;
  bair: string;
  district: string;
  khoroo: string;
  paymentMethod: boolean;
  phone: string;
};
type Order = {
  createdAt: Date;
  deliveryStatus: string;
  userID: string;
  _v: number;
  _id: string;
  deliveryAddress: DeliveryAddress[];
  foods: Basket[];
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
  postOrder: (deliveryAddress: DeliveryAddress, order: Basket[]) => void;
  categories: Category[];
  getOrderList: () => void;
  setCategories: Dispatch<SetStateAction<Category[]>>;
  refreshF: () => void;
  foods: Food[];
  setFoods: Dispatch<SetStateAction<Food[]>>;
  basket: Basket[];
  setBasket: Dispatch<SetStateAction<Basket[]>>;
  sumBasket: number;
  searchValue: string;
  setSearchValue: Dispatch<SetStateAction<string>>;
  orderList: Order[];
};

const DataContext = createContext({} as DataContextType);
export const DataProvider = ({ children }: PropsWithChildren) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [foods, setFoods] = useState<Food[]>([]);
  const [basket, setBasket] = useState<Basket[]>([]);
  const [isFirstRender, setIsFirstRender] = useState(true);
  const [refresh, setRefresh] = useState(0);
  const { isReady, setIsReady } = useAuth();
  const [searchValue, setSearchValue] = useState("");
  const [orderList, setOrderList] = useState<Order[]>([]);
  const router = useRouter();

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
  const postOrder = async (
    deliveryAddress: DeliveryAddress,
    order: Basket[]
  ) => {
    try {
      const { data } = await api.post(
        "/order/postOrder",
        {
          deliveryAddress,
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
      router.push("/OrderList");
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

  const getOrderList = async () => {
    try {
      const { data } = await api.get("order/getOrderList", {
        headers: { Authorization: localStorage.getItem("token") },
      });
      setOrderList(data);
    } catch (error) {
      console.log(error), "FFF";
    }
  };

  useEffect(() => {
    setIsReady(false);
    getCategories();
    getFoods();
    getOrderList();
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

  const sumBasket = basket.reduce((sum, currentValue) => {
    return (
      sum +
      currentValue.foodPrice *
        currentValue.foodCount *
        (1 - 0.01 * (currentValue.discount || 0))
    );
  }, 0);

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
        searchValue,
        setSearchValue,
        postOrder,
        getOrderList,
        sumBasket,
        orderList,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
export const useData = () => useContext(DataContext);
