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
            <div class="col-12 col-lg-10 offset-lg-1">
                <form @submit.prevent="onSubmit" class="row utf_signin_form" method="post">
                    <div class="left-column">
                                <h1 class="title text-center">{{ $t("text.login") }}</h1>
                                <div class="form-group">
                                    <label for="email" class="font-weight-bold">{{ $t("text.email") }}</label>
                                    <Field name="email" :rules="'required|email'" v-model="auth.email" />
                                    <ErrorMessage name="email" />
                                </div>
                                <div class="form-group">
                                    <label for="password" class="font-weight-bold">{{ $t("text.password") }}</label>
                                    <Field name="password" :rules="'required'" v-model="auth.password" />
                                    <ErrorMessage name="password" />
                                </div>
                                <div class="form-group utf_row_form utf_form_wide_block form_forgot_part"> 
                                    <div class="lost_password mb-2"> <a href="javascript:void(0);" class="link">{{ $t("text.forget_password") }}?</a> </div>
                                    <div class="checkboxes in-row">
                                        <input id="remember-me" type="checkbox" name="check">
                                        <label for="remember-me">{{ $t("text.remember_me") }}
                                            <span class="tick">
                                                <font-awesome-icon :icon="['fas', 'check']"/>
                                            </span>
                                        </label>
                                    </div>
                                </div>
                                <div class="mb-2">
                                    <button type="submit" :disabled="processing" @click="login" class="btn">
                                        {{ processing ? $t("text.please_wait") : $t("text.login") }}
                                    </button>
                                </div>
                    </div>
                    <div class="right-column">
                                <div class="utf-reg-txt">
                                    <p>{{ $t("text.not_account") }}</p>
                                    <router-link :to="{name:'register'}" class="reg-link">{{ $t("text.sign_up") }}</router-link>
                                </div>
                                <div class="utf-login_with">
                                    <span class="txt">{{ $t("text.or") }}</span>
                                </div>
                                <div class="">
                                    <button class="social_bt facebook_btn" @click="loginWithFacebbok">Login with Facebook</button>
                                    <button class="social_bt google_btn" @click="loginWithGoogle">Login with Google</button>
                                </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>