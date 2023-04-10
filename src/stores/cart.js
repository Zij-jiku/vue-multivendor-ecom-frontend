import { defineStore } from "pinia";
import { ref } from "vue";
export const useCart = defineStore("cart", {
  state: () => ({
    cartItems: [],
    isOpen: false,
  }),

  persist: {
    paths: ["cartItems"],
  },

  getters: {
    totalPrice: (state) => {
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
    toggleCartSidebar() {
      this.isOpen = !this.isOpen;
    },
    addToCart(product) {
      const price = ref();

      if (product.discount) {
        var firstprice = product.price;
        var discount = product.discount / 100;
        var totalPrice = firstprice - firstprice * discount;
        price.value = totalPrice.toFixed();
      } else {
        price.value = product.price;
      }

      // let item = product;
      let item = {
        id: product.id,
        name: product.name,
        price: price.value,
        thumbnail: product.thumbnail,
      };

      item = { ...item, quantity: 1 };

      if (this.cartItems.length > 0) {
        let boolean = this.cartItems.some((i) => i.id === item.id);
        if (boolean) {
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

    async decrement(index) {
      if (this.cartItems.length > 0) {
        if (this.cartItems[index]["quantity"] !== 1) {
          this.cartItems[index]["quantity"] -= 1;
        }
      }
    },
  },
});
