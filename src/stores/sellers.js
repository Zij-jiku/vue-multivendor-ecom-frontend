import { defineStore } from 'pinia'
import axiosInstance from '@/services/axiosService';

export const useSeller = defineStore('seller', {
  state: () => ({
    sellers: [],
    products: {},
  }),

  actions: {
    async index(page, show) {
      try {
        const res = await axiosInstance.get(`/sellers?page=${page}&limit=${show}`);
        if (res.status == 200) {
          this.sellers = res.data;
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

    async productByShop(slug, page, show, sort) {
      try {
        const res = await axiosInstance.get(`/sellers/products/${slug}?page=${page}&limit=${show}&sort=${sort}`);
        if (res.status == 200) {
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
