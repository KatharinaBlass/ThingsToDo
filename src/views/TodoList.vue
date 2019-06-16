<template>
    <div>
        <div id="header">
            <router-link
                id="menuLink"
                :to="{ name: 'home'}">
                <img src="@/assets/arrow_back.svg" class="icon"/>
            </router-link>
            <span class="title">{{this.listTitle}}</span>
            <button
                id="deleteAll"
                @click="deleteMultipleItems">
                <img src="@/assets/clear_all.svg" class="icon"/>
            </button>
        </div>
        <div class="content">
            <BaseInput
                v-model="newTask"
                placeholder="What do you want to do?"
                name="newTaskInput"
                v-on:keyup.enter="addToDo"
                :standalone="true"
                :valid="true"
            />
            <ul id="toDo_list">
                <TodoListEntry
                    v-for="(task, index) in storage"
                    :key="index"
                    :text="task.text"
                    :checked="task.checked"
                    @deleteListItem="deleteSingleListItem(index)"
                    @check="checkListItem($event, index)"
                />
            </ul>
        </div>
    </div>
</template>
<script>
import fbFunctions from '@/mixins/firebaseFunctions.js'
import TodoListEntry from '@/components/TodoListEntry.vue'
import BaseInput from '@/components/BaseInput.vue'
const firebase = require('../firebaseConfig.js')

export default {
    name: 'TodoList',
    data() {
        return {
            newTask: '',
            storage: [],
            listTitle: '',
            listId: this.$route.params.listId,
            user: JSON.parse(localStorage.getItem('user')),
        }
    },
    mixins: [fbFunctions],
    components: {
        TodoListEntry,
        BaseInput
    },
    methods: {
        addToDo(){
            var newEntry;
            if (this.newTask === '') {
                alert("You must write something!");}
            else {
                newEntry = {'text': this.newTask, 'checked': false};
                this.storage.push(newEntry);
                this.$_save(this.user.uid, this.listId, this.storage);
            }
            this.newTask = '';
        },
        listenToDbUpdates() {
            firebase.database.collection(this.user.uid).doc(this.listId).onSnapshot((doc) => {
                if(doc.data()) {
                    this.storage = doc.data().todos;
                    this.listTitle = doc.data().name;
                }
            });
        },
        deleteSingleListItem(index) {
            this.storage.splice(index, 1);
            this.$_save(this.user.uid, this.listId, this.storage);
        },
        deleteMultipleItems() {
            let checkedItems = this.storage.filter((item)=>{
                return item.checked === true
            });
            if (checkedItems.length != 0) {
                this.storage = this.storage.filter((item)=>{
                    return !checkedItems.includes(item)
                });
            }
            else this.storage = [];
            this.$_save(this.user.uid, this.listId, this.storage);
        },
        checkListItem(event, index) {
            this.storage[index].checked = event.target.checked;
            this.$_save(this.user.uid, this.listId, this.storage);
        }
    },
    created: function() {
        this.listenToDbUpdates();
    }
}
</script>
<style lang="scss" scoped>
.content {
    width: 100%;
    border-radius: 2px;

    @media only screen and (min-width: 500px) {
        width: 70%;
        max-width: 700px;
        margin: 1em auto;
        border-radius: 0;
    }
}

#header{
	padding: 16px 8px;
	border-top-left-radius: 2px;
	border-top-right-radius: 2px;
	display: flex;
	justify-content: space-between;
    align-items: center;
}

#toDo_list {
	list-style-type: none;
	margin: 0;
	padding: 8px;
	overflow-y: auto;
	max-height: 80vh;
}

.menuLink {
	align-items: center;
	display: flex;
}

#deleteAll {
	background: none;
	border: none;
	cursor: pointer;
}

.icon {
	display: block;
	height: 2em;
}
</style>

