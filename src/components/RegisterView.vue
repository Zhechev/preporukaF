<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { useStore } from 'vuex';
import { Field, ErrorMessage, defineRule, useForm } from 'vee-validate';
import { required, email } from '@vee-validate/rules';

// Define vee-validate rules
defineRule('required', required);
defineRule('email', email);

const user = ref({
  name: '',
  email: '',
  password: '',
  password_confirmation: '',
});

const processing = ref(false);

const router = useRouter();
const { locale } = useI18n();
const store = useStore();

const { handleSubmit, setFieldError } = useForm();

const onSubmit = handleSubmit(async () => {
  processing.value = true;
  try {
    await store.dispatch('auth/register', {
      userData: user,
      lang: locale,
    });
    router.push({ name: 'home' });
    // Clear individual error fields
    }  catch (error) {
        const errors = error.errors || {};

        // Set the server errors for vee-validate to display
        for (const key in errors) {
            setFieldError(key, errors[key][0]);
        }
    } finally {
        processing.value = false;
    }
}); 
</script>

<template>
    <div class="container h-100">
        <div class="row h-100 align-items-center">
            <div class="col-12 col-md-6 offset-md-3">
                <div class="card shadow sm">
                    <div class="card-body">
                        <h1 class="text-center">Register</h1>
                        <hr/>
                        <form @submit.prevent="onSubmit" class="row" method="post">
                            <div class="form-group col-12">
                                <label for="name" class="font-weight-bold">Name</label>
                                <Field name="name" :rules="'required'" v-model="user.name" />
                                <ErrorMessage name="name" />
                            </div>
                            <div class="form-group col-12 my-2">
                                <label for="email" class="font-weight-bold">Email</label>
                                <Field name="email" :rules="'required|email'" v-model="user.email" />
                                <ErrorMessage name="email" />
                            </div>
                            <div class="form-group col-12">
                                <label for="password" class="font-weight-bold">Password</label>
                                <Field type="password" name="password" :rules="'required'" v-model="user.password" />
                                <ErrorMessage name="password" />
                            </div>
                            <div class="form-group col-12 my-2">
                                <label for="password_confirmation" class="font-weight-bold">Confirm Password</label>
                                <Field type="password" name="password_confirmation" :rules="'required'" v-model="user.password_confirmation" />
                                <ErrorMessage name="password_confirmation" />
                            </div>
                            <div class="col-12 mb-2">
                                <button type="submit" :disabled="processing" class="btn btn-primary btn-block">
                                    {{ processing ? "Please wait" : "Register" }}
                                </button>
                            </div>
                            <div class="col-12 text-center">
                                <label>Already have an account? <router-link :to="{name:'login'}">Login Now!</router-link></label>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>