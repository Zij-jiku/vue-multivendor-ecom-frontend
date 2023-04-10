<script setup>
import { useAuth, useNotification, useCart } from "@/stores";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";
const auth = useAuth();
const { user, loading } = storeToRefs(auth);
const cart = useCart();
const { cartItemsCount, totalPrice } = storeToRefs(cart);
const router = useRouter();
const notify = useNotification();
const userLogout = async () => {
  const res = await auth.logout();
  if (res.status) {
    router.push({ name: "index.page" });
    notify.Info("Logout Success");
  }
};

function search() {
  $(".header-form").toggleClass("active"),
    $(".header-src").children(".fa-search").toggleClass("fa-times");
}
function menu() {
  $("body").css("overflow", "hidden"), $(".nav-sidebar").addClass("active");
}

function cartshow() {
  cart.toggleCartSidebar();
}
</script>
<template>
  <div>
    <div class="header-top">
      <div class="container">
        <div class="row">
          <div class="col-md-12 col-lg-5">
            <div class="header-top-welcome">
              <p>Welcome to Ecomart in Your Dream Online Store!</p>
            </div>
          </div>
          <div class="col-md-5 col-lg-3"></div>
          <div class="col-md-7 col-lg-4">
            <ul class="header-top-list">
              <li>
                <router-link :to="{ name: 'seller.apply' }" href="offer.html"
                  >Seller Apply</router-link
                >
              </li>
              <li><a href="faq.html">need help</a></li>
              <li><a href="contact.html">contact us</a></li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <header class="header-part">
      <div class="container">
        <div class="header-content">
          <div class="header-media-group">
            <button class="header-user" @click="menu">
              <img src="@/assets/images/menu.png" alt="user" /></button
            ><router-link :to="{ name: 'index.page' }"
              ><img src="@/assets/images/logo.png" alt="logo" /></router-link
            ><button class="header-src" @click="search">
              <i class="fas fa-search"></i>
            </button>
          </div>
          <router-link :to="{ name: 'index.page' }" class="header-logo"
            ><img src="@/assets/images/logo.png" alt="logo"
          /></router-link>

          <form class="header-form">
            <input type="text" placeholder="Search anything..." /><button>
              <i class="fas fa-search"></i>
            </button>
          </form>
          <div class="header-widget-group hover-nav">
            <li class="nav-item dropdown">
              <a
                class="nav-link header-widget"
                href="#"
                data-bs-toggle="dropdown"
                ><i class="fas fa-user"></i
              ></a>
              <ul class="dropdown-menu dropdown-menu-end" v-if="!user.data">
                <li>
                  <router-link
                    :to="{ name: 'user.login' }"
                    class="dropdown-item"
                  >
                    Login</router-link
                  >
                </li>
                <li>
                  <router-link
                    :to="{ name: 'user.register' }"
                    class="dropdown-item"
                  >
                    Register</router-link
                  >
                </li>
              </ul>

              <ul class="dropdown-menu dropdown-menu-end" v-else>
                <li>
                  <router-link
                    :to="{ name: 'user.profile' }"
                    class="dropdown-item"
                  >
                    My Profile</router-link
                  >
                </li>

                <li>
                  <router-link
                    :to="{ name: 'user.orders' }"
                    class="dropdown-item"
                  >
                    My Orders</router-link
                  >
                </li>

                <li>
                  <router-link
                    :to="{ name: 'user.wishlist' }"
                    class="dropdown-item"
                  >
                    My Wishlist</router-link
                  >
                </li>

                <li>
                  <button
                    :disabled="loading"
                    class="dropdown-item"
                    @click="userLogout"
                  >
                    Logout

                    <span
                      v-show="loading"
                      class="spinner-border spinner-border-sm mr-1"
                    ></span>
                  </button>
                </li>
              </ul>
            </li>

            <router-link
              v-if="auth.user.data"
              :to="{ name: 'user.wishlist' }"
              class="header-widget"
              title="Wishlist"
              ><i class="fas fa-heart"></i
              ><sup>{{ user.meta.wishlists.length }}</sup></router-link
            >

            <button
              class="header-widget header-cart"
              @click="cartshow"
              title="Cartlist"
            >
              <i class="fas fa-shopping-basket"></i
              ><sup>{{ cartItemsCount }}</sup
              ><span
                >total price<small>{{
                  $filters.currencySymbol(totalPrice)
                }}</small></span
              >
            </button>
          </div>
        </div>
      </div>
    </header>
  </div>
</template>

<style>
.hover-nav .nav-item .dropdown-menu {
  display: none;
  margin-top: 0;
}
.hover-nav .nav-item:hover .nav-link {
}
.hover-nav .nav-item:hover .dropdown-menu {
  display: block;
}
</style>
