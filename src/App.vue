<script setup>
import { HeaderPart, NavBar, CartSideBar, MobileMenu, NewsPart, FooterPart } from '@/components';
</script>


<template>
  <div>
    <!-- start -->
    <div class="backdrop"></div>
    <a class="backtop fas fa-arrow-up" href="#"></a>

    <!-- Header Part Start -->
    <HeaderPart />

    <!-- Navbar Start -->
    <NavBar />

    <!-- Cart Sidebar  -->
    <CartSideBar />

    <!-- MobileMenu -->
    <MobileMenu />

    <!-- Main Content Load Start -->
    <!-- yield here -->
    <router-view v-slot="{ Component }">
      <transition name="scale" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
    <!-- Main Content Load End -->

    <!-- NewsPart && Intro Part -->
    <NewsPart />

    <!-- Footer Start -->
    <FooterPart />
    <!-- Footer End -->
  </div>
</template>

<script>
export default {};
</script>

<style>
.scale-enter-active,
.scale-leave-active {
  transition: all 0.5s ease;
}

.scale-enter-from,
.scale-leave-to {
  opacity: 0;
  transform: scale(0.9);
}
</style>