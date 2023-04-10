<script setup>
import { ProductCard } from "@/components/product";
// import Pagination from "laravel-vue-pagination";

import { Bootstrap5Pagination } from "laravel-vue-pagination";
import { ProductScreen, SidebarScreen } from "@/components/skeleton";
import { useShop } from "@/stores";
import { storeToRefs } from "pinia";
import { onMounted, ref, computed, watch } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const shop = useShop();
const { products, sidebar } = storeToRefs(shop);

onMounted(() => {
  queryProducts();
  getProducts();
  shop.sidebarData();

  console.log(route.query.products);
});

const getProducts = (page = 1) => {
  // shop.$reset();
  products.value = [];
  shop.index(
    page,
    show.value,
    condition.value,
    selectedBrand.value,
    selectedCategory.value,
    price_range.value,
    searchQuery.value,
    sort.value
  );
};

const show = ref(12);
const condition = ref("all");

//brand and category searching

const searchBrandQuery = ref("");

const searchedBrands = computed(() => {
  return shop.sidebar.data.brands.filter((brand) => {
    return brand.name.toLowerCase().match(searchBrandQuery.value.toLowerCase());
  });
});

const searchCatQuery = ref("");

const searchedCategories = computed(() => {
  return shop.sidebar.data.categories.filter((cat) => {
    return cat.name.toLowerCase().match(searchCatQuery.value.toLowerCase());
  });
});

//brand and category filtering
const selectedBrand = ref([]);
const selectedCategory = ref([]);

const clearFilter = (data) => {
  if (data == "brand") {
    selectedBrand.value = [];
  } else {
    selectedCategory.value = [];
  }

  getProducts();
};

//price range filtering
const price_range = ref("");

// product searching

const searchQuery = ref("");

watch(
  () => [...searchQuery.value],
  (newVal, oldVal) => {
    if (newVal.length >= 3 || oldVal.length >= 3) {
      getProducts();
    }
  }
);

//sort by products

const sort = ref("default");

const queryProducts = () => {
  selectedCategory.value = [];
  if (route.query.products) {
    selectedCategory.value.push(route.query.products);
  }
};

watch(
  () => route.query.products,
  (newVal, oldVal) => {
    queryProducts();
    getProducts();
  }
);
</script>

<template>
  <div>
    <section class="inner-section single-banner">
      <div class="container">
        <h2>Shop Page</h2>
      </div>
    </section>
    <section class="inner-section shop-part">
      <div class="container">
        <div class="row content-reverse">
          <div class="col-lg-3">
            <template v-if="sidebar.data">
              <!-- <div class="shop-widget-promo">
            <a href="#"><img src="images/promo/shop/01.jpg" alt="promo" /></a>
          </div> -->
              <div class="shop-widget">
                <h6 class="shop-widget-title">Filter by Price</h6>
                <el-slider
                  v-model="price_range"
                  range
                  :min="sidebar.data.price.min_price"
                  :max="sidebar.data.price.max_price"
                  @change="getProducts"
                />

                <div class="shop-widget-group">
                  <input
                    type="text"
                    disabled
                    :placeholder="`Min - ${
                      price_range[0] == null
                        ? $filters.currencySymbol(sidebar.data.price.min_price)
                        : $filters.currencySymbol(price_range[0])
                    }`"
                  />

                  <input
                    type="text"
                    disabled
                    :placeholder="`Max - ${
                      price_range[1] == null
                        ? $filters.currencySymbol(sidebar.data.price.max_price)
                        : $filters.currencySymbol(price_range[1])
                    }`"
                  />
                </div>
              </div>

              <div class="shop-widget">
                <h6 class="shop-widget-title">Filter by Brand</h6>

                <form>
                  <input
                    class="shop-widget-search"
                    type="text"
                    placeholder="Search..."
                    v-model="searchBrandQuery"
                  />

                  <ul class="shop-widget-list shop-widget-scroll">
                    <li
                      v-for="(brand, index) in searchedBrands"
                      :key="brand.id"
                    >
                      <div class="shop-widget-content">
                        <input
                          type="checkbox"
                          v-model="selectedBrand"
                          :value="brand.slug"
                          @change="getProducts"
                          :id="`brand${index}`"
                        /><label :for="`brand${index}`">{{ brand.name }}</label>
                      </div>
                      <span class="shop-widget-number"
                        >({{ brand.products_count }})</span
                      >
                    </li>

                    <li v-show="searchedBrands.length == 0">
                      <p class="text-danger">Search Result Not Found !</p>
                    </li>
                  </ul>
                  <button
                    class="shop-widget-btn"
                    @click.prevent="clearFilter('brand')"
                  >
                    <i class="far fa-trash-alt"></i><span>clear filter</span>
                  </button>
                </form>
              </div>
              <div class="shop-widget">
                <h6 class="shop-widget-title">Filter by Category</h6>
                <form>
                  <input
                    class="shop-widget-search"
                    type="text"
                    placeholder="Search..."
                    v-model="searchCatQuery"
                  />
                  <ul class="shop-widget-list shop-widget-scroll">
                    <li
                      v-for="(category, index) in searchedCategories"
                      :key="category.id"
                    >
                      <div class="shop-widget-content">
                        <input
                          type="checkbox"
                          v-model="selectedCategory"
                          :value="category.slug"
                          @change="getProducts"
                          :id="`cat${index}`"
                        /><label :for="`cat${index}`">{{
                          category.name
                        }}</label>
                      </div>
                      <span class="shop-widget-number"
                        >({{ category.products_count }})</span
                      >
                    </li>

                    <li v-show="searchedCategories.length == 0">
                      <p class="text-danger">Search Result Not Found !</p>
                    </li>
                  </ul>
                  <button
                    class="shop-widget-btn"
                    @click.prevent="clearFilter('category')"
                  >
                    <i class="far fa-trash-alt"></i><span>clear filter</span>
                  </button>
                </form>
              </div>
            </template>

            <template v-else>
              <SidebarScreen />
            </template>
          </div>

          <div class="col-lg-9">
            <div class="row">
              <div class="col-lg-12">
                <div class="top-filter">
                  <div class="filter-show">
                    <label class="filter-label">Show :</label
                    ><select
                      class="form-select filter-select"
                      v-model="show"
                      @change="getProducts"
                    >
                      <option value="12">12</option>
                      <option value="20">20</option>
                      <option value="30">30</option>
                      <option value="50">50</option>
                      <option value="100">100</option>
                      <option value="200">200</option>
                    </select>
                  </div>

                  <div class="filter-short">
                    <input
                      type="search"
                      placeholder="search products"
                      class="form-control"
                      v-model="searchQuery"
                    />
                  </div>

                  <div class="filter-short">
                    <label class="filter-label">Short by :</label
                    ><select
                      class="form-select filter-select"
                      v-model="sort"
                      @change="getProducts"
                    >
                      <option value="default">default</option>
                      <option value="priceLowToHigh">
                        Price:Lower to Higher
                      </option>
                      <option value="priceHighToLow">
                        Price:Higher to Lower
                      </option>
                      <option value="nameAtoZ">Name:A to Z</option>
                      <option value="nameZtoA">Name:Z to A</option>
                    </select>
                  </div>

                  <div class="filter-short">
                    <label class="filter-label">Condition by :</label
                    ><select
                      class="form-select filter-select"
                      v-model="condition"
                      @change="getProducts"
                    >
                      <option value="all">all</option>
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
              <div
                class="row row-cols-2 row-cols-md-3 row-cols-lg-3 row-cols-xl-4"
              >
                <ProductCard
                  :product="product"
                  v-for="(product, index) in products.data"
                  :key="index"
                />
              </div>

              <div class="text-center" v-show="products.data.length == 0">
                <el-empty description="search result not found" />
              </div>
            </template>

            <template v-else>
              <ProductScreen :dataAmount="12" :cols="4" />
            </template>
            <div class="row" v-if="products.data">
              <div class="col-lg-12">
                <div class="bottom-paginate">
                  <p class="page-info">
                    Showing {{ products.meta.per_page }} of
                    {{ products.meta.total }} Results
                  </p>
                  <ul class="pagination">
                    <Bootstrap5Pagination
                      :data="products"
                      @pagination-change-page="getProducts"
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
        </div>
      </div>
    </section>
  </div>
</template>

<style>
.el-slider {
  --el-slider-main-bg-color: #11b76b;
}
</style>
