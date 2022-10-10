<script setup>
import { useAuth, useNotification } from '@/stores';
import { ref } from 'vue';
import { Field, Form } from 'vee-validate';
import { useRouter, useRoute } from 'vue-router'

import * as yup from 'yup';
const schema = yup.object({
    phone: yup.string().required(),
    password: yup.string().required().min(8),
});

const router = useRouter()
const route = useRoute()
const auth = useAuth();

const notify = useNotification();

const onSubmit = async (values, { setErrors, resetForm }) => {
    const res = await auth.login(values);
    if (res.data) {
        router.push({ name: route.path === '/auth/login' ? 'index.page' : '' });
        $('#login-modal').modal('hide');
        resetForm();
        notify.Success("Login Successful");
    } else {
        setErrors(res);
    }

}
// password show hide
const showPassword = ref(false);
const toggleShow = () => {
    showPassword.value = !showPassword.value
}
</script>

<template>
    <div class="user-form-card">
        <div class="user-form-title">
            <h2>Customer Login</h2>
            <p>Use your credentials to access</p>
        </div>
        <div class="user-form-group" id="axiosForm">
            <Form class="user-form" @submit="onSubmit" :validation-schema="schema" v-slot="{errors , isSubmitting}">
                <!--v-if-->
                <div class="form-group">
                    <Field name="phone" type="text" class="form-control" :class="{'is-invalid' : errors.phone}"
                        placeholder="phone no" />

                    <!--v-if-->
                    <span class="text-danger" v-if="errors.phone"> {{ errors.phone }} </span>
                </div>
                <div class="form-group">
                    <Field name="password" :type="showPassword ? 'text' : 'password'" class="form-control"
                        :class="{'is-invalid' : errors.password}" placeholder="password" />


                    <span class="view-password" @click="toggleShow">
                        <i class="fas text-success" :class="{
                            'fa-eye-slash': showPassword, 
                            'fa-eye': !showPassword, 
                        }">
                        </i></span>
                    <!--v-if-->
                    <span class="text-danger" v-if="errors.password"> {{ errors.password }} </span>
                </div>
                <div class="form-check mb-3">
                    <input class="form-check-input" type="checkbox" id="check" value="" /><label
                        class="form-check-label" for="check">Remember Me</label>
                </div>
                <div class="form-button">
                    <button type="submit" :disable="isSubmitting"> login
                        <span v-show="isSubmitting" class="spinner-border spinner-border-sm mx-1"></span>
                    </button>

                    <p>
                        Don't have any account?<router-link :to="{name: 'user.register'}">
                            register here
                        </router-link>
                    </p>
                </div>
            </Form>
        </div>
    </div>
</template>