<script setup>
import { useNotification, useSeller } from '@/stores';
import { storeToRefs } from 'pinia';
import { onMounted, ref } from 'vue';
import { Bootstrap4Pagination } from 'laravel-vue-pagination';

const seller = useSeller();
const { sellers } = storeToRefs(seller);
const notify = useNotification();

const getSellers = async (page = 1) => {
    await seller.index(page, show.value);
}

onMounted(() => {
    getSellers();
});

const show = ref(20);

</script>



<template>
    <div>
        <section class="inner-section single-banner" style="background: url('src/assets/images/single-banner.jpg') center center
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

                        <div class="top-filter" v-if="sellers.meta">
                            <div class="filter-show">
                                <label class="filter-label">Show :</label>
                                <select class="form-select filter-select" v-model="show" @change.prevent="getSellers">
                                    <option value="10">10</option>
                                    <option value="20">20</option>
                                    <option value="30">30</option>
                                    <option value="40">40</option>
                                    <option value="50">50</option>
                                    <option value="70">70</option>
                                    <option value="100">100</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row row-cols-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5 isotope-items">

                    <div class="col" v-for="seller in sellers.data" :key="seller.id">
                        <div class="product-card">
                            <ul>
                                <li>
                                    <router-link :to="{
                                        name: 'seller.store',
                                        params: { slug: seller.slug }
                                    }" class="suggest-card">
                                        <img :src=$filters.imagePath(seller.image) alt="seller lists" />
                                    </router-link>
                                    <div class="brand-meta">
                                        <h4 class="text-center">{{ seller.shop_name }}</h4>
                                        <p class="text-center">{{ seller.products_count }} Products</p>
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

                <div class="row" v-if="sellers.meta">
                    <div class="col-lg-12">
                        <div class="bottom-paginate">

                            Showing {{ sellers.meta.per_page }} of {{ sellers.meta.total }} Results
                            <p class="page-info"></p>
                            <ul class="pagination">

                                <Bootstrap4Pagination :data="sellers" @pagination-change-page="getSellers">

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

                                <!-- <li class="page-item">
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
                                </li> -->
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>