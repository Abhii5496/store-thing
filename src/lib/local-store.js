import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

const localData = (set) => ({
  wishlist: [],
  cart: [],
  total: 0,

  addLocalCart: (item) => {
    set((state) => ({
      cart: [item, ...state.cart],
    }));
  },

  removeLocalCart: (id) => {
    set((state) => ({
      cart: state.cart.filter((item) => item.productId !== id),
    }));
  },

  clearLocalCart: () => {
    set((state) => ({
      cart: [],
    }));
  },

  updateLocalCart: (id, qty) => {
    set((state) => {
      const updateCart = state.cart.map((item) => {
        if (id === item.productId) {
          return {
            ...item,
            quantity: qty,
          };
        }
        return item;
      });

      return {
        cart: updateCart,
      };
    });
  },

  addLocalWish: (item) => {
    set((state) => ({
      wishlist: [item, ...state.wishlist],
    }));
  },

  removeLocalWish: (id) => {
    set((state) => ({
      wishlist: state.wishlist.filter((item) => item.productId !== id),
    }));
  },

  clearLocalWish: () => {
    set((state) => ({
      wishlist: [],
    }));
  },
});

const useLocalData = create(devtools(persist(localData, { name: "local" })));

export default useLocalData;
