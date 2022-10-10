<script setup>
import { LoginForm } from '@/components';
</script>

<template>
    <div>
        <!-- product-view -->
        <div class="modal fade" id="login-modal">
            <div class="modal-dialog">
                <div class="modal-content">
                    <button class="modal-close icofont-close" data-bs-dismiss="modal"></button>
                    <div class="product-view">
                        <div>
                            <section class="user-form-part">
                                <div class="container">
                                    <div class="row justify-content-center">
                                        <div class="col-12 col-md-12 col-lg-12">
                                            <LoginForm />
                                            <div class="user-form-footer"></div>
                                        </div>
                                    </div>
                                </div>
                            </section>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- product -->
    </div>
</template>


<style>
@import "@/assets/css/user-auth.css";
</style>