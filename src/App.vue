<script setup>
import { useCategory } from "@/stores";
import { onMounted } from "vue";

import {
  HeaderPart,
  NavBar,
  CartSideBar,
  MobileMenu,
  FooterPart,
  NewsLetter,
  LoginModal,
} from "@/components";
import { storeToRefs } from "pinia";

const navData = useCategory();
const { navCats } = storeToRefs(navData);

onMounted(() => {
  navData.navCategory();
});
</script>

<template>
  <div>
    <div class="backdrop"></div>
    <a class="backtop fas fa-arrow-up" href="#"></a>

    <!-- heder part  -->
    <HeaderPart />
    <!-- NavBar part  -->
    <NavBar :navCats="navCats" />

    <CartSideBar />

    <MobileMenu />
    <LoginModal />

    <!-- content change -->
    <!-- <router-view> </router-view> -->

    <router-view v-slot="{ Component }">
      <transition name="fade" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>

    <NewsLetter />

    <FooterPart />
  </div>
</template>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-to,
.fade-leave-from {
  opacity: 1;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
