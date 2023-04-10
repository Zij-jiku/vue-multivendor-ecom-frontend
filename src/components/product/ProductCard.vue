<script setup>
import {
  useCart,
  useNotification,
  useAuth,
  useWishlist,
  useModal,
} from "@/stores";
import ProductPrice from "./ProductPrice.vue";

const cart = useCart();
const auth = useAuth();
const wishlist = useWishlist();
const notify = useNotification();
const modal = useModal();

const props = defineProps({
  product: {
    type: Object,
    required: true,
  },
});

function addToCart(product) {
  cart.addToCart(product);
  notify.Success(`${product.name} Added Your Cart`);
}

//add to wishlist

const addToWishlist = async (product) => {
  if (auth.user.data) {
    // alert("login Ache");
    let res = await wishlist.addToWishlist(product);
    // console.log(res.status);
    if (res.status === 201) {
      notify.Success(`${product.name} Added Your Wishlist`);
    } else {
      notify.Success(`${product.name} Remove From Your Wishlist`);
    }
  } else {
    modal.toggleModal();
  }
};
</script>

<template>
  <div class="col">
    <div class="product-card">
      <div class="product-media">
        <div class="product-label">
          <label class="label-text new">{{ product.conditions }}</label>
          <label class="label-text sale" v-if="product.discount"
            >{{ product.discount }}%</label
          >
        </div>

        <button
          class="product-wish wish"
          @click.prevent="addToWishlist(product)"
        >
          <i
            class="fas fa-spinner fa-spin cs_reed"
            v-if="wishlist.loading === product.id"
          ></i>
          <i class="fas fa-heart" v-else></i>
        </button>

        <router-link
          :to="{ name: 'product.details', params: { slug: product.slug } }"
          class="product-image"
          ><img :src="$filters.makeImagePath(product.thumbnail)" alt="product"
        /></router-link>
      </div>
      <div class="product-content">
        <h6 class="product-name">
          <router-link
            :to="{ name: 'product.details', params: { slug: product.slug } }"
            >{{ product.name }}</router-link
          >
        </h6>

        <product-price :price="product.price" :discount="product.discount" />

        <button
          class="product-add"
          title="Add to Cart"
          @click.prevent="addToCart(product)"
        >
          <i class="fas fa-shopping-basket"></i><span>Add</span>
        </button>
      </div>
    </div>
  </div>
</template>
