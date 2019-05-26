<template>
    <div class="margin">
        <label v-if="label" :for="name" :class="{ invalid: !valid }">
            {{ label }}
        </label>
        <div class="wrapper">
            <button
                v-for="(value, key, index) in options"
                :key="index"
                type="button"
                :name="name"
                :class="{ active: activeOption === key }"
                @click="()=>{ activeOption = key; $emit('update:valid', true)}"
            >
                {{ value }}
            </button>
        </div>
    </div>
</template>
<script>
export default {
    props: {
        options: {
            type: Object,
            required: true,
        },
        value: {
            type: String,
            default: '',
        },
        label: {
            type: String,
            default: '',
        },
        name: {
            type: String,
            required: true,
        },
        valid: {
            type: Boolean,
            required: true,
        }
    },
    computed: {
        activeOption: {
            get() {
                return this.value;
            },
            set(activeOption) {
                this.$emit("input", activeOption);
            },
        }
    }
}
</script>
<style lang="scss" scoped>
.margin {
    margin: 1rem 0;

    label {
        text-transform: uppercase;
        font-size: .8rem;
        color: var(--textColor);

        & + .wrapper {
            display: block;
            margin: 4px 0;

            button:not(.active) {
                color: var(--textColor);
            }
        }
    }
}
.wrapper {
    display: inline-block;
    border-radius: 4px;

    button {
        background: none;
        border: none;
        width: 70px;
        padding: 4px 8px;
        border-radius: 4px;
        color: white;
        transition: 0.2s;

        &:hover {
            background: rgba(74, 209, 205, 0.23);
        }

        &.active {
            background: var(--primaryColor);
            border-radius: 4px;
        }
    }
}
.invalid {
    color: red !important;
}

</style>

