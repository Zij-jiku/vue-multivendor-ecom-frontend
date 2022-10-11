import { defineStore } from "pinia";
import axiosInstance from '@/services/axiosService';

export const useWishlist = defineStore("wishlist", {
  state: () => ({
    wishlists: [],
    loading: false,
  }),

  actions: {
    async getData() {
      try {
        const res = await axiosInstance.get("/wishlists");
        if (res.status == 200) {
          this.wishlists = res.data;
          return new Promise((resolve) => {
            resolve(res.data);
          });

        }
      } catch (error) {
        if (error.response.data) {
          console.log(error.response.data);
        }
      }
    },

    async addToWishlist(product) {
      try {
        const res = await axiosInstance.post("/user/wishlists", { product_id: product.id });
        if (res.status) {
          return new Promise((resolve) => {
            resolve(res);
          });
        }

      } catch (error) {
        if (error.response.data) {
          console.log(error.response.data);
        }
      }
    },

  },
});
