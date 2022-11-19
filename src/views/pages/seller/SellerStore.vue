<script setup>
import { useRoute } from 'vue-router';
import { useSeller } from '@/stores';
import { onMounted, ref } from 'vue';
// import component
import { Bootstrap4Pagination } from 'laravel-vue-pagination';
import { ProductCard } from '@/components/product';
import { storeToRefs } from 'pinia';

const route = useRoute();
const seller = useSeller();
const { products } = storeToRefs(seller);


const show = ref(10);
const sort = ref('default');

const getSellersProducts = (page = 1) => {
    seller.productByShop(route.params.slug, page, show.value, sort.value);
}

onMounted(() => {
    getSellersProducts();
});


</script>

<template>
    <div>
        <section class="single-banner"
            style="background: url('https://png.pngtree.com/background/20210712/original/pngtree-colorful-banner-red-and-yellow-background-picture-image_1176793.jpg') center center no-repeat">

            <div class="container">
                <h2>Seller Products</h2>
            </div>
        </section>
        <div class="brand-single" v-if="products.data">
            <a href="#">
                <div>
                    <img :src="$filters.imagePath(products.data.image)" alt="product" />
                </div>
            </a>
            <a href="#">
                <h3>{{ products.data.shop_name }}</h3>
            </a>
        </div>

        <section class="inner-section shop-part">
            <div class="container">
                <div class="row">
                    <div class="col-lg-12">
                        <div class="top-filter" v-if="products.products">

                            <div class="filter-show">
                                <label class="filter-label">Show :</label>
                                <select class="form-select filter-select" v-model="show"
                                    @change.prevent="getSellersProducts">
                                    <option value="10">10</option>
                                    <option value="20">20</option>
                                    <option value="30">30</option>
                                    <option value="40">40</option>
                                    <option value="50">50</option>
                                    <option value="70">70</option>
                                    <option value="100">100</option>
                                </select>
                            </div>

                            <div class="filter-short">
                                <label class="filter-label">Short by :</label>
                                <select class="form-select filter-select" v-model="sort"
                                    @change.prevent="getSellersProducts">
                                    <option value="default">default</option>
                                    <option value="new">New</option>
                                    <option value="popular">Popular</option>
                                    <option value="winter">Winter</option>
                                    <option value="feature">Feature</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="row row-cols-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5" v-if="products.products">
                    <ProductCard :product="product" v-for="(product, index) in products.products.data"
                        :key="product.id" />
                </div>


                <div class="row" v-if="products.products">
                    <div class="col-lg-12">
                        <div class="bottom-paginate">

                            Showing {{ products.products.per_page }} of {{ products.products.total }} Results
                            <p class="page-info"></p>
                            <ul class="pagination">

                                <Bootstrap4Pagination :data="products.products"
                                    @pagination-change-page="getSellersProducts">

                                    <nav v-bind="$attrs" aria-label="Pagination"
                                        v-if="slotProps.computed.total > slotProps.computed.perPage">
                                        <button :disabled="!slotProps.computed.prevPageUrl"
                                            v-on="slotProps.prevButtonEvents">
                                            <slot name="prev-nav">
                                                Previous
                                            </slot>
                                        </button>

                                        <button :aria-current="slotProps.computed.currentPage ? 'page' : null"
                                            v-for="(page, key) in slotProps.computed.pageRange" :key="key"
                                            v-on="slotProps.pageButtonEvents(page)">
                                            {{ page }}
                                        </button>

                                        <button :disabled="!slotProps.computed.nextPageUrl"
                                            v-on="slotProps.nextButtonEvents">
                                            <slot name="next-nav">
                                                Next
                                            </slot>
                                        </button>
                                    </nav>
                                </Bootstrap4Pagination>


                            </ul>
                        </div>
                    </div>
                </div>


            </div>
        </section>
    </div>
</template>

<style>
@import "@/assets/css/brand-min.css";
</style>