<template>
    <div>
        <div id="header">
            <router-link
                id="menuLink"
                :to="{ name: 'home'}">
                <img src="@/assets/menu.svg" class="icon" id="menu"/>
            </router-link>
            <span id="headerTitle">{{this.listTitle}}</span>
            <button class="menuOptions" id="deleteAll">
                <img src="@/assets/delete.svg" class="icon" id="delete"/>
            </button>
        </div>
        <div class="content">
            <input v-model="newTask" v-on:keyup.enter="addToDo" type="text" id="todo_input" placeholder="What do you want to do?"/>
            <ul id="toDo_list">
                <TodoListEntry v-for="(task, index) in storage" :key="index" :text="task.text" :checked="task.checked"/>
            </ul>
        </div>
    </div>
</template>
<script>
import fbFunctions from '@/mixins/firebaseFunctions.js'
import TodoListEntry from '@/components/TodoListEntry.vue'
const firebase = require('../firebaseConfig.js')

export default {
    name: 'TodoList',
    data() {
        return {
            newTask: '',
            storage: [],
            listTitle: '',
        }
    },
    mixins: [fbFunctions],
    components: {
        TodoListEntry
    },
    methods: {
        addToDo(){
            var newEntry;
            if (this.newTask === '') {
                alert("You must write something!");}
            else {
                newEntry = {'text': this.newTask, 'checked': false};
                this.storage.push(newEntry);
                this.$_save(this.$route.params.listId, this.storage);
            }
            this.newTask = '';
        },
        listenToDbUpdates() {
            firebase.listCollection.doc(this.$route.params.listId).onSnapshot((doc) => {
                console.log("onShapshot: ", doc.data());
                this.storage = doc.data().todos;
                this.listTitle = doc.data().name;
            });
        },
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
    color: #fffffff0;
	padding: 16px 8px;
	border-top-left-radius: 2px;
	border-top-right-radius: 2px;
	display: flex;
	justify-content: space-between;
	align-items: center;

    #headerTitle {
		font-size: 2.5em;
		font-weight: lighter;
	}
}

#todo_input {
    width: 100%;
    padding: 8px;
    border: none;
    background: none;
    font-size: 1.3em;
    border-bottom: 1px solid #ffffffbb;
    color: white;

    &::placeholder {
        color: #ffffffbb;
    }
}

#toDo_list {
	list-style-type: none;
	margin: 0;
	padding: 0;
	overflow-y: auto;
	max-height: 80vh;
}

.menuLink {
	align-items: center;
	display: flex;
}

.menuOptions {
	background: none;
	border: none;
	cursor: pointer;
}

.icon {
	display: block;
	height: 2em;
}
</style>

