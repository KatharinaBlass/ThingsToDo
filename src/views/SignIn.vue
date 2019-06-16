<template>
    <userManagementDialog
        dialogTitle="Sign in to Your Account"
        buttonTitle="Anmelden"
        v-on:formSubmitted="login"
    >
        <template slot="inputs">
            <label>
                <input type="email" v-model="email" name="email" placeholder="Benutzername" autocomplete="off"/>
            </label>
            <label>
                <input type="password" v-model="pw" name="password" placeholder="Passwort" autocomplete="off"/>
            </label>
        </template>
        <div class="additional" slot="links">
            <div class="sign-up">
                Registriere dich
                <router-link to="sign-up" class="sign-up-link">
                    hier!
                </router-link>
            </div>
            <div class="pw-recovery">
                Passwort vergessen?
            </div>
        </div>
    </userManagementDialog>
</template>
<script>
const firebaseConfig = require('../firebaseConfig.js')
import userManagementDialog from '@/components/userManagementDialog.vue'

export default {
    data() {
        return {
            email: '',
            pw: '',
        }
    },
    components: {
        userManagementDialog
    },
    methods: {
        login() {
            firebaseConfig.firebase.auth().signInWithEmailAndPassword(this.email, this.pw)
            .then(
                user => {
                    this.$router.replace('/');
                    localStorage.setItem('user', JSON.stringify(user.user));
                },
                error => {
                    alert(error.message);
                }
            );
        },
    }
}
</script>
<style lang="scss" scoped>
.additional {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;

    .sign-up, .pw-recovery {
        color: #F2F2F2;
        font-style: italic;
        font-size: 80%;
        text-align: left;

        .sign-up-link {
            color: #F2F2F2;
            font-size: inherit;
            font-weight: bold;
        }
    }
}
</style>
