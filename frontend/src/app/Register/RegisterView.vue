<template>
    <div class="row justify-content-center align-items-center h-100" >
        <v-form
            class="col-12 col-lg-4 p-4 rounded card shadow-lg text-center"
            ref="form"
            v-model="valid"
            @submit.prevent="handleSubmit">
            <v-text-field
                label="Name"
                v-model="account.name"
                :rules="rules.name"
                placeholder="David Khor"
            ></v-text-field>
            <v-text-field
                label="Email"
                v-model="account.email"
                :rules="rules.email"
                placeholder="david@gmail.com"
            ></v-text-field>
            <v-text-field
                name="password"
                label="Password"
                v-model="account.password"
                :rules="rules.password"
                placeholder="davido123"
                type="password"
            ></v-text-field>
            <v-btn
                block
                color="info"
                class="mt-2"
                type="submit"
            >Register</v-btn>
        </v-form>
    </div>
</template>

<script>
import { path } from '@/constant.js';
import axios from 'axios';
import ValidationMixin from '@/app/mixins/validation.mixin.js';
import AxiosHandlerMixin from '@/app/mixins/axiosHandler.mixin.js';

export default {
    mixins: [ValidationMixin, AxiosHandlerMixin],
    data() {
        return {
            account: {
                name: '',
                email: '',
                password: ''
            },
            rules: {
                name: [this.required('Name')],
                email: [this.required('Email'), this.email()],
                password: [this.required('Password')]
            },
            valid: false
        };
    },
    methods: {
        handleSubmit() {
            if (this.$refs.form.validate()) {
                axios
                    .post(path.accounts.index, this.account)
                    .then((response) => {
                        this.$alertify.success('Registration successful');
                        this.$router.push({ name: 'LoginView' });
                    })
                    .catch((error) => {
                        this.axiosErrorHandler(error);
                    });
            } else {
                this.$alertify.error('Validation error, please rectify fields');
            }
        }
    }
};
</script>

<style>
</style>
