<script setup>
import { ref } from 'vue';
import { useStore } from 'vuex';
import { Field, ErrorMessage, defineRule, useForm } from 'vee-validate';
import { required, email } from '@vee-validate/rules';

const BASE_URL = process.env.VUE_APP_BASE_API_URL;

// Define vee-validate rules
defineRule('required', required);
defineRule('email', email);

const auth = ref({
    email: "",
    password: ""
});

const processing = ref(false);
const store = useStore();

// Create a form context
const { handleSubmit, setFieldError } = useForm();

const onSubmit = handleSubmit(async () => {
    processing.value = true;
    try {
        await store.dispatch('auth/login', auth.value);
    } catch (error) {
        const errors = error.errors || {};

        // Set the server errors for vee-validate to display
        for (const key in errors) {
            setFieldError(key, errors[key][0]);
        }
    } finally {
        processing.value = false;
    }
});

const loginWithGoogle = () => {
    window.location.href = `${BASE_URL}/redirect-to-google`;
}

const loginWithFacebbok = () => {
    window.location.href = `${BASE_URL}/redirect-to-facebook`;
}
</script>



<template>
    <div class="container h-100">
        <div class="row with-forms">
            <div class="col-12 col-md-10 offset-md-1">
           
                        <form @submit.prevent="onSubmit" class="row utf_signin_form" method="post">
                            <div class="left-column">
                                <h1 class="text-center">Login</h1>
                                <div class="form-group">
                                    <label for="email" class="font-weight-bold">Email</label>
                                    <Field name="email" :rules="'required|email'" v-model="auth.email" />
                                    <ErrorMessage name="email" />
                                </div>
                                <div class="form-groupmy-2">
                                    <label for="password" class="font-weight-bold">Password</label>
                                    <Field name="password" :rules="'required'" v-model="auth.password" />
                                    <ErrorMessage name="password" />
                                </div>
                                <div class="form-grouputf_row_form utf_form_wide_block form_forgot_part"> 
                                    <span class="lost_password fl_left"> <a href="javascript:void(0);">Forgot Password?</a> </span>
                                    <div class="checkboxes fl_right">
                                        <input id="remember-me" type="checkbox" name="check">
                                        <label for="remember-me">Remember Me</label>
                                    </div>
                                </div>
                                <div class="mb-2">
                                    <button type="submit" :disabled="processing" @click="login" class="btn">
                                        {{ processing ? "Please wait" : "Login" }}
                                    </button>
                                </div>
                                </div>
                            <div class="right-column">
                                <div class="utf-reg-txt">
                                    <p>Don't have an account?</p>
                                    <router-link :to="{name:'register'}" class="reg-link">Sign up</router-link>
                                </div>
                                <div class="utf-login_with">
                                    <span class="txt">Or</span>
                                </div>
                                <div class="d-flex">
                                    <button class="social_bt facebook_btn mb-0" @click="loginWithFacebbok">Login with Facebook</button>
                                    <button class="social_bt google_btn mb-0" @click="loginWithGoogle">Login with Google</button>
                                </div>
                            </div>
                        </form>
             
            </div>
        </div>
    </div>
</template>