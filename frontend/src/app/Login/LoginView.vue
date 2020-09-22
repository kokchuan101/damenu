<template>
    <div class="row justify-content-center align-items-center h-100 text-center" >
        <v-form
            class="col-12 col-lg-4 p-4 rounded card shadow-lg"
            ref="form"
            v-model="valid"
            @submit.prevent="handleSubmit">
            <v-text-field
                label="Email"
                v-model="account.email"
                :rules="rules.email"
            ></v-text-field>
            <v-text-field
                label="Password"
                v-model="account.password"
                :rules="rules.password"
                type="password"
            ></v-text-field>
            <div v-if="isReset">
                <v-btn
                    block
                    color="info"
                    class="mt-5"
                    type="submit"
                >Reset Password</v-btn>
                <a href="#" @click="changeResetState(false)" class="d-inline-block mt-5">Back to Login</a>
            </div>
            <div v-else>
                <v-btn
                    block
                    color="success"
                    class="mt-2"
                    type="submit"
                >Login</v-btn>
                <v-btn
                    block
                    color="info"
                    class="mt-5"
                    :to="{ name: 'RegisterView' }"
                >Register</v-btn>
                <a href="#" @click="changeResetState(true)" class="d-inline-block mt-5">Reset Password</a>
            </div>
        </v-form>
    </div>
</template>

<script>
import { path } from '@/constant.js';
import axios from 'axios';
import ValidationMixin from '@/app/mixins/validation.mixin.js';

export default {
    mixins: [ValidationMixin],
    data() {
        return {
            rules: {
                email: [this.required('Email'), this.email()],
                password: [this.required('Password'), this.min(8, 'Password')]
            },
            account: {
                email: '',
                password: ''
            },
            valid: false,
            isReset: false
        };
    },
    methods: {
        handleSubmit() {
            if (this.$refs.form.validate()) {
                if (this.isReset) {
                    axios
                        .post(path.accounts.resetPassword, this.account)
                        .then((response) => {
                            this.changeResetState(false);
                            this.$alertify.success('Successfully reset password');
                        })
                        .catch((error) => { this.handleError(error); });
                } else {
                    axios
                        .post(path.accounts.login, this.account)
                        .then((response) => {
                            sessionStorage.user = JSON.stringify(response.data.user);
                            sessionStorage.token = response.data.access_token;
                            this.$alertify.success('Logged in');
                            this.$router.push({ name: 'MenuListView' });
                        })
                        .catch((error) => { this.handleError(error); });
                }
            } else {
                this.$alertify.error('Validation error, please rectify fields');
            }
        },
        handleError(error) {
            switch (error.response.status) {
            case 400:
                this.$alertify.error(error.response.data.message[0]);
                break;
            case 401:
                this.$refs.form.reset();
                this.$alertify.error('Invalid Email or Password');
                break;
            default:
                this.$alertify.error(error.response.data.message);
            }
        },
        changeResetState(bool) {
            this.isReset = bool;
            this.$refs.form.reset();
        }
    }
};
</script>

<style>
</style>
