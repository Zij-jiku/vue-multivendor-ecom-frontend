import { defineStore } from 'pinia'
import axiosInstance from '@/services/axiosService';

export const useCategory = defineStore('category', {
  state: () => ({
    categories: {},
    loading: false,
  }),

  actions: {
    async getData() {
      try {
        const res = await axiosInstance.get("/categories");
        if (res.status == 200) {
          this.categories = res.data;
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
