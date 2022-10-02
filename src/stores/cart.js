import { defineStore } from "pinia";

export const useCart = defineStore("cart", {
  state: () => ({
    cartItems: [],
  }),
  persist: {
    paths: ["cartItems"],
  },

  getters: {
    totalPirce: (state) => {
      let total = 0;
      state.cartItems.map((el) => {
        total += el["price"] * el["quantity"];
      });
      return total;
    },

    cartItemsCount: (state) => {
      let total = 0;
      state.cartItems.map((el) => {
        total += el["quantity"];
      });
      return total;
    },
  },

  actions: {
    addToCart(product) {
      let item = product;
      item = { ...item, quantity: 1 };

      if (this.cartItems.length > 0) {
        let hasItem = this.cartItems.some((i) => i.id === item.id);
        if (hasItem) {
          let index = this.cartItems.findIndex((i) => i.id === item.id);
          this.cartItems[index]["quantity"] += 1;
        } else {
          this.cartItems.push(item);
        }
      } else {
        this.cartItems.push(item);
      }
    },

    async destroy(index) {
      if (this.cartItems.length > 0) {
        this.cartItems.splice(index, 1);
      }
    },

    async increment(index) {
      if (this.cartItems.length > 0) {
        if (this.cartItems[index]["quantity"] !== 10) {
          this.cartItems[index]["quantity"] += 1;
        }
      }
    },

    async decrement(index) {
      if (this.cartItems.length > 0) {
        if (this.cartItems[index]["quantity"] !== 1) {
          this.cartItems[index]["quantity"] -= 1;
        }
      }
    },
  },
});
