<template>
  <div class="wrapper">
    <h2 class="title">Things to do</h2>
    <div id="dashboard">
      <ListCard
        v-for="(list, index) in listDataCollection"
        :key="index"
        :title="list.title"
        :listId="list.id"/>
    </div>
    <button type="button" id="toggleDialogButton" @click="dialogActive=!dialogActive">+</button>
    <CreateDialog
      :active.sync="dialogActive"
      v-model="newListTitle"
      @newToDoListConfigured="createNewList"/>
  </div>
</template>
<script>
import CreateDialog from '@/components/CreateDialog.vue'
import ListCard from '@/components/ListCard.vue'
import fbFunctions from '@/mixins/firebaseFunctions.js'
import baseFunctions from '@/mixins/baseFunctions.js'
const firebase = require('../firebaseConfig.js')


export default {
  name: 'Overview',
  components: {
    CreateDialog,
    ListCard
  },
  data () {
    return {
      newListTitle: '',
      dialogActive: false,
      listDataCollection: []
    }
  },
  methods: {
    createNewList() {
      this.$_create(this.newListTitle);
    },
    listenToDbUpdates() {
      firebase.listCollection.onSnapshot((snapshot) => {
        console.log("onShapshot: ", snapshot);
        this.listDataCollection = snapshot.docs.map((doc)=>{
          const docData = doc.data();
          let checkedItemsCount = docData.todos.filter((each)=>{
            return each.checked == true
          }).length;
          return {
            id: doc.id,
            title: docData.name,
            size: docData.todos.length,
            checkedCount: checkedItemsCount
          }
        });
      });
    },
  },
  mixins: [fbFunctions, baseFunctions],
  created() {
    return this.listenToDbUpdates()
  }
}
</script>
<style lang="scss" scoped>
.wrapper {
    width: 90%;
    margin: auto;
    text-align: center;
}

.title {
    text-align: center;
    font-weight: 300;
    font-size: 1.7em;
}

.card {
    width: 150px;
    padding: 8px;
    margin: 8px;
    border-radius: 4px;
    background: white;
    box-shadow: #627479 2px 2px 4px;
    text-align: center;

    #cardTitle {
        font-size: 1.7em;
        font-weight: 200;
    }

    #cardImage {
        display: none;
    }

    #listLink {
        width: 100%;

        button {
            width: 100%;
            border: none;
            background: #428ca2;
            color: white;
            padding: 8px;
            border-radius: 2px;
            cursor: pointer;
        }
    }
}

#dashboard {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
}

#toggleDialogButton {
    margin: 8px;
    padding: 8px;
    background: white;
    border: none;
    border-radius: 4px;
    box-shadow: #627479 2px 2px 4px;
    width: 150px;
}
</style>
