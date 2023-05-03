import { defineStore } from "pinia";
import axiosInstance from "@/services/AxiosService";

export const useShop = defineStore("shop", {
  state: () => ({
    products: [],
    sidebar: [],
  }),

  actions: {
    async index(page, show, condition, brand, cat, price_range, search, sort) {
      try {
        // const res = await axiosInstance.get(
        //   `/shop-products?page=${page}&show=${show}&condition=${condition}`
        // );
        const res = await axiosInstance.get(`/shop-products`, {
          params: {
            page,
            show,
            condition,
            brand: brand,
            category: cat,
            price_range: price_range,
            search: search.length >= 3 ? search : "",
            sort: sort,
          },
        });
        if (res.status === 200) {
          this.products = res.data;
        }
      } catch (error) {
        if (error.response.data) {
          console.log(error.response.data);
        }
      }
    },

    async sidebarData() {
      try {
        const res = await axiosInstance.get("/shop-sidebar");

        if (res.status === 200) {
          this.sidebar = res.data;
        }
      } catch (error) {
        if (error.response.data) {
          console.log(error.response.data);
        }
      }
    },
  },
});
