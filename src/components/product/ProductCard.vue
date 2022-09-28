<script setup>
import ProductPrice from './ProductPrice.vue';

const props = defineProps({
    products: {
        type: Object,
        required: true,
    }
})
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
                    <button class="product-wish wish">
                        <i class="fas fa-heart"></i></button>
                    <router-link class="product-image" :to="{name: 'product.details'}">
                        <img :src="$filters.imagePath(product.thumbnail)" alt="product" />
                    </router-link>

                </div>
                <div class="product-content">
                    <h6 class="product-name">
                        <router-link :to="{name: 'product.details'}">{{ product.name }}</router-link>
                    </h6>

                    <product-price :price="product.price" :discount="product.discount" />


                    <button class="product-add" title="Add to Cart">
                        <i class="fas fa-shopping-basket"></i><span>Add</span>
                    </button>

                </div>
            </div>
        </div>

    </div>

</template>