<template>
<userManagementDialog
        dialogTitle="Create an Account"
        buttonTitle="Registrieren"
        v-on:formSubmitted="registrate"
    >
        <template slot="inputs">
            <label>
                <input type="email" v-model="email" name="email" placeholder="Benutzername" autocomplete="off"/>
            </label>
            <label>
                <input type="password" v-model="pw" name="password" placeholder="Passwort" autocomplete="off"/>
            </label>
        </template>
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
        registrate() {
            firebaseConfig.firebase.auth().createUserWithEmailAndPassword(this.email, this.pw)
            .then(
                user => {
                    this.$router.replace('/');
                    localStorage.setItem('user', JSON.stringify({ id: user.user.uid, email: user.user.email, name: user.user.displayName }));
                },
                error => {
                    alert(error.message);
                }
            );
        }
    }
}
</script>
