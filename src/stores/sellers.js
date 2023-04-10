import { defineStore } from "pinia";
import axiosInstance from "@/services/AxiosService";

export const useSeller = defineStore("seller", {
  state: () => ({
    sellers: [],
    products: {},
  }),

  actions: {
    async index(page, show) {
      try {
        const res = await axiosInstance.get(
          `/sellers?page=${page}&show=${show}`
        );

        if (res.status === 200) {
          this.sellers = res.data;
        }
      } catch (error) {
        if (error.response.data) {
          console.log(error.response.data);
        }
      }
    },

    async sellerProductsBySlug(slug, page, show, sort) {
      try {
        const res = await axiosInstance.get(
          `/sellers/products/${slug}?page=${page}&show=${show}&sort=${sort}`
        );
        if (res.status === 200) {
          this.products = res.data;
        }
      } catch (error) {
        if (error.response.data) {
          console.log(error.response.data);
        }
      }
    },
  },
});
