<script setup>
import { useCart } from '@/stores';
import { storeToRefs } from 'pinia';

function cartClose() {
    $("body").css("overflow", "inherit"),
        $(".cart-sidebar").removeClass("active"),
        $(".backdrop").fadeOut();
}
const cart = useCart();
const { cartItems, cartItemsCount, totalPirce } = storeToRefs(cart);

function deleteCart(index) {
    cart.destroy(index);
}

function incrementCart(index) {
    cart.increment(index);
}

function decrementCart(index) {
    cart.decrement(index);
}



</script>

<template>
    <div>
        <aside class="cart-sidebar">
            <div class="cart-header">
                <div class="cart-total">

                    <i class="fas fa-shopping-basket"></i>
                    <span v-if="cartItemsCount">total item ({{ cartItemsCount }})</span>
                    <span v-else>Cart is Empty</span>

                </div>
                <button class="cart-close" @click="cartClose"><i class="icofont-close"></i></button>
            </div>
            <ul class="cart-list" v-if="cartItemsCount !== 0">
                <li class="cart-item" v-for="(cart,index) in cartItems" :key="index">
                    <div class="cart-media">
                        <a href="#"><img :src="$filters.imagePath(cart.thumbnail)" alt="product" /></a><button
                            class="cart-delete">
                            <i class="far fa-trash-alt" @click.prevent="deleteCart(index)"></i>
                        </button>
                    </div>
                    <div class="cart-info-group">
                        <div class="cart-info">
                            <h6><a href="product-single.html">{{ cart.name }}</a></h6>
                            <p>Unit Price - {{ $filters.currencySymbol(cart.price) }}</p>
                        </div>
                        <div class="cart-action-group">
                            <div class="product-action">
                                <button class="action-minus" title="Quantity Minus">
                                    <i class="icofont-minus" @click="decrementCart(index)"
                                        :class="cart.quantity === 1 ? 'bg-danger text-white': ''"></i>
                                </button><input class="action-input" title="Quantity Number" type="text" name="quantity"
                                    :value="cart.quantity" /><button class="action-plus" title="Quantity Plus">
                                    <i class="icofont-plus" @click="incrementCart(index)"></i>
                                </button>
                            </div>
                            <h6>{{ $filters.currencySymbol(cart.price * cart.quantity) }}</h6>
                        </div>
                    </div>
                </li>

            </ul>

            <ul class="cart-list" v-else>
                <h3 class="text-center mt-5">Please add to cart</h3>
            </ul>


            <div class="cart-footer">
                <router-link class="cart-checkout-btn" :to="{name: 'checkout.page'}">
                    <span class="checkout-label">Proceed to Checkout</span>
                    <span class="checkout-price">{{ $filters.currencySymbol(totalPirce) }}</span>
                </router-link>
            </div>
        </aside>

    </div>
</template>