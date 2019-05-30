<template>
    <div>
        <h2>Create an Account</h2>
        <form v-on:submit.prevent="registrate">
            <label>
                Email
                <input type="email" v-model="email"/>
            </label>
            <label>
                Passwort
                <input type="password" v-model="pw"/>
            </label>
            <button type="submit">Sign Up</button>
        </form>
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
        registrate() {
            firebaseConfig.firebase.auth().createUserWithEmailAndPassword(this.email, this.pw)
            .then(
                user => {
                    this.$router.replace('/');
                },
                error => {
                    alert(error.message);
                }
            );
        }
    }
}
</script>
