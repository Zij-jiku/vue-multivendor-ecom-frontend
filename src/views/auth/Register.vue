<script setup>
// import
import { useAuth, useNotification } from '@/stores';
import { onMounted, reactive, ref } from 'vue';
import { Field, Form } from 'vee-validate';
import { useRouter } from 'vue-router'
import * as yup from 'yup';

// const var
const router = useRouter()
const auth = useAuth();
const notify = useNotification();

// function declaration
const schema = yup.object({
    name: yup.string().required(),
    email: yup.string().required().email(),
    phone: yup.string().required(),
    password: yup.string().required().min(8),
    password_confirmation: yup.string()
        .required("Password Confirmation is a required field")
        .min(8)
        .oneOf([yup.ref('password'), null], 'Passwords Dose not match'),
});

onMounted(() => {
    $('#login-modal').modal('hide');
});

const onSubmit = async (values, { setErrors, resetForm }) => {
    const res = await auth.register(values);
    if (res.status) {
        resetForm();
        otpSent.value = true;
        setTime(120);
        notify.Success("OTP Sent Successfully!");
    } else {
        setErrors(res);
    }
}

// password show hide
const showPassword = ref(true);
const toggleShow = () => {
    showPassword.value = !showPassword.value
}

// OTP Sent
const otpSent = ref(false);
const verifyForm = reactive({
    phone: '',
    otp_code: '',
});
// function declaration
const otpSchema = yup.object({
    otp_code: yup.number().required("Provide verify otp").min(6),
});

const otpVerify = async (values, { setErrors }) => {
    const res = await auth.otpVerify(verifyForm);
    if (res.data) {
        router.push({ name: 'index.page' });
        otpSent.value = false;
        notify.Success("Registration Successfully!");
    } else {
        setErrors(res);
    }
};




// CountDown
var intervalTimer;
let timeLeft = ref("00:00");

function setTime(seconds) {
    clearInterval(intervalTimer);
    timer(seconds);
}

function timer(seconds) {
    const now = Date.now();
    const end = now + seconds * 1000;
    displayTimeLeft(seconds);
    countdown(end);
}
function countdown(end) {
    // initialTime = selectedTime.value;
    intervalTimer = setInterval(() => {
        const secondsLeft = Math.round((end - Date.now()) / 1000);
        if (secondsLeft < 0) {
            clearInterval(intervalTimer);
            return;
        }
        displayTimeLeft(secondsLeft)
    }, 1000);
}

function displayTimeLeft(secondsLeft) {
    const minutes = Math.floor((secondsLeft % 3600) / 60);
    const seconds = secondsLeft % 60;
    timeLeft.value = `${zeroPadded(minutes)}:${zeroPadded(seconds)}`;
}

function zeroPadded(num) {
    // 4 --> 04
    return num < 10 ? `0${num}` : num;
}

// Re-sent Otp Function
const resentOtp = async () => {
    const res = await auth.resentOtp(verifyForm.phone);
    setTime(120);
    if (res.status) {
        notify.Success("Re-sent OTP Successfully!");
    }
}

</script>
    
<template>
    <div>
        <section class="user-form-part">
            <div class="container">
                <div class="row justify-content-center">
                    <div class="col-12 col-sm-10 col-md-12 col-lg-12 col-xl-6">
                        <div class="user-form-card">
                            <div class="user-form-title">
                                <h2 v-if="otpSent">Verify On your Phone</h2>
                                <h2 v-else>Customer Registration</h2>
                                <p>Use your credentials to access</p>
                            </div>

                            <div class="user-form-group" v-if="otpSent">
                                <Form class="user-form" @submit="otpVerify" :validation-schema="otpSchema"
                                    v-slot="{errors , isSubmitting}">

                                    <!-- Phone -->
                                    <div class="form-group">
                                        <Field name="otp_code" type="text" class="form-control"
                                            :class="{'is-invalid' : errors.otp_code}" v-model="verifyForm.otp_code"
                                            placeholder="Otp Verify" />

                                        <a href="javascript:void(0)" class="resent_btn" v-if="timeLeft === '00:00'"
                                            @click="resentOtp">Re-Sent OTP</a>
                                        <a href="javascript:void(0)" class="resent_btn" v-else>{{ timeLeft }}</a>


                                        <span class="text-danger" v-if="errors.otp_code"> {{ errors.otp_code }} </span>
                                    </div>

                                    <div class="form-button">
                                        <button type="submit" :disable="isSubmitting"> Otp Verify
                                            <span v-show="isSubmitting"
                                                class="spinner-border spinner-border-sm mx-1"></span>
                                        </button>
                                    </div>
                                </Form>
                            </div>

                            <div class="user-form-group" v-else>
                                <Form class="user-form" @submit="onSubmit" :validation-schema="schema"
                                    v-slot="{errors , isSubmitting}">

                                    <!-- Name -->
                                    <div class="form-group">
                                        <Field name="name" type="text" class="form-control"
                                            :class="{'is-invalid' : errors.name}" placeholder="Name" />
                                        <span class="text-danger" v-if="errors.name"> {{ errors.name }} </span>
                                    </div>

                                    <!-- Email -->
                                    <div class="form-group">
                                        <Field name="email" type="text" class="form-control"
                                            :class="{'is-invalid' : errors.email}" placeholder="Email Address" />
                                        <span class="text-danger" v-if="errors.email"> {{ errors.email }} </span>
                                    </div>

                                    <!-- Phone -->
                                    <div class="form-group">
                                        <Field name="phone" type="text" class="form-control"
                                            :class="{'is-invalid' : errors.phone}" v-model="verifyForm.phone"
                                            placeholder="Phone Number" />
                                        <span class="text-danger" v-if="errors.phone"> {{ errors.phone }} </span>
                                    </div>

                                    <!-- Password -->
                                    <div class="form-group">
                                        <Field name="password" :type="showPassword ? 'text' : 'password'"
                                            class="form-control" :class="{'is-invalid' : errors.password}"
                                            placeholder="Password" />

                                        <span class="view-password" @click="toggleShow">
                                            <i class="fas text-success" :class="{
                                                'fa-eye-slash': showPassword, 
                                                'fa-eye': !showPassword, 
                                            }">
                                            </i></span>
                                        <span class="text-danger" v-if="errors.password"> {{ errors.password }} </span>
                                    </div>

                                    <!-- Password Confirmation -->
                                    <div class="form-group">
                                        <Field name="password_confirmation" :type="showPassword ? 'text' : 'password'"
                                            class="form-control" :class="{'is-invalid' : errors.password_confirmation}"
                                            placeholder="Confirm Password" />

                                        <span class="view-password" @click="toggleShow">
                                            <i class="fas text-success" :class="{
                                                'fa-eye-slash': showPassword, 
                                                'fa-eye': !showPassword, 
                                            }">
                                            </i></span>
                                        <span class="text-danger" v-if="errors.password_confirmation"> {{
                                        errors.password_confirmation }} </span>
                                    </div>


                                    <div class="form-button">
                                        <button type="submit" :disable="isSubmitting"> Register
                                            <span v-show="isSubmitting"
                                                class="spinner-border spinner-border-sm mx-1"></span>
                                        </button>
                                    </div>
                                </Form>
                            </div>


                        </div>
                        <div class="user-form-remind">
                            <p>
                                Have any account?<router-link :to="{name: 'user.login'}">Login here
                                </router-link>
                            </p>
                        </div>
                        <div class="user-form-footer"></div>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>
    
<style>
@import "@/assets/css/user-auth.css";
</style>