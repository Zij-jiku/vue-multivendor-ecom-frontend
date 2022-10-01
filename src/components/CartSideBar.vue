<script setup>
import { useCart } from '@/stores';
import { storeToRefs } from 'pinia';

function cartClose() {
    $("body").css("overflow", "inherit"),
        $(".cart-sidebar").removeClass("active"),
        $(".backdrop").fadeOut();
}

const cart = useCart();
const { cartItems, cartItemsCount } = storeToRefs(cart);
</script>

<template>
    <div>
        <aside class="cart-sidebar">
            <div class="cart-header">
                <div class="cart-total">
                    <i class="fas fa-shopping-basket"></i><span>total item ({{ cartItemsCount }}) </span>

                </div>
                <button class="cart-close" @click="cartClose"><i class="icofont-close"></i></button>
            </div>
            <ul class="cart-list">
                <li class="cart-item" v-for="(cart,index) in cartItems" :key="index">
                    <div class="cart-media">
                        <a href="#"><img :src="$filters.imagePath(cart.thumbnail)" alt="product" /></a><button
                            class="cart-delete">
                            <i class="far fa-trash-alt"></i>
                        </button>
                    </div>
                    <div class="cart-info-group">
                        <div class="cart-info">
                            <h6><a href="product-single.html">{{ cart.name }}</a></h6>
                            <p>Unit Price - {{ cart.price }}</p>
                        </div>
                        <div class="cart-action-group">
                            <div class="product-action">
                                <button class="action-minus" title="Quantity Minus">
                                    <i class="icofont-minus"></i></button><input class="action-input"
                                    title="Quantity Number" type="text" name="quantity" :value="cart.quantity" /><button
                                    class="action-plus" title="Quantity Plus">
                                    <i class="icofont-plus"></i>
                                </button>
                            </div>
                            <h6>${{ cart.price * cart.quantity }}</h6>
                        </div>
                    </div>
                </li>

            </ul>
            <div class="cart-footer">
                <router-link class="cart-checkout-btn" :to="{name: 'checkout.page'}">
                    <span class="checkout-label">Proceed to Checkout</span>
                    <span class="checkout-price">$369.78</span>
                </router-link>
            </div>
        </aside>

    </div>
</template>