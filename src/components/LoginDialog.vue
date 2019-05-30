<template>
    <form @submit="registrate">
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
</template>
<script>
export default {
    data() {
        return {
            email: '',
            pw: '',
        }
    },
    methods: {
        login() {
            firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
                var errorCode = error.code;
                var errorMessage = error.message;
            });
        },
        registrate() {
            firebase.auth().createUserWithEmailAndPassword(this.email, this.pw).catch(function(error) {
                var errorCode = error.code;
                var errorMessage = error.message;
            });
        }
    }
}
</script>
