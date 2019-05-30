<template>
    <div>
        <h2>Sign in to Your Account</h2>
        <form v-on:submit.prevent="login">
            <label>
                Email
                <input type="email" v-model="email"/>
            </label>
            <label>
                Passwort
                <input type="password" v-model="pw"/>
            </label>
            <button type="submit">Sign In</button>
        </form>
        <router-link to="sign-up">
            Registrierung
        </router-link>
    </div>
</template>
<script>
const firebaseConfig = require('../firebaseConfig.js')

export default {
    data() {
        return {
            email: '',
            pw: '',
        }
    },
    methods: {
        login() {
            firebaseConfig.firebase.auth().signInWithEmailAndPassword(this.email, this.pw)
            .then(
                user => {
                    this.$router.replace('/');
                },
                error => {
                    alert(error.message);
                }
            );
        },
    }
}
</script>
