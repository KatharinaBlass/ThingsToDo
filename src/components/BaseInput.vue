<template>
    <label
        :v-if="label"
        :for="name"
        :class="{ standalone: standalone, invalid: !valid }"
    >
        {{ label }}
        <input
            v-model="inputValue"
            v-on="{
                ...$listeners,
                input: event => {
                    if (event.target.value != '') {
                        $emit('update:valid', true)
                    }
                }
            }"
            v-bind="$attrs"
            :type="type"
            :name="name"
            :placeholder="placeholder"
            :value="inputValue"
            autocomplete="off"
        />
    </label>
</template>
<script>
export default {
    props: {
        label: {
            type: String,
            default: "",
        },
        value: {
            type: String,
            required: true,
        },
        type: {
            type: String,
            default: 'text',
        },
        name: {
            type: String,
            required: true,
        },
        placeholder: {
            type: String,
            default: '',
        },
        standalone: {
            type: Boolean,
            default: false,
        },
        valid: {
            type: Boolean,
            required: true,
        }
    },
    computed: {
        inputValue: {
            get() {
                return this.value;
            },
            set(inputValue) {
                this.$emit("input", inputValue);
            },
        },
    }
}
</script>
<style lang="scss" scoped>
label {
    text-transform: uppercase;
    font-size: .8rem;
    color: var(--textColor);

    input {
        display: block;
        width: 100%;
        padding: 4px 0;
        border: none;
        background: none;
        font-size: 1rem;
        border-bottom: 1px solid var(--textColor);
        color: inherit;

        &:focus {
            outline: none;
            border-color: var(--primaryColor);
        }

        &::placeholder {
            color: inherit;
        }
    }
}

label[class='invalid'] {
    color: red !important;

    input {
        color: initial;
        border-color: red !important
    }
}

.standalone {
    color: #ffffffbb;

    input {
        padding: 8px;
        border-color: #ffffffbb;
        font-size: 1.2rem;
    }
}
</style>