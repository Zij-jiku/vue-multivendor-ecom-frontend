<script setup>
import { useSlider, useCategory, useProduct } from "@/stores";
import { ProductCard, ProductPrice } from "@/components/product";
import {
  HomeSliderScreen,
  CategoryScreen,
  ProductScreen,
} from "@/components/skeleton";
import { ref, onMounted } from "vue";
import { storeToRefs } from "pinia";
// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from "swiper/vue";

// Import Swiper styles
import "swiper/css";

import "swiper/css/pagination";
import "swiper/css/navigation";

import { Pagination, Autoplay, Navigation } from "swiper";

const modules = ref([Pagination, Autoplay]);
const newSlide = ref([Navigation]);

//sldier secton
const slider = useSlider();
const cat = useCategory();
const product = useProduct();

const { sliders } = storeToRefs(slider);
const { categories } = storeToRefs(cat);
const { products, popular, sales, features, newItems, winter } =
  storeToRefs(product);

onMounted(() => {
  slider.getData();
  cat.getData();

  product.index();
  product.index("sale");
  product.index("popular");
  product.index("winter");
  product.index("new");
  product.index("feature");
});
</script>

<template>
  <div>
    <section class="banner-part">
      <div class="">
        <div class="row">
          <div class="col-lg-12 order-0 order-lg-1 order-xl-1">
            <div class="home-grid-slider slider-arrow slider-dots">
              <template v-if="sliders.data">
                <swiper
                  :spaceBetween="30"
                  :pagination="{
                    clickable: true,
                  }"
                  :loop="true"
                  :autoplay="{
                    delay: 2000,
                  }"
                  :modules="modules"
                  class="mySwiper"
                >
                  <swiper-slide
                    v-for="(slider, index) in sliders.data"
                    :key="index"
                  >
                    <a href="#"
                      ><img
                        :src="$filters.makeImagePath(slider.image)"
                        alt="" /></a
                  ></swiper-slide>
                </swiper>
              </template>

              <template v-else>
                <HomeSliderScreen />
              </template>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="section suggest-part">
      <div class="container">
        <div class="row">
          <div class="col-lg-12">
            <div class="section-heading">
              <h3 style="float: left">SHOP BY CATEGORIES</h3>
            </div>
          </div>
        </div>

        <div class="row row-cols-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5">
          <template v-if="categories.data">
            <div
              class="col"
              v-for="(category, index) in categories.data"
              :key="index"
            >
              <div class="product-card">
                <ul>
                  <li>
                    <RouterLink
                      :to="{
                        name: 'shop.page',
                        query: { products: category.slug },
                      }"
                      class="suggest-card"
                    >
                      <img
                        :src="$filters.makeImagePath(category.image)"
                        alt=""
                      />
                    </RouterLink>
                  </li>
                </ul>

                <h6 class="text-center mt-2">{{ category.name }}</h6>
              </div>
            </div>
          </template>

          <template v-else>
            <CategoryScreen :dataAmount="10" />
          </template>
        </div>
      </div>
    </section>

    <section class="section recent-part">
      <div class="container">
        <div class="row">
          <div class="col-lg-12">
            <div class="section-heading">
              <h2>recently sold items</h2>
            </div>
          </div>
        </div>

        <template v-if="sales.data">
          <div class="row row-cols-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5">
            <ProductCard
              :product="product"
              v-for="(product, index) in sales.data"
              :key="index"
            />
          </div>
        </template>

        <template v-else>
          <ProductScreen :dataAmount="10" />
        </template>
        <div class="row">
          <div class="col-lg-12">
            <div class="section-btn-25">
              <a href="shop-4column.html" class="btn btn-outline"
                ><i class="fas fa-eye"></i><span>show more</span></a
              >
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="section recent-part">
      <div class="container">
        <div class="row">
          <div class="col-lg-12">
            <div class="section-heading">
              <h2>Popular items</h2>
            </div>
          </div>
        </div>
        <template v-if="popular.data">
          <div class="row row-cols-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5">
            <ProductCard
              :product="product"
              v-for="(product, index) in popular.data"
              :key="index"
            />
          </div>
        </template>

        <template v-else>
          <ProductScreen :dataAmount="10" />
        </template>
        <div class="row">
          <div class="col-lg-12">
            <div class="section-btn-25">
              <a href="shop-4column.html" class="btn btn-outline"
                ><i class="fas fa-eye"></i><span>show more</span></a
              >
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="section recent-part">
      <div class="container">
        <div class="row">
          <div class="col-lg-12">
            <div class="section-heading">
              <h2>Winter items</h2>
            </div>
          </div>
        </div>
        <template v-if="winter.data">
          <div class="row row-cols-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5">
            <ProductCard
              :product="product"
              v-for="(product, index) in winter.data"
              :key="index"
            />
          </div>
        </template>

        <template v-else>
          <ProductScreen :dataAmount="10" />
        </template>

        <div class="row">
          <div class="col-lg-12">
            <div class="section-btn-25">
              <a href="shop-4column.html" class="btn btn-outline"
                ><i class="fas fa-eye"></i><span>show more</span></a
              >
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="section recent-part">
      <div class="container">
        <div class="row">
          <div class="col-lg-12">
            <div class="section-heading">
              <h2>Features items</h2>
            </div>
          </div>
        </div>
        <template v-if="features.data">
          <div class="row row-cols-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5">
            <ProductCard
              :product="product"
              v-for="(product, index) in features.data"
              :key="index"
            />
          </div>
        </template>

        <template v-else>
          <ProductScreen :dataAmount="10" />
        </template>
        <div class="row">
          <div class="col-lg-12">
            <div class="section-btn-25">
              <a href="shop-4column.html" class="btn btn-outline"
                ><i class="fas fa-eye"></i><span>show more</span></a
              >
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="section newitem-part">
      <div class="container">
        <div class="row">
          <div class="col">
            <div class="section-heading">
              <h2>collected new items</h2>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col">
            <ul class="new-slider slider-arrow">
              <swiper
                :slidesPerView="5"
                :slidesPerGroup="5"
                :loop="true"
                :autoplay="{
                  delay: 2000,
                }"
                :loopFillGroupWithBlank="true"
                :navigation="true"
                :modules="newSlide"
                class="mySwiper"
              >
                <swiper-slide
                  v-for="(product, index) in newItems.data"
                  :key="index"
                >
                  <li>
                    <div class="product-card">
                      <div class="product-media">
                        <div class="product-label">
                          <label class="label-text new">{{
                            product.conditions
                          }}</label>
                          <label class="label-text sale" v-if="product.discount"
                            >{{ product.discount }}%</label
                          >
                        </div>
                        <button class="product-wish wish">
                          <i class="fas fa-heart"></i></button
                        ><router-link
                          :to="{
                            name: 'product.details',
                            params: { slug: product.slug },
                          }"
                          class="product-image"
                          ><img
                            :src="$filters.makeImagePath(product.thumbnail)"
                            alt="product"
                        /></router-link>
                      </div>
                      <div class="product-content">
                        <h6 class="product-name">
                          <router-link
                            :to="{
                              name: 'product.details',
                              params: { slug: product.slug },
                            }"
                            >{{ product.name }}</router-link
                          >
                        </h6>

                        <product-price
                          :price="product.price"
                          :discount="product.discount"
                        />

                        <button class="product-add" title="Add to Cart">
                          <i class="fas fa-shopping-basket"></i><span>Add</span>
                        </button>
                      </div>
                    </div>
                  </li>
                </swiper-slide>
              </swiper>
            </ul>
          </div>
        </div>
        <div class="row">
          <div class="col">
            <div class="section-btn-25">
              <a href="shop-4column.html" class="btn btn-outline"
                ><i class="fas fa-eye"></i><span>show more</span></a
              >
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
