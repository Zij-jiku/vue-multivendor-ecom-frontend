<script setup>
import { RouterLink } from "vue-router";

const props = defineProps({
  navCats: {
    type: Object,
    required: true,
  },
});
</script>

<template>
  <div>
    <nav class="navbar-part">
      <div class="container">
        <div class="row">
          <div class="col-lg-12">
            <div class="navbar-content">
              <ul class="navbar-list">
                <li class="navbar-item dropdown">
                  <a class="navbar-link" href="#">home</a>
                </li>

                <li class="navbar-item dropdown-megamenu">
                  <a class="navbar-link dropdown-arrow" href="#">Categories</a>
                  <div class="megamenu">
                    <div class="container">
                      <div class="row row-cols-5">
                        <div
                          class="col"
                          v-for="(cat, index) in navCats.data"
                          :key="index"
                        >
                          <div class="megamenu-wrap">
                            <RouterLink
                              :to="{
                                name: 'shop.page',
                                query: { products: cat.slug },
                              }"
                            >
                              <h5 class="megamenu-title">{{ cat.name }}</h5>
                            </RouterLink>

                            <ul
                              class="megamenu-list"
                              v-if="cat.subcategories.length > 0"
                            >
                              <li>
                                <RouterLink
                                  v-for="(subcat, i) in cat.subcategories"
                                  :key="i"
                                  :to="{
                                    name: 'shop.page',
                                    query: { products: subcat.slug },
                                  }"
                                  >{{ subcat.name }}</RouterLink
                                >
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>

                <li class="navbar-item dropdown-megamenu">
                  <router-link :to="{ name: 'shop.page' }" class="navbar-link"
                    >shop</router-link
                  >
                </li>

                <li class="navbar-item dropdown-megamenu">
                  <router-link :to="{ name: 'seller.page' }" class="navbar-link"
                    >Seller List</router-link
                  >
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </nav>
  </div>
</template>
