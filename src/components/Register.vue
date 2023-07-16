<template>
    <div class="container h-100">
        <div class="row h-100 align-items-center">
            <div class="col-12 col-md-6 offset-md-3">
                <div class="card shadow sm">
                    <div class="card-body">
                        <h1 class="text-center">Register</h1>
                        <hr/>
                        <form action="javascript:void(0)" @submit="handleRegister" class="row" method="post">
                            <div class="col-12" v-if="Object.keys(validationErrors).length > 0">
                                <div class="alert alert-danger">
                                    <ul class="mb-0">
                                        <li v-for="(value, key) in validationErrors" :key="key">{{ value[0] }}</li>
                                    </ul>
                                </div>
                            </div>
                            <div class="form-group col-12">
                                <label for="name" class="font-weight-bold">Name</label>
                                <input type="text" name="name" v-model="user.name" id="name" placeholder="Enter name" class="form-control">
                                <p class="text-danger" v-if="validationErrors.name">{{ validationErrors.name[0] }}</p>
                            </div>
                            <div class="form-group col-12 my-2">
                                <label for="email" class="font-weight-bold">Email</label>
                                <input type="text" name="email" v-model="user.email" id="email" placeholder="Enter Email" class="form-control">
                                <p class="text-danger" v-if="validationErrors.email">{{ validationErrors.email[0] }}</p>
                            </div>
                            <div class="form-group col-12">
                                <label for="password" class="font-weight-bold">Password</label>
                                <input type="password" name="password" v-model="user.password" id="password" placeholder="Enter Password" class="form-control">
                                <div v-if="validationErrors.password" class="text-danger">
                                    <p v-for="(error, index) in validationErrors.password" :key="index">{{ error }}</p>
                                </div>
                            </div>
                            <div class="form-group col-12 my-2">
                                <label for="password_confirmation" class="font-weight-bold">Confirm Password</label>
                                <input type="password" name="password_confirmation" v-model="user.password_confirmation" id="password_confirmation" placeholder="Enter Password" class="form-control">
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

<script>
import { mapActions } from 'vuex';

export default {
    name: "RegisterForm",
    data() {
        return {
            user: {
                name: "",
                email: "",
                password: "",
                password_confirmation: ""
            },
            validationErrors: {},
            processing: false
        };
    },
    methods: {
        ...mapActions('auth', ['register']),
        async handleRegister() {
            this.processing = true;
            try {
                await this.register({userData: this.user, lang: this.$i18n.locale});
                this.$router.push({ name: 'home' }); // <- moved here
                this.validationErrors = {};
            } catch (error) {
                if (error.response && error.response.status === 422) {
                    this.validationErrors = error.response.data.errors;
                } else {
                    this.validationErrors = {};
                    alert(error.response ? error.response.data.message : error.message);
                }
            } finally {
                this.processing = false;
            }
        }

    }
};
</script>
