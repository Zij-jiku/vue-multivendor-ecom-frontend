<script setup>
import { ProductCard } from "@/components/product";
// import Pagination from "laravel-vue-pagination";
import { Bootstrap5Pagination } from "laravel-vue-pagination";
import { ProductScreen } from "@/components/skeleton";
import { useRoute } from "vue-router";
import { useSeller } from "@/stores";
import { onMounted, ref } from "vue";
import { storeToRefs } from "pinia";
const route = useRoute();
const seller = useSeller();
const { products } = storeToRefs(seller);

const show = ref(10);
const sort = ref("default");

const getSellersProduct = (page = 1) => {
  seller.sellerProductsBySlug(route.params.slug, page, show.value, sort.value);
};
onMounted(() => {
  getSellersProduct();
});
</script>

<template>
  <div>
    <section class="single-banner">
      <div class="container"><h2>Seller Products</h2></div>
    </section>
    <div class="brand-single" v-if="products.data">
      <a href="#"
        ><div>
          <img
            :src="$filters.makeImagePath(products.data.image)"
            alt="product"
          /></div></a
      ><a href="#">
        <h3>{{ products.data.shop_name }}</h3>
      </a>
    </div>
    <section class="inner-section shop-part">
      <div class="container">
        <div class="row">
          <div class="col-lg-12">
            <div class="top-filter">
              <div class="filter-show">
                <label class="filter-label">Show :</label
                ><select
                  class="form-select filter-select"
                  v-model="show"
                  @change="getSellersProduct"
                >
                  <option value="10">10</option>
                  <option value="20">20</option>
                  <option value="30">30</option>
                  <option value="50">50</option>
                  <option value="100">100</option>
                  <option value="200">200</option>
                </select>
              </div>
              <div class="filter-short">
                <label class="filter-label">Short by :</label
                ><select
                  class="form-select filter-select"
                  v-model="sort"
                  @change="getSellersProduct"
                >
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
        <template v-if="products.data">
          <div class="row row-cols-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5">
            <ProductCard
              :product="product"
              v-for="(product, index) in products.products.data"
              :key="index"
            />
          </div>
        </template>

        <template v-else>
          <ProductScreen :dataAmount="10" />
        </template>

        <div class="row" v-if="products.data">
          <div class="col-lg-12">
            <div class="bottom-paginate">
              <p class="page-info">
                Showing {{ products.products.per_page }} of
                {{ products.products.total }} Results
              </p>
              <ul class="pagination">
                <Bootstrap5Pagination
                  :data="products.products"
                  @pagination-change-page="getSellersProduct"
                >
                  <template #prev-nav>
                    <a class="page-link" href="#"
                      ><i class="fas fa-long-arrow-alt-left"></i
                    ></a>
                  </template>
                  <template #next-nav>
                    <a class="page-link" href="#"
                      ><i class="fas fa-long-arrow-alt-right"></i
                    ></a>
                  </template>
                </Bootstrap5Pagination>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style>
@import "@/assets/css/brand-single.css";
</style>
