<script setup>
import { useNotification, useSeller } from '@/stores';
import { storeToRefs } from 'pinia';
import { onMounted } from 'vue';
const seller = useSeller();
const { sellers } = storeToRefs(seller);
const notify = useNotification();

onMounted(() => {
    seller.index();
    console.log(seller);
});
</script>



<template>
    <div>
        <section class="inner-section single-banner" style="
          background: url('//website/images/single-banner.jpg') center center
            no-repeat;
        ">
            <div class="container">
                <h2>Seller List</h2>
            </div>
        </section>
        <section class="inner-section">
            <div class="container">
                <div class="row">
                    <div class="col-lg-12">

                        <div class="top-filter">
                            <div class="filter-show">
                                <label class="filter-label">Show :</label><select class="form-select filter-select">
                                    <option value="10">10</option>
                                    <option value="20">20</option>
                                    <option value="30">30</option>
                                    <option value="5">50</option>
                                    <option value="100">100</option>
                                    <option value="200">200</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row row-cols-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5 isotope-items">

                    <div class="col" v-for="(seller, index) in sellers.data" key="index">
                        <div class="product-card">
                            <ul>
                                <li>
                                    <router-link :to="{ name: 'seller.store' }" class="suggest-card"><img
                                            :src=$filters.imagePath(seller.image) alt="seller lists" />
                                    </router-link>
                                    <div class="brand-meta">
                                        <h4 class="text-center">{{ seller.shop_name }}</h4>
                                        <p class="text-center">0 Products</p>
                                        <div class="form-button">
                                            <button type="submit">
                                                Visit Store <i class="fas fa-angle-right"></i>
                                            </button>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>

                </div>

                <div class="row">
                    <div class="col-lg-12">
                        <div class="bottom-paginate">
                            <p class="page-info">Showing 12 of 60 Results</p>
                            <ul class="pagination">
                                <li class="page-item">
                                    <a class="page-link" href="#"><i class="fas fa-long-arrow-alt-left"></i></a>
                                </li>
                                <li class="page-item">
                                    <a class="page-link active" href="#">1</a>
                                </li>
                                <li class="page-item">
                                    <a class="page-link" href="#">2</a>
                                </li>
                                <li class="page-item">
                                    <a class="page-link" href="#">3</a>
                                </li>
                                <li class="page-item">...</li>
                                <li class="page-item">
                                    <a class="page-link" href="#">60</a>
                                </li>
                                <li class="page-item">
                                    <a class="page-link" href="#"><i class="fas fa-long-arrow-alt-right"></i></a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>