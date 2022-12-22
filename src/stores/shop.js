import { defineStore } from 'pinia'
import axiosInstance from '@/services/axiosService';

export const useShop = defineStore('shop', {
  state: () => ({
    products: [],
  }),

  actions: {
    async index(page, show, sort) {
      try {
        const res = await axiosInstance.get(`/shop-products?page=${page}&limit=${show}&sort=${sort}`);
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
