<template>
    <div v-if="active">
        <div class="dialog">
            <button id="closeDialog" @click="$emit('update:active')">
                <img src="@/assets/close-light-gray.svg" class="icon"/>
            </button>
            <div class="contentWrapper">
                <h3 class="cardTitle">Neue ToDo List</h3>
                <BaseInput
                    v-model="newList.title"
                    name="newTitleInput"
                    placeholder="Gib mir einen Namen"
                    label="Titel"
                    :valid.sync="valid.title"
                />
                <TabSelect
                    :options="kategories"
                    v-model="newList.kategory"
                    name="newListKategory"
                    label="Kategorie"
                    :valid.sync="valid.kategory"
                />
            </div>
            <button class="submitBtn" type="button" @click="validateBeforeSubmit">Erstellen</button>
        </div>
        <div class="overlay"></div>
    </div>
</template>
<script>
import BaseInput from '@/components/BaseInput.vue'
import TabSelect from '@/components/TabSelect.vue'

export default {
  components: {
      BaseInput,
      TabSelect,
  },
  data() {
      return {
          valid: {
              kategory: true,
              title: true,
          },
      }
  },
  props: {
    value: {
        type: Object,
        required: true,
    },
    active: {
        type: Boolean
    },
    tabs: {
        type: Object,
        required: true,
    },
  },
  computed: {
    newList: {
      get() {
        return this.value;
      },
      set(newList) {
        this.$emit("input", newList);
      },
    },
    kategories() {
        delete this.tabs.all;
        return this.tabs
    },
  },
  methods: {
      validateBeforeSubmit() {
          if(this.newList.title === '') {
              this.valid.title = false;
          }
          if(this.newList.kategory === '') {
              this.valid.kategory = false;
          }
          if(this.valid.title && this.valid.kategory) {
                this.$emit('update:active');
                this.$emit('newToDoListConfigured');
          }
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

