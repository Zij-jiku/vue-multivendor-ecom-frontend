import { defineStore } from 'pinia'
import axiosInstance from '@/services/axiosService';

export const useProduct = defineStore('product', {
  state: () => ({
    products: {},
    loading: false,
  }),

  actions: {
    async getData() {
      try {
        const res = await axiosInstance.get("/products");
        if (res.status == 200) {
          this.products = res.data;
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
