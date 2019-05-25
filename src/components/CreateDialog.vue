<template>
    <div v-if="active">
        <div class="dialog">
            <button id="closeDialog" @click="$emit('update:active')">
                <img src="@/assets/close-light-gray.svg" class="icon"/>
            </button>
            <div class="contentWrapper">
                <h3 class="cardTitle">Neue ToDo List</h3>
                <BaseInput
                    v-model="newTitle"
                    name="newTitleInput"
                    placeholder="Gib mir einen Namen"
                    label="Titel"
                />
            </div>
            <button class="submitBtn" type="button" @click="handleSubmit">Erstellen</button>
        </div>
        <div class="overlay"></div>
    </div>
</template>
<script>
import BaseInput from '@/components/BaseInput.vue'

export default {
  components: {
      BaseInput,
  },
  props: {
    value: {
      type: String
    },
    active: {
        type: Boolean
    }
  },
  computed: {
    newTitle: {
      get() {
        return this.value;
      },
      set(newTitle) {
        this.$emit("input", newTitle);
      },
    },
  },
  methods: {
      handleSubmit() {
          this.$emit('update:active');
          this.$emit('newToDoListConfigured');
      }
  }
}
</script>
<style lang="scss" scoped>
.dialog {
    background: white;
    padding: 0;
    margin: 8px;
    border-radius: 2px;
    box-shadow: var(--defaultBoxShadow);
    z-index: 10;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    min-width: 300px;

    #closeDialog {
        background: none;
        border: none;
        cursor: pointer;
        position: absolute;
        right: 0;
        padding: 4px;

        .icon {
            width: 20px;
        }
    }

    .contentWrapper {
        padding: 16px;
        text-align: left;

        .cardTitle {
            margin: .5em 0;
            text-align: center;
            color: var(--textColor);
        }
    }

    .submitBtn {
        width: 100%;
        margin: 0;
        padding: 8px;
        border: 0;
        background: var(--primaryColor);
        color: white;
        border-bottom-right-radius: 2px;
        border-bottom-left-radius: 2px;
    }
}
.overlay {
    background: #00000094;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
}

</style>

