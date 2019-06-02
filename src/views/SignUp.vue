<template>
    <div class="login-wrapper">
        <span class="login-head-icon">
            <img src="@/assets/user.png" class="icon"/>
        </span>
        <h2 class="login-title">Create an Account</h2>
        <form v-on:submit.prevent="registrate">
            <label>
                <input type="email" v-model="email" name="email" placeholder="Benutzername" autocomplete="off"/>
            </label>
            <label>
                <input type="password" v-model="pw" name="password" placeholder="Passwort" autocomplete="off"/>
            </label>
            <button class="submit-btn" type="submit">Registrieren</button>
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
<style lang="scss" scoped>
.login-wrapper {
    max-width: 500px;
    width: 45%;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border: 1px solid #F1EFEF;
    padding: 2rem;
    box-shadow:  0 3px 6px rgba(0, 0, 0, 0.16);
}
.login-title{
    margin-top: 2rem;
    color: white;
}
.submit-btn {
    width: 100%;
    margin: 0;
    padding: .75rem;
    border: 0;
    background: var(--accentColor);
    color: white;
    border-radius: 2px;
    text-transform: uppercase;
    margin-bottom: .5rem;
}
input {
    display: block;
    width: 100%;
    padding: 0.75rem;
    border: none;
    margin: 1.5rem 0;
}
.login-head-icon {
    position: absolute;
    top: 0;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 24px;
    border-radius: 50%;
    border: 1px solid white;
    width: calc(45px + 48px);
    height: calc(45px + 48px);
    background: #36b0b7;

    .icon {
        height: 45px;
    }
}
</style>
