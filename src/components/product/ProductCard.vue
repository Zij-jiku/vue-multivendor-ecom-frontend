<script setup>
import ProductPrice from './ProductPrice.vue';
import { useCart, useNotification, useAuth, useWishlist } from '@/stores';
import { ref } from 'vue';
const props = defineProps({
    products: {
        type: Object,
        required: true,
    }
});


const cart = useCart();
const auth = useAuth();
const wishlist = useWishlist();
const notify = useNotification();
let price = ref();
function addToCart(product) {
    if (product.discount) {
        var firstPrice = product.price;
        var discount = product.discount / 100;
        var totalDiscount = firstPrice - firstPrice * discount;
        price.value = totalDiscount.toFixed();
    } else {
        price.value = product.price;
    }
    cart.addToCart({
        id: product.id,
        name: product.name,
        price: price.value,
        thumbnail: product.thumbnail
    });
    notify.Success(`${product.name} Added Your Cart`);
}

const addToWhishlist = async (product) => {
    if (auth.user.data) {
        // addTowishlist
        let res = await wishlist.addToWishlist(product);
        if (res.status === 201) {
            notify.Success(`${product.name} Added Your Wishlist`);
        } else {
            notify.Warning(`${product.name} Remove Your Wishlist`);
        }

    } else {
        $('#login-modal').modal('show');
    }
}

</script>

<template>

    <div class="row row-cols-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5">
        <div class="col" v-for="(product, index) in products.data" :key="index">
            <div class="product-card">
                <div class="product-media">
                    <div class="product-label">

                        <label class="label-text new">{{ product.conditions }}</label>
                        <label class="label-text sale">{{ product.discount }}%</label>
                    </div>
                    <button class="product-wish wish" @click.prevent="addToWhishlist(product)">
                        <i class="fas fa-spinner fa-spin" v-if="wishlist.loading == product.id"></i>
                        <i class="fas fa-heart" v-else></i>
                    </button>

                    <router-link class="product-image" :to="{name: 'product.details'}">
                        <img :src="$filters.imagePath(product.thumbnail)" alt="product" />
                    </router-link>

                </div>
                <div class="product-content">
                    <h6 class="product-name">
                        <router-link :to="{name: 'product.details'}">{{ product.name }}</router-link>
                    </h6>

                    <product-price :price="product.price" :discount="product.discount" />


                    <button class="product-add" title="Add to Cart" @click="addToCart(product)">
                        <i class="fas fa-shopping-basket"></i><span>Add</span>
                    </button>

                </div>
            </div>
        </div>

    </div>

</template>

<style scoped>
.cs_red {
    color: red;
}
</style>