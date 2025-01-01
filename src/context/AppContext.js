import { createContext, useContext, useMemo, useReducer } from "react";

// =================================================================================

// =================================================================================

const INITIAL_WISHLIST = [];
const INITIAL_CART = [];
const USER = [];
const SUCCESS_ORDER = [];

const INITIAL_STATE = {
  cart: INITIAL_CART,
  wishlist: INITIAL_WISHLIST,
  user: USER,
  successOrder: SUCCESS_ORDER,
};
const AppContext = createContext({
  state: INITIAL_STATE,
  dispatch: () => {},
});
const reducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_CART_ARRAY":
      const newData = action.payload;
      return {
        ...state,
        cart: newData,
      };

    case "CHANGE_CART_AMOUNT":
      let cartList = state.cart;
      let cartItem = action.payload;
      let exist = cartList.find((item) => item.id === cartItem.id);
      if (cartItem.qty < 1) {
        const filteredCart = cartList.filter((item) => item.id !== cartItem.id);
        return {
          ...state,
          cart: filteredCart,
        };
      }

      // IF PRODUCT ALREADY EXITS IN CART
      if (exist) {
        const newCart = cartList.map((item) =>
          item.id === cartItem.id
            ? {
                ...item,
                qty: cartItem.qty,
              }
            : item
        );
        return {
          ...state,
          cart: newCart,
        };
      }
      return {
        ...state,
        cart: [...cartList, cartItem],
      };

    case "ADD_TO_WISHLIST_ARRAY":
      const items = action.payload;
      return {
        ...state,
        wishlist: items,
      };

    case "ADD_TO_WISHLIST":
      const newItem = action.payload;
      if (!state.wishlist.some((item) => item.id === newItem.id)) {
        // Add the item to the wishlist if it's not already in the wishlist
        return {
          ...state,
          wishlist: [...state, ...newItem],
        };
      }
      return state; // If the item is already in the wishlist, do nothing

    case "REMOVE_FROM_WISHLIST":
      const itemIdToRemove = action.payload;
      const updatedWishlist = state.wishlist.filter(
        (item) => item.id !== itemIdToRemove
      );
      return {
        ...state,
        wishlist: updatedWishlist,
      };

    case "ADD_TEST_TO_CART":
      return {
        ...state,
        labDiag: [...state.labDiag, action.payload],
      };
    case "REMOVE_TEST_FROM_CART":
      return {
        ...state,
        labDiag: state.labDiag.filter((item) => item.id !== action.payload),
      };
    case "CLEAR_TEST_CART":
      return {
        ...state,
        labDiag: [],
      };
    case "SET_USER":
      const userData = action.payload;
      return {
        ...state,
        user: userData,
      };
    case "SUCCESS_ORDER":
      return {
        ...state,
        successOrder: action.payload,
      };

    case "ADD_PACKAGE_TO_CART":
      return {
        ...state,
        package: [action.payload],
      };
    case "REMOVE_PACKAGE_FROM_CART":
      return {
        ...state,
        package: state.package.filter((item) => item.id !== action.payload),
      };
    case "CLEAR_PACKAGE_CART":
      return {
        ...state,
        package: [],
      };

    case "UPDATE_BLOG_INFO":
      const data = action.payload;
      // console.log(data, "context state");
      return {
        ...state,
        userBlogInfo: data,
      };

    default: {
      return state;
    }
  }
};

// =======================================================

// =======================================================

export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);
  const contextValue = useMemo(
    () => ({
      state,
      dispatch,
    }),
    [state, dispatch]
  );
  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
};
export const useAppContext = () => useContext(AppContext);
export default AppContext;
