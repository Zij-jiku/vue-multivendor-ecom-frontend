<script setup>
import { useAuth, useNotification, useModal } from "@/stores";
import { ref } from "vue";
import { useRouter, useRoute } from "vue-router";
import { Field, Form } from "vee-validate";
import * as yup from "yup";

const schema = yup.object({
  phone: yup.string().required("Phone filed is required"),
  password: yup.string().required(),
});

const auth = useAuth();

const router = useRouter();
const route = useRoute();
const modal = useModal();

const showPassword = ref(false);

const toggleShow = () => {
  showPassword.value = !showPassword.value;
};

const notify = useNotification();
const onSubmit = async (values, { setErrors, resetForm }) => {
  const res = await auth.login(values);
  if (res.data) {
    resetForm();
    // router.push({ name: "index.page" });
    modal.toggleModal();
    router.push({ name: route.path === "/auth/login" ? "index.page" : "" });
    notify.Success("Login Success");
  } else {
    setErrors(res);
  }
};
</script>
<template>
  <div class="user-form-card">
    <div class="user-form-title">
      <h2>Customer Login</h2>
      <p>Use your credentials to access</p>
    </div>
    <div class="user-form-group" id="axiosForm">
      <Form
        class="user-form"
        @submit="onSubmit"
        :validation-schema="schema"
        v-slot="{ errors, isSubmitting, meta }"
      >
        <div class="form-group">
          <Field
            name="phone"
            type="text"
            class="form-control"
            placeholder="phone no"
            :class="{ 'is-invalid': errors.phone }"
          />

          <span class="text-danger">{{ errors.phone }}</span>
        </div>
        <div class="form-group">
          <Field
            name="password"
            :type="showPassword ? 'text' : 'password'"
            class="form-control"
            placeholder="password"
            :class="{ 'is-invalid': errors.password }"
          />

          <span class="text-danger">{{ errors.password }}</span>
          <span class="view-password" @click="toggleShow"
            ><i
              class="fas text-success"
              :class="{
                'fa-eye-slash': showPassword,
                'fa-eye': !showPassword,
              }"
            ></i
          ></span>
        </div>
        <div class="form-check mb-3">
          <input
            class="form-check-input"
            type="checkbox"
            id="check"
            value=""
          /><label class="form-check-label" for="check">Remember Me</label>
        </div>
        <div class="form-button">
          <button type="submit" :disabled="isSubmitting || !meta.valid">
            login

            <span
              v-show="isSubmitting"
              class="spinner-border spinner-border-sm mr-1"
            ></span>
          </button>

          <p>
            Don't have any account?<router-link
              :to="{ name: 'user.register' }"
              class=""
              >register here</router-link
            >
          </p>
        </div>
      </Form>
    </div>
  </div>
</template>

<style>
:disabled {
  opacity: 0.6;
  cursor: no-drop;
}
</style>
