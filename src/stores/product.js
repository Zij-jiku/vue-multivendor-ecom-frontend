import { defineStore } from "pinia";
import axiosInstance from "@/services/axiosService";

export const useProduct = defineStore("product", {
  state: () => ({
    products: {},
    sales: [],
    popular: [],
    features: [],
    winters: [],
    newItems: [],
    loading: false,
  }),

  actions: {
    async getData(type = "") {
      try {
        const res = await axiosInstance.get("/products?conditions=" + type);
        if (res.status == 200) {
          if (type === "sale") {
            this.sales = res.data;
          } else if (type === "popular") {
            this.popular = res.data;
          } else if (type === "feature") {
            this.features = res.data;
          } else if (type === "winter") {
            this.winters = res.data;
          } else if (type === "new") {
            this.newItems = res.data;
          } else {
            this.products = res.data;
          }
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
  },
});
