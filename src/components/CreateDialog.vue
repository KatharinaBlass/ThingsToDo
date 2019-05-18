<template>
    <div v-if="active">
        <div class="dialog">
            <button id="closeDialog" @click="$emit('update:active')">
                <img src="@/assets/close-light-gray.svg" class="icon"/>
            </button>
            <div class="contentWrapper">
                <h3 id="title">Neue ToDo List</h3>
                <label>Titel
                    <input id="titleInput" type="text" placeholder="Gib mir einen Namen" v-model="newTitle"/>
                </label>
            </div>
            <button class="submitBtn" type="button" @click="handleSubmit">Erstellen</button>
        </div>
        <div class="overlay"></div>
    </div>
</template>
<script>
export default {
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
    box-shadow: #627479 2px 2px 4px;
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

        #title {
            margin: .5em 0 .75em;
            font-weight: 400;
            text-align: center;
            font-size: 1.5em;
            color: var(--textColor);
        }
        #titleInput {
            display: block;
            border: none;
            border-bottom: 1px solid grey;
            width: 100%;
            padding: 3px 0;

            &:focus {
                outline: none;
                border-color: var(--primaryColor);
            }
        }
        label {
            text-transform: uppercase;
            font-size: .8em;
            color: var(--textLightColor);
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
    background: #3c3b3b99;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
}

</style>

