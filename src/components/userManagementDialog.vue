<template>
    <div class="dialog-wrapper">
        <span class="dialog-head-with-icon">
            <img src="@/assets/user.png" class="icon"/>
        </span>
        <h2 class="dialog-title">{{ dialogTitle }}</h2>
        <form v-on:submit.prevent="$emit('formSubmitted')">
            <slot name="inputs"></slot>
            <button class="submit-btn" type="submit">{{ btnTitle }}</button>
        </form>
        <slot name="links"></slot>
    </div>
</template>
<script>

export default {
    props: {
        dialogTitle: {
            type: String,
            default: '',
        },
        btnTitle: {
            type: String,
            default: 'Submit',
        }
    }
}
</script>
<style lang="scss" scoped>
.dialog-wrapper {
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
.dialog-title{
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
    cursor: pointer;
}
input {
    display: block;
    width: 100%;
    padding: 0.75rem;
    border: none;
    margin: 1.5rem 0;
}
.dialog-head-with-icon {
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
