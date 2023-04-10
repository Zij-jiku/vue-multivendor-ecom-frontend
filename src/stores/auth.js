import { defineStore } from "pinia";
import axiosInstance from "../services/axiosService";

export const useAuth = defineStore("auth", {
  state: () => ({
    user: {},
    loading: false,
  }),

  persist: {
    paths: ["user"],
  },
  actions: {
    async login(formData) {
      try {
        const res = await axiosInstance.post("/user/login", formData);

        if (res.status === 200) {
          // console.log(res.data);
          this.user = res.data;

          return new Promise((resolve) => {
            resolve(res.data);
          });
        }
      } catch (error) {
        if (error.response.data) {
          // this.errors = error.response.data.errors;

          return new Promise((reject) => {
            reject(error.response.data.errors);
          });
        }
      }
    },

    async register(formData) {
      try {
        const res = await axiosInstance.post("/user/register", formData);
        if (res.status === 200) {
          return new Promise((resolve) => {
            resolve(res.data);
          });
        }
      } catch (error) {
        if (error.response.data) {
          return new Promise((reject) => {
            reject(error.response.data.errors);
          });
        }
      }
    },

    async otpVerify(vData) {
      try {
        const res = await axiosInstance.post("/user/otp-verify", vData);
        if (res.status === 200) {
          this.user = res.data;
          return new Promise((resolve) => {
            resolve(res.data);
          });
        }
      } catch (error) {
        if (error.response.data) {
          return new Promise((reject) => {
            reject(error.response.data.errors);
          });
        }
      }
    },

    async resendOtp(phone) {
      try {
        const res = await axiosInstance.post("/user/otp-resend", {
          phone: phone,
        });
        if (res.status === 200) {
          this.user = res.data;
          return new Promise((resolve) => {
            resolve(res.data);
          });
        }
      } catch (error) {
        if (error.response.data) {
          return new Promise((reject) => {
            reject(error.response.data.errors);
          });
        }
      }
    },

    async logout() {
      this.loading = true;
      try {
        const res = await axiosInstance.post("/user/logout");
        if (res.status === 200) {
          this.user = {};
          return new Promise((resolve) => {
            resolve(res.data);
          });
        }
      } catch (error) {
        if (error.response) {
          return new Promise((reject) => {
            reject(error.response);
          });
        }
      } finally {
        this.loading = false;
      }
    },
  },
});
