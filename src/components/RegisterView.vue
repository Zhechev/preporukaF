<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { useStore } from 'vuex';
import { Field, ErrorMessage, defineRule, useForm, configure } from 'vee-validate';
import { required, email, confirmed, min } from '@vee-validate/rules';

const router = useRouter();
const { t, locale } = useI18n();
const store = useStore();

configure({
  generateMessage: (context) => {
    const displayName = getDisplayName(context.field);
    switch (context.rule.name) {
      case 'required':
        return t('validation.required', { field: displayName });
      case 'email':
        return t('validation.email');
      case 'confirmed':
        return t('validation.password_confirmation');
      case 'min':
        return t('validation.min', { min: 5 });
      default:
        return `The ${displayName} field is not valid.`;
    }
  },
});


defineRule('required', required);
defineRule('email', email);
defineRule('confirmed', confirmed);
defineRule('min', min);

const user = ref({
  name: '',
  email: '',
  password: '',
  password_confirmation: '',
});

const processing = ref(false);

const { handleSubmit, setFieldError } = useForm();

const onSubmit = handleSubmit(async () => {
  processing.value = true;
  try {
    await store.dispatch('auth/register', {
      userData: user.value,
      lang: locale,
    });
    router.push({ name: 'home' });
  } catch (error) {
    const errorMessages = error.errors || {};

    for (const key in errorMessages) {
        setFieldError(key, errorMessages[key][0]);
    }
  } finally {
    processing.value = false;
  }
});

// Retrieves a user-friendly display name for a given field name in vee-validate
function getDisplayName(fieldName) {
  const names = {
    name: t('text.name'),
    email: 'Email',
    password: 'Password',
    password_confirmation: 'Password Confirmation',
  };

  return names[fieldName] || fieldName;
}
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
                                <label for="name" class="font-weight-bold">{{ $t('text.name') }}</label>
                                <Field name="name" :rules="'required|min:5'" v-model="user.name" />
                                <ErrorMessage name="name" class="error-message" />
                            </div>
                            <div class="form-group col-12 my-2">
                                <label for="email" class="font-weight-bold">{{ $t('text.email') }}</label>
                                <Field name="email" :rules="'required|email'" v-model="user.email" />
                                <ErrorMessage name="email" />
                            </div>
                            <div class="form-group col-12">
                                <label for="password" class="font-weight-bold">{{ $t('text.password') }}</label>
                                <Field type="password" name="password" :rules="'required'" v-model="user.password" />
                                <ErrorMessage name="password" />
                            </div>
                            <div class="form-group col-12 my-2">
                                <label for="password_confirmation" class="font-weight-bold">{{ $t('text.confirm_password') }}</label>
                                <Field type="password" name="password_confirmation" :rules="'required|confirmed:@password'" v-model="user.password_confirmation" />
                                <ErrorMessage name="password_confirmation" />
                            </div>
                            <div class="col-12 mb-2">
                                <button type="submit" :disabled="processing" class="btn btn-primary btn-block">
                                    {{ processing ? $t('text.please_wait') : $t('text.register') }}
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