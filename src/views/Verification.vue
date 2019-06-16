<template>
    <div class="verification-request">
        <h1 class="title">Verifikations-Email wurde versandt!</h1>
        <img src="@/assets/email.svg"/>
        Um deinen Account zu aktivieren, verifiziere bitte deine Email-Adresse. <br/>Danach kann es auch schon losgehen :)
        <router-link class="link" :to="{ name: 'signIn'}">Zurück zum Login</router-link>
    </div>
</template>
<style lang="scss" scoped>
.verification-request {
    color: white;
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    max-width: 800px;
    width: 80%;
}
img {
    display: block;
    margin: auto;
    width: 150px;
}
.link {
    display: block;
    color: white;
    margin: 2rem;
}
</style>
