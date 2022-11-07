import { defineStore } from 'pinia'
import axiosInstance from '@/services/axiosService';

export const useSeller = defineStore('seller', {
  state: () => ({
    sellers: {},
    loading: false,
  }),

  actions: {
    async index() {
      try {
        const res = await axiosInstance.get("/sellers");
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

  },
});
