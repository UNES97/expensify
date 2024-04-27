<script>
import { mapActions } from 'vuex';
export default {
    data() {
        return {
            loading: false,
            username: '',
            password: '',
            errors: []
        };
    },
    methods: {
        ...mapActions({
			signIn: 'signIn'
		}),
        async handleSubmit() {
            const credentials = {
                username: this.username,
                password: this.password
            };
            this.errors = [];

            if (!this.username) this.errors.push('uname');
            if (!this.password) this.errors.push('pass');
            if (!this.errors.length)
            {
                try {
                    this.loading = true;
                    await this.signIn(credentials);
                } 
                catch (error) {
                    console.error('Failed to sign in:', error);
                } 
                finally {
                    this.loading = false;
                }
            }
        }
    }
}
</script>

<template>
    <div class="flex align-items-center justify-content-center flex-column">
        <h1 class="appLogoLog">Xpnsfy</h1>
        <Card class="w-full xl:w-4 px-5">
            <template #title>
                <h3 class="text-center">Login to your Account</h3>
            </template>
            <template #content>
                <div class="flex flex-column gap-2 mb-3">
                    <label for="username">Username</label>
                    <InputText id="username" v-model="username" aria-describedby="username-help" />
                    <small v-if="errors.includes('uname')" class="p-error">Username is required.</small>
                </div>
                <div class="flex flex-column gap-2 mb-3">
                    <label for="password">Password</label>
                    <InputText id="password" v-model="password" aria-describedby="password-help" type="password" />
                    <small v-if="errors.includes('pass')" class="p-error">Password is required.</small>
                </div>
                <Button :label="loading ? 'Please wait...' : 'Connect'" @click="handleSubmit" class="w-full mb-3" severity="help" raised />
                <router-link :to="{name: 'Signup'}">Don't have an Account ?</router-link>
            </template>
        </Card>        
    </div>
</template>

<style>

</style>