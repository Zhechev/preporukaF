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
        <div class="row h-100 align-items-center">
            <div class="col-12 col-md-6 offset-md-3">
                <div class="card shadow sm">
                    <div class="card-body">
                        <h1 class="text-center">Login</h1>
                        <hr/>
                        <form @submit.prevent="onSubmit" class="row" method="post">
                            <div class="form-group col-12">
                                <label for="email" class="font-weight-bold">Email</label>
                                <Field name="email" :rules="'required|email'" v-model="auth.email" />
                                <ErrorMessage name="email" />
                            </div>
                            <div class="form-group col-12 my-2">
                                <label for="password" class="font-weight-bold">Password</label>
                                <Field name="password" :rules="'required'" v-model="auth.password" />
                                <ErrorMessage name="password" />
                            </div>
                            <div class="col-12 mb-2">
                                <button type="submit" :disabled="processing" @click="login" class="btn btn-primary btn-block">
                                    {{ processing ? "Please wait" : "Login" }}
                                </button>
                            </div>
                            <div class="col-12 text-center">
                                <label>Don't have an account? <router-link :to="{name:'register'}">Register Now!</router-link></label>
                            </div>
                            <button @click="loginWithGoogle">Login with Google</button>
                            <button @click="loginWithFacebbok">Login with Facebook</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>