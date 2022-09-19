<script setup>
 import {HeaderPart , NavBar , CartSideBar, MobileMenu, NewsPart , FooterPart} from '@/components';
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
    <router-view></router-view>
    <!-- Main Content Load End -->
    
    <!-- NewsPart && Intro Part -->
    <NewsPart/>

    <!-- Footer Start -->
    <FooterPart />
    <!-- Footer End -->
  </div>
</template>

<script>
export default {};
</script>

<style>
</style>