<script>
import axios from 'axios';
import { BASE_URL } from '../consts';
import { showNotification } from '../utils';
export default {
    data() {
        return {
            loading: false,
            formUser: {
                email: "",
                password: "",
                cpassword: "",
                username: "",
                fullname: "",
            },
            errors: [],
        }
    },
    methods: {
        checkAddForm(e) {
            this.errors = [];

            if (!this.formUser.fullname) this.errors.push('fname');
            if (!this.formUser.username) this.errors.push('uname');
            if (!this.formUser.email) this.errors.push('email');
            if (!this.formUser.password) this.errors.push('pass');
            if (this.formUser.password !== this.formUser.cpassword) this.errors.push('passmatch');

            if (!this.errors.length) this.addUser(e);
            e.preventDefault();
        },
        resetAddForm() {
            for (let p in this.formUser) {
                this.formUser[p] = '';
            }
        },
        addUser(e) {
            this.loading = true;
            var rawForm = {
                "email": this.formUser.email,
                "fullname": this.formUser.fullname,
                "username": this.formUser.username,
                "password": this.formUser.password,
            };

            let app = this;
            axios.post(`${BASE_URL}api/signup`, rawForm, {})
            .then(function (response) {
                const statusNot = response.data.statusCode == 201 ? 'success' : 'error';
                showNotification(response.data.message, statusNot);
                if(response.data.statusCode == 201)
                {
                    app.resetAddForm();
                    app.$router.push({name:'Login'});
                }
            })
            .catch(function (error) {
                console.log(error);
            })
            .finally(() => {
                app.loading = false;
                app.errors = [];
            });
            e.preventDefault();
        },
    }
}
</script>

<template>
    <div class="flex align-items-center justify-content-center flex-column mt-5">
        <!-- <h1 class="appLogoLog">Xpnsfy</h1> -->
        <img class="w-5 md:w-3 xl:w-2" src="/images/logo-full.png" alt="Expensify" srcset="">
        <Card class="w-full xl:w-4 px-5 mt-5">
            <template #title>
                <h3 class="text-center">Create a FREE Account</h3>
            </template>
            <template #content>
                <div class="flex flex-column gap-2 mb-3">
                    <label for="fullname">Fullname</label>
                    <InputText id="fullname" v-model="formUser.fullname" aria-describedby="fullname-help" />
                    <small v-if="errors.includes('fname')" class="p-error">Fullname is required.</small>
                </div>
                <div class="flex flex-column gap-2 mb-3">
                    <label for="username">Username</label>
                    <InputText id="username" v-model="formUser.username" aria-describedby="username-help" />
                    <small v-if="errors.includes('uname')" class="p-error">Username is required.</small>
                </div>
                <div class="flex flex-column gap-2 mb-3">
                    <label for="email">Email</label>
                    <InputText id="email" aria-describedby="email-help" v-model="formUser.email" type="email" />
                    <small v-if="errors.includes('email')" class="p-error">Email is required.</small>
                </div>
                <div class="flex flex-column gap-2 mb-3">
                    <label for="password">Password</label>
                    <InputText id="password" v-model="formUser.password" aria-describedby="password-help" type="password" />
                    <small v-if="errors.includes('pass')" class="p-error">Password is required.</small>
                </div>
                <div class="flex flex-column gap-2 mb-3">
                    <label for="cpassword">Confirm Password</label>
                    <InputText id="cpassword" v-model="formUser.cpassword" aria-describedby="cpassword-help" type="password" />
                    <small v-if="errors.includes('passmatch')" class="p-error">Passwords are not matching.</small>
                </div>
                <Button :label="loading ? 'Please wait...' : 'Create account'" @click="checkAddForm" class="w-full mb-3" severity="help" raised />
                <router-link :to="{name: 'Login'}">Already have an Account ?</router-link>
            </template>
        </Card>        
    </div>
</template>

<style>

</style>